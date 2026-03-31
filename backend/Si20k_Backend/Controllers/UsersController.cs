using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Si20k_Backend.Model.Dtos.UserServiceDto;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Policy = "OnlyAdmin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDataDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            if (users == null || !users.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMyData(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("No users found.");
            }
            var userData = new UserDataDto
            {
                FullName = user.FullName,
                Email = user.Email,
                Username = user.Username,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                Role = user.Role
            };
            return Ok(userData);
        }

        //[Authorize(Policy = "OnlyAdmin")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            var result = await _userService.CreateUserAsync(dto);
            if (!result)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user.");
            }
            return Ok("User created successfully.");
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserDto dto)
        {
            var result = await _userService.UpdateUserAsync(id, dto);
            if (!result)
            {
                return NotFound("User not found or update failed.");
            }
            return Ok("User updated successfully.");
        }

        [Authorize(Policy = "OnlyAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
            {
                return NotFound("User not found or delete failed.");
            }
            return Ok("User deleted successfully.");
        }
    }
}
