
using Si20k_Backend.Model.Dtos.CartItemServiceDto;

namespace Si20k_Backend.Services.Interfaces
{
    public interface ICartItemService
    {
        Task<IEnumerable<CartItemDataDto>> GetAllAsync(Guid userId); //Buyer Only
        Task<IEnumerable<CartItemDataDto>?> GetByIdAsync(Guid id);
        Task<bool> CreateAsync(CreateCartItemDto user); //Buyer Only
        Task<bool> UpdateAsync(Guid id, UpdateCartItemDto dto); //Buyer Only
        Task<bool> DeleteAsync(Guid id); //Buyer Only
    }
}
