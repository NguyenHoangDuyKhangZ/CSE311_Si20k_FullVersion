using Azure.Core;
using Microsoft.IdentityModel.Tokens;
using Si20k_Backend.Model.Dtos.AuthDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Si20k_Backend.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Si20k_Backend.Services
{
    public class AuthService(IUserRepository userRepo, IConfiguration config) : IAuthService
    {
        private readonly IUserRepository _userRepo = userRepo;
        private readonly IConfiguration _config = config;

        public async Task<TokenApiModel?> LoginAsync(string usernameOrEmail, string password)
        {
            var existingUser = await _userRepo.GetByUsernameAsync(usernameOrEmail);

            if (existingUser == null)
            {
               existingUser = await _userRepo.GetByEmailAsync(usernameOrEmail);
            }

            if (existingUser == null || !BCrypt.Net.BCrypt.Verify(password, existingUser.PasswordHash))
            {
                return null; // Invalid username/email or password
            }

            var tokens = new TokenApiModel
            {
                AccessToken = GenerateJwtToken(existingUser),
                RefreshToken = GenerateRefreshToken()
            };
            
            existingUser.RefreshToken = tokens.RefreshToken;
            existingUser.TokenCreated = DateTime.UtcNow;
            existingUser.TokenExpires = DateTime.UtcNow.AddDays(7);
            await _userRepo.SaveChangeAsync();
            return tokens;
        }

        public async Task<bool> RegisterAsync(RegisterDto dto)
        {
            var existingUser = await _userRepo.GetByUsernameAsync(dto.Username);
            if (existingUser != null)
            {
                return false; // Username already exists
            }

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Buyer"
            };

            await _userRepo.AddAsync(user);
            return await _userRepo.SaveChangeAsync();
        }

        public async Task<TokenApiModel> Refresh(RefreshTokenDto dto)
        {
            var user = await _userRepo.GetByRefreshToken(dto.RefreshToken);

            if (user == null || user.TokenExpires <= DateTime.UtcNow)
            {
                return null; // Token is invalid or expired
            }

            var tokens = new TokenApiModel
            {
                AccessToken = GenerateJwtToken(user),
                RefreshToken = GenerateRefreshToken()
            };

            user.RefreshToken = tokens.RefreshToken;
            user.TokenCreated = DateTime.UtcNow;
            user.TokenExpires = DateTime.UtcNow.AddDays(7);
            await _userRepo.SaveChangeAsync();
            return tokens;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.Id.ToString()),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
