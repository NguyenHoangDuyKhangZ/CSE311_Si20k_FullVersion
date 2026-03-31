using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Si20k_Backend.Model.Dtos.AuthDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            

            var result = await _authService.RegisterAsync(dto);
            if (!result)
            {
                return BadRequest("Username already exists.");
            }
            return Ok("Register Successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var token = await _authService.LoginAsync(dto.UsernameOrPassword, dto.Password);
            if (token == null)
            {
                return Unauthorized("Invalid username or password.");
            }
            return Ok(new { AccessToken = token });

        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(RefreshTokenDto dto)
        {
            var result = await _authService.Refresh(dto);
            if (result == null)
            {
                return BadRequest("Token is invalid or expired");
            }
            return Ok(result);
        }
    }
}
