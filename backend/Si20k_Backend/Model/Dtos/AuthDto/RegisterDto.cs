using System.ComponentModel.DataAnnotations;

namespace Si20k_Backend.Model.Dtos.AuthDto
{
    public class RegisterDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
    }
}
