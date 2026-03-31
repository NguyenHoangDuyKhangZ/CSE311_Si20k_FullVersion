namespace Si20k_Backend.Model.Dtos.AuthDto
{
    public class LoginDto
    {
        public string UsernameOrPassword { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
