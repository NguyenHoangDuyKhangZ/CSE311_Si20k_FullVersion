using Si20k_Backend.Model.Entities;

namespace Si20k_Backend.Repositories.Interfaces
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category?> GetByNameAsync(string name);
    }
}
