using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Si20k_Backend.Model.Entities
{
    public class Category : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [JsonIgnore]
        public ICollection<Product>? Products { get; set; } = new List<Product>();
    }
}
