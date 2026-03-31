using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.VoucherServiceDto
{
    public class CreateVoucherDto
    {
        [Required]
        [MaxLength(50)]
        public string VoucherCode { get; set; } = string.Empty;

        [Required]
        public string DiscountType { get; set; } = string.Empty; // "Percent", "Fixed", "PercentUpTo"

        [Required]
        public decimal DiscountAmount { get; set; }

        [Required]
        public decimal MinOrder { get; set; } = 0;

        public decimal? MaxDiscount { get; set; }

        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
