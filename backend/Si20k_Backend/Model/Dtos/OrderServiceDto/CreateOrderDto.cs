using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.OrderServiceDto
{
    /// <summary>
    /// Payload gửi lên khi khách đặt hàng
    /// </summary>
    public class CreateOrderDto
    {
        [Required]
        public List<OrderItemDto> Items { get; set; } = new();

        [Required]
        [MaxLength(255)]
        public string RecipientName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string RecipientPhone { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string ShippingAddress { get; set; } = string.Empty;

        [MaxLength(30)]
        public string PaymentMethod { get; set; } = "COD"; // "COD" | "BANK_TRANSFER"

        [MaxLength(50)]
        public string? VoucherCode { get; set; } // Optional — mã voucher nếu có
    }
}
