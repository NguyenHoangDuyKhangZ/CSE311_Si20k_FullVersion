using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.VoucherServiceDto
{
    public class VoucherDataDto
    {

        public Guid Id { get; set; }
        public string? VoucherCode { get; set; }         
        public string? DiscountType { get; set; } // "Percent", "Fixed", "PercentUpTo"
        public decimal DiscountAmount { get; set; }
        public decimal MinOrder { get; set; }

        public decimal? MaxDiscount { get; set; }

        public string? Description { get; set; }

        public bool IsActive { get; set; }
    }
}
