using Microsoft.EntityFrameworkCore;
using Si20k_Backend.Data;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;

namespace Si20k_Backend.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
           return await _dbSet.FirstOrDefaultAsync(c => c.Name == name);

        }
    }
}
