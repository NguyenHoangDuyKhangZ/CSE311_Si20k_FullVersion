using Si20k_Backend.Data;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Si20k_Backend.Repositories
{
    public class CartItemRepository : GenericRepository<CartItem>, ICartItemRepository
    {
        public CartItemRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CartItem>> GetAllByUserId(Guid userId)
        {
            var cartItems = await _dbSet
                .Where(ci => ci.UserId == userId)
                .Include(ci => ci.Product)
                .Include(ci => ci.User)
                .ToListAsync();
            return cartItems;
        }

        public async Task<IEnumerable<CartItem>> GetAllWithProductAndBuyerAsync()
        {
            var cartItems = await _dbSet
                .Include(ci => ci.Product)
                .Include(ci => ci.User)
                .ToListAsync();
            return cartItems;
        }
    }
}
