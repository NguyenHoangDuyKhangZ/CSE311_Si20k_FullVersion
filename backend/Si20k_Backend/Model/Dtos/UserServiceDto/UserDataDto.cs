using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.UserServiceDto
{
    public class UserDataDto
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }

        [MaxLength(255)]
        public string? Username { get; set; }

        public string? Password { get; set; }

        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }
        public string? Role { get; set; }
    }
}
