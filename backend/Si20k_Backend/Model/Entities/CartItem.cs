using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Si20k_Backend.Model.Entities
{
    public class CartItem : BaseEntity
    {
        [Required]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [Required]
        public Guid ProductId { get; set; }
        [ForeignKey(nameof(ProductId))]
        public Product? Product { get; set; }

        [Required]
        public int Quantity { get; set; } = 1;
    }
}
