using Si20k_Backend.Model.Dtos.UserServiceDto;

namespace Si20k_Backend.Services.Interfaces
{
    public interface IUserService
    {
            Task<IEnumerable<UserDataDto>> GetAllUsersAsync(); //Admin Only
            Task<UserDataDto?> GetUserByIdAsync(Guid id); 
            Task<bool> CreateUserAsync(CreateUserDto user); //Admin Only
            Task<bool> UpdateUserAsync(Guid id, UpdateUserDto dto); 
            Task<bool> DeleteUserAsync(Guid id); //Admin Only
            Task<bool> ToggleLockAsync(Guid id); //Admin Only
    }
}
