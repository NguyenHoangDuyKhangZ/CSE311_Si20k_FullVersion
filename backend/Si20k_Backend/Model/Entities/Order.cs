using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Si20k_Backend.Model.Entities
{
    /// <summary>
    /// Đơn hàng của khách — lưu snapshot toàn bộ thông tin tại thời điểm mua
    /// </summary>
    public class Order : BaseEntity
    {
        [Required]
        public Guid UserId { get; set; }

        // Thông tin giao hàng (snapshot)
        [Required]
        [MaxLength(255)]
        public string RecipientName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string RecipientPhone { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string ShippingAddress { get; set; } = string.Empty;

        // Tài chính
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }   // Tổng trước giảm giá

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountAmount { get; set; } = 0; // Số tiền được giảm

        [Column(TypeName = "decimal(18,2)")]
        public decimal FinalAmount { get; set; }   // Thực thu

        [MaxLength(50)]
        public string? VoucherCode { get; set; }   // Mã voucher đã dùng (nếu có)

        // Phương thức thanh toán
        [Required]
        [MaxLength(30)]
        public string PaymentMethod { get; set; } = "COD"; // "COD" | "BANK_TRANSFER"

        // Trạng thái đơn hàng
        [Required]
        [MaxLength(30)]
        public string Status { get; set; } = "Pending"; // Pending | Confirmed | Shipped | Delivered | Cancelled

        // Navigation properties
        public User? User { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
