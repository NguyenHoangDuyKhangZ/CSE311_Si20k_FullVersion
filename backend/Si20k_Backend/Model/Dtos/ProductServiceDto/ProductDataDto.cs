using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.ProductServiceDto
{
    public class ProductDataDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        
        public decimal CurrentPrice { get; set; }

        
        public decimal OriginalPrice { get; set; }

        public string? Description { get; set; }
        public string? ImageUrl { get; set; }

        public int Quantity { get; set; } = 0; // Tồn kho

        public int SoldNumber { get; set; } = 0;

        public string? CategoryName { get; set; }
        public Guid CategoryId { get; set; }

        public string? SellerName { get; set; }
        public Guid SellerId { get; set; }

        public double DiscountPercentage => OriginalPrice > 0
            ? (double)Math.Round((OriginalPrice - CurrentPrice) / OriginalPrice * 100)
            : 0;

        public bool IsInStock => Quantity > 0;
    }
}
