using Si20k_Backend.Model.Dtos.OrderServiceDto;

namespace Si20k_Backend.Services.Interfaces
{
    public interface IOrderService
    {
        /// <summary>
        /// Xử lý đặt hàng: kiểm tra kho, trừ Quantity, cộng SoldNumber, lưu Order.
        /// Dùng DB Transaction để đảm bảo tính toàn vẹn dữ liệu.
        /// </summary>
        /// <returns>OrderDataDto nếu thành công, throw InvalidOperationException nếu hết hàng</returns>
        Task<OrderDataDto> ProcessOrderAsync(CreateOrderDto dto, Guid userId);

        /// <summary>Lấy tất cả đơn hàng (Admin)</summary>
        Task<IEnumerable<OrderDataDto>> GetAllAsync();

        /// <summary>Lấy đơn hàng theo ID</summary>
        Task<OrderDataDto?> GetByIdAsync(Guid id);

        /// <summary>Lấy tất cả đơn hàng của một user</summary>
        Task<IEnumerable<OrderDataDto>> GetByUserIdAsync(Guid userId);

        /// <summary>Cập nhật trạng thái đơn hàng (Admin)</summary>
        Task<bool> UpdateStatusAsync(Guid id, string newStatus);
    }
}
