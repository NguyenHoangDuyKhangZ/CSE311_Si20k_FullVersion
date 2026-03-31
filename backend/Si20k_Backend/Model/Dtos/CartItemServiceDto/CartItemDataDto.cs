using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.CartItemServiceDto
{
    public class CartItemDataDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public string? BuyerName { get; set; }

        public Guid ProductId { get; set; }
        public string? ProductName { get; set; }
        public int Quantity { get; set; }
    }
}
