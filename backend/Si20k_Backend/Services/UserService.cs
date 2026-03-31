using Si20k_Backend.Model.Dtos.UserServiceDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Si20k_Backend.Services.Interfaces;
using System.Data;

namespace Si20k_Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<bool> CreateUserAsync(CreateUserDto dto)
        {
            var user = new User();

            user.Username = dto.Username;
            user.Email = dto.Email;
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            user.Address = dto.Address;
            user.FullName = dto.FullName;
            user.PhoneNumber = dto.PhoneNumber;
            user.Role = string.IsNullOrWhiteSpace(dto.Role) ? "Buyer" : dto.Role;

            await _userRepo.AddAsync(user);
            await _userRepo.SaveChangeAsync();
            return true;
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _userRepo.GetByIdAsync(id);

            if (user == null)
                return false;
            if (user.Role == "Admin")
                return false;

            await _userRepo.Delete(user);
            return true;
        }

        public async Task<IEnumerable<UserDataDto>> GetAllUsersAsync()
        {
            var users = await _userRepo.GetAllAsync();
            return users.Select(u => new UserDataDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email,
                Username = u.Username,
                PhoneNumber = u.PhoneNumber,
                Address = u.Address,
                Role = u.Role
            }).ToList();
        }
        public async Task<UserDataDto?> GetUserByIdAsync(Guid id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null)
            {
                return null;
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
            return userData;
        }

        public async Task<bool> UpdateUserAsync(Guid id, UpdateUserDto dto)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null) return false;

            if (!string.IsNullOrWhiteSpace(dto.Username)) user.Username = dto.Username;
            if (!string.IsNullOrWhiteSpace(dto.Email)) user.Email = dto.Email;
            if (!string.IsNullOrWhiteSpace(dto.FullName)) user.FullName = dto.FullName;
            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber)) user.PhoneNumber = dto.PhoneNumber;
            if (!string.IsNullOrWhiteSpace(dto.Address)) user.Address = dto.Address;
            if (!string.IsNullOrWhiteSpace(dto.Role)) user.Role = dto.Role;
            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }

            await _userRepo.Update(user);

            return true;
        }
    }
}
