using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Si20k_Backend.Model.Entities
{
    public class User : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [Required]
        public string Role { get; set; } = "Buyer"; // "Buyer", "Seller", "Admin"

        public string RefreshToken { get; set; } = string.Empty;
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }

        [JsonIgnore]
        public ICollection<Product>? Products { get; set; } = new List<Product>();

        [JsonIgnore]
        public ICollection<CartItem>? CartItems { get; set; } = new List<CartItem>();
    }
}
