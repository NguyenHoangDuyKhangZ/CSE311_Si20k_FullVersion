using Si20k_Backend.Model.Entities;
using System.Runtime.CompilerServices;
namespace Si20k_Backend.Repositories.Interfaces
{
    public interface ICartItemRepository : IRepository<CartItem>
    {
        Task<IEnumerable<CartItem>> GetAllWithProductAndBuyerAsync();

        Task<IEnumerable<CartItem>> GetAllByUserId(Guid userId);
    }
}
