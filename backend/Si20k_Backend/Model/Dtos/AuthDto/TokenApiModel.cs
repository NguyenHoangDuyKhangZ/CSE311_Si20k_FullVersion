namespace Si20k_Backend.Model.Dtos.AuthDto
{
    public class TokenApiModel
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }

    public class RefreshTokenDto()
    {
        public string? RefreshToken { get; set; }
    }
}
