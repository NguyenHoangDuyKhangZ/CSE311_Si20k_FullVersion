using Si20k_Backend.Model.Dtos.AuthDto;

namespace Si20k_Backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<TokenApiModel> LoginAsync(string usernameOrEmail, string password);
        Task<bool> RegisterAsync(RegisterDto dto);

        Task<TokenApiModel> Refresh(RefreshTokenDto dto);

    }
}
