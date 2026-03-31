using Si20k_Backend.Model.Entities;

namespace Si20k_Backend.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByUsernameAsync(string username);

        Task<User?> GetByRefreshToken(string refreshToken);
    }
}
