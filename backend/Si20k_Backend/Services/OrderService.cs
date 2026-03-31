using Microsoft.EntityFrameworkCore;
using Si20k_Backend.Data;
using Si20k_Backend.Model.Dtos.OrderServiceDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IProductRepository _productRepo;
        private readonly IVoucherRepository _voucherRepo;
        private readonly ApplicationDbContext _context; // Dùng trực tiếp để mở Transaction

        public OrderService(
            IOrderRepository orderRepo,
            IProductRepository productRepo,
            IVoucherRepository voucherRepo,
            ApplicationDbContext context)
        {
            _orderRepo = orderRepo;
            _productRepo = productRepo;
            _voucherRepo = voucherRepo;
            _context = context;
        }

        /// <summary>
        /// Xử lý đặt hàng trong một Database Transaction:
        /// 1. Validate tất cả sản phẩm (tồn tại + đủ kho)
        /// 2. Tính tổng tiền
        /// 3. Áp dụng voucher nếu có
        /// 4. Trừ Quantity + Cộng SoldNumber cho từng sản phẩm
        /// 5. Tạo Order + OrderDetails
        /// 6. Commit transaction
        /// </summary>
        public async Task<OrderDataDto> ProcessOrderAsync(CreateOrderDto dto, Guid userId)
        {
            // ─── Bước 1: Validate & load tất cả product trước khi mở transaction ───
            var productMap = new Dictionary<Guid, Product>();
            foreach (var item in dto.Items)
            {
                if (productMap.ContainsKey(item.ProductId)) continue;

                var product = await _productRepo.GetByIdAsync(item.ProductId)
                    ?? throw new InvalidOperationException($"Sản phẩm '{item.ProductId}' không tồn tại.");

                productMap[item.ProductId] = product;
            }

            // ─── Bước 2: Kiểm tra kho TRƯỚC khi mở transaction ───────────────────
            foreach (var item in dto.Items)
            {
                var product = productMap[item.ProductId];
                if (product.Quantity < item.Quantity)
                {
                    throw new InvalidOperationException(
                        $"Sản phẩm \"{product.Name}\" không đủ hàng. " +
                        $"Tồn kho: {product.Quantity}, Yêu cầu: {item.Quantity}.");
                }
            }

            // ─── Bước 3: Mở Transaction ───────────────────────────────────────────
            await using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // ─── Bước 4: Tính tổng tiền ──────────────────────────────────────
                decimal totalAmount = 0;
                var orderDetails = new List<OrderDetail>();

                foreach (var item in dto.Items)
                {
                    var product = productMap[item.ProductId];
                    var lineTotal = product.CurrentPrice * item.Quantity;
                    totalAmount += lineTotal;

                    orderDetails.Add(new OrderDetail
                    {
                        Id = Guid.NewGuid(),
                        ProductId = product.Id,
                        ProductName = product.Name,   // Snapshot tên
                        UnitPrice = product.CurrentPrice, // Snapshot giá
                        Quantity = item.Quantity,
                    });
                }

                // ─── Bước 5: Áp dụng Voucher (nếu có) ───────────────────────────
                decimal discountAmount = 0;
                if (!string.IsNullOrWhiteSpace(dto.VoucherCode))
                {
                    var voucher = await _voucherRepo.GetByVoucherCode(dto.VoucherCode);
                    if (voucher != null && voucher.IsActive && totalAmount >= voucher.MinOrder)
                    {
                        discountAmount = voucher.DiscountType switch
                        {
                            "Percent" => (totalAmount * voucher.DiscountAmount) / 100,
                            "PercentUpTo" => Math.Min(
                                (totalAmount * voucher.DiscountAmount) / 100,
                                voucher.MaxDiscount ?? decimal.MaxValue),
                            "Fixed" => voucher.DiscountAmount,
                            _ => 0
                        };
                        discountAmount = Math.Min(discountAmount, totalAmount); // Không giảm quá tổng tiền
                    }
                }

                decimal finalAmount = totalAmount - discountAmount;

                // ─── Bước 6: Trừ Quantity + Cộng SoldNumber ─────────────────────
                foreach (var item in dto.Items)
                {
                    var product = productMap[item.ProductId];
                    product.Quantity -= item.Quantity;
                    product.SoldNumber += item.Quantity;
                    await _productRepo.Update(product);
                }

                // ─── Bước 7: Tạo Order ────────────────────────────────────────────
                var order = new Order
                {
                    Id = Guid.NewGuid(),
                    UserId = userId,
                    RecipientName = dto.RecipientName,
                    RecipientPhone = dto.RecipientPhone,
                    ShippingAddress = dto.ShippingAddress,
                    PaymentMethod = dto.PaymentMethod,
                    VoucherCode = dto.VoucherCode,
                    TotalAmount = totalAmount,
                    DiscountAmount = discountAmount,
                    FinalAmount = finalAmount,
                    Status = "Pending",
                    OrderDetails = orderDetails
                };

                await _orderRepo.AddAsync(order);
                await _context.SaveChangesAsync();

                // ─── Bước 8: Commit Transaction ───────────────────────────────────
                await transaction.CommitAsync();

                return MapToDto(order);
            }
            catch
            {
                // Rollback nếu có bất kỳ lỗi nào
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<IEnumerable<OrderDataDto>> GetAllAsync()
        {
            var orders = await _orderRepo.GetAllWithDetailsAsync();
            return orders.Select(MapToDto);
        }

        public async Task<OrderDataDto?> GetByIdAsync(Guid id)
        {
            var order = await _orderRepo.GetByIdWithDetailsAsync(id);
            return order == null ? null : MapToDto(order);
        }

        public async Task<IEnumerable<OrderDataDto>> GetByUserIdAsync(Guid userId)
        {
            var orders = await _orderRepo.GetByUserIdAsync(userId);
            return orders.Select(MapToDto);
        }

        public async Task<bool> UpdateStatusAsync(Guid id, string newStatus)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) return false;

            order.Status = newStatus;
            await _orderRepo.Update(order);
            return true;
        }

        // ─── Mapper helper ────────────────────────────────────────────────────────
        private static OrderDataDto MapToDto(Order order) => new()
        {
            Id = order.Id,
            UserId = order.UserId,
            RecipientName = order.RecipientName,
            RecipientPhone = order.RecipientPhone,
            ShippingAddress = order.ShippingAddress,
            TotalAmount = order.TotalAmount,
            DiscountAmount = order.DiscountAmount,
            FinalAmount = order.FinalAmount,
            VoucherCode = order.VoucherCode,
            PaymentMethod = order.PaymentMethod,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            Items = order.OrderDetails.Select(d => new OrderDetailDataDto
            {
                ProductId = d.ProductId,
                ProductName = d.ProductName,
                UnitPrice = d.UnitPrice,
                Quantity = d.Quantity,
            }).ToList()
        };
    }
}
