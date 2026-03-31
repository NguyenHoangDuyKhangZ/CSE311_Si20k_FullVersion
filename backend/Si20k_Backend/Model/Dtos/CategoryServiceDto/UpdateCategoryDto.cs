using Si20k_Backend.Model.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Si20k_Backend.Model.Dtos.CategoryServiceDto
{
    public class UpdateCategoryDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

    }
}
