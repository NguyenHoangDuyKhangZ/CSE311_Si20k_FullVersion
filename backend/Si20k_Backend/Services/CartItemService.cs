using Microsoft.Identity.Client;
using Si20k_Backend.Model.Dtos.CartItemServiceDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Services
{
    public class CartItemService : ICartItemService
    {
        private readonly ICartItemRepository _cartItemRepo;

        public CartItemService(ICartItemRepository cartItemRepo)
        {
            _cartItemRepo = cartItemRepo;
        }

        public async Task<bool> CreateAsync(CreateCartItemDto dto)
        {
            var cartItem = new CartItem
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            };
            await _cartItemRepo.AddAsync(cartItem);
            await _cartItemRepo.SaveChangeAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var existingCartItem = await _cartItemRepo.GetByIdAsync(id);
            if (existingCartItem == null)
            {
                return false;
            }
            await _cartItemRepo.Delete(existingCartItem);
            await _cartItemRepo.SaveChangeAsync();
            return true;
        }

        public async Task<IEnumerable<CartItemDataDto>> GetAllAsync(Guid userId)
        {
            var cartItems = await _cartItemRepo.GetAllWithProductAndBuyerAsync();
            var cartItemDtos = cartItems.Select(c => new CartItemDataDto
            {
                Id = c.Id,
                UserId = c.UserId,
                BuyerName = c.User?.FullName,
                ProductId = c.ProductId,
                ProductName = c.Product?.Name,
                Quantity = c.Quantity
            });
            return cartItemDtos;
        }

        public async Task<IEnumerable<CartItemDataDto>?> GetByIdAsync(Guid id)
        {
            var cartItems = await _cartItemRepo.GetAllByUserId(id);

            if (cartItems == null)
            {
                return null;
            }
            return cartItems.Select(c => new CartItemDataDto
            {
                Id = c.Id,
                UserId = c.UserId,
                BuyerName = c.User?.FullName,
                ProductId = c.ProductId,
                ProductName = c.Product?.Name,
                Quantity = c.Quantity
            });
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateCartItemDto dto)
        {
            var existingCartItem = _cartItemRepo.GetByIdAsync(id).Result;   
            if (existingCartItem == null)
            {
                return false;
            }
            if (dto.Quantity < 0)
            {
                return false;
            }
            existingCartItem.Quantity = dto.Quantity;
            await _cartItemRepo.Update(existingCartItem);
            await _cartItemRepo.SaveChangeAsync();
            return true;
        }
    }
}
