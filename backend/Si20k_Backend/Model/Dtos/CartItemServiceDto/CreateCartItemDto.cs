using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.CartItemServiceDto
{
    public class CreateCartItemDto
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
