using Si20k_Backend.Data;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Si20k_Backend.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
        }

        public Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(Guid categoryId)
        {
            var products = _dbSet.Where(p => p.CategoryId == categoryId);
            return Task.FromResult(products.AsEnumerable());
        }

        public async Task<IEnumerable<Product>> GetProductsBySellerId(Guid sellerId)
        {
            return await _dbSet.Include(p => p.Seller).Include(p => p.Category).Where(p => p.SellerId == sellerId).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsIncludeSellerCategory()
        {
            return await _dbSet.Include(p => p.Seller)
                         .Include(p => p.Category)
                         .ToListAsync();
        }

        
    }
}
