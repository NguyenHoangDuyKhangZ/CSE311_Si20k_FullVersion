using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.ProductServiceDto
{
    public class CreateProductDto
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public decimal CurrentPrice { get; set; }

        [Required]
        public decimal OriginalPrice { get; set; }

        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public Guid CategoryId { get; set; }

        [Required]
        public int Quantity { get; set; } = 0; // Tồn kho

        public int SoldNumber { get; set; } = 0;
    }
}
