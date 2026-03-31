using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.UserServiceDto
{
    public class CreateUserDto
    {
        
        [MaxLength(100)]
        public string? FullName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [Required]
        public string Role { get; set; } = string.Empty;
    }
}
