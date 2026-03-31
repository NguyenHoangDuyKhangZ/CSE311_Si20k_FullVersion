using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Si20k_Backend.Model.Entities
{
    public class Product : BaseEntity
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

        [Required]
        public int Quantity { get; set; } = 0; // Tồn kho

        public int SoldNumber { get; set; } = 0;

        // Quan hệ với Category
        [Required]
        public Guid CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public Category? Category { get; set; }

        // Quan hệ với Seller (User)
        [Required]
        public Guid SellerId { get; set; }
        [ForeignKey(nameof(SellerId))]
        public User? Seller { get; set; }
    }
}
