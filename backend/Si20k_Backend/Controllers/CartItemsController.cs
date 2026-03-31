using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Si20k_Backend.Model.Dtos.CartItemServiceDto;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly ICartItemService _cartItemService;
        public CartItemsController(ICartItemService cartItemService)
        {
            _cartItemService = cartItemService;
        }
        [Authorize(Policy = "OnlyBuyer")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItemDataDto>> GetByUserId(Guid userId)
        {
            var cartItems = await _cartItemService.GetByIdAsync(userId);
            if (cartItems == null)
            {
                return NotFound("No cart items found for the user.");
            }
            return Ok(cartItems);
        }


        [Authorize(Policy = "OnlyBuyer")]
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateCartItemDto dto)
        {
            var result = await _cartItemService.CreateAsync(dto);
            if (!result)
            {
                return BadRequest("Failed to create cart item.");
            }
            return Ok("Cart item created successfully.");
        }

        [Authorize(Policy = "OnlyBuyer")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateCartItemDto dto)
        {
            var result = await _cartItemService.UpdateAsync(id, dto);
            if (!result)
            {
                return BadRequest("Failed to update cart item.");
            }
            return Ok("Updated successfully.");
        }

        [Authorize(Policy = "OnlyBuyer")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var result = await _cartItemService.DeleteAsync(id);
            if (!result)
            {
                return BadRequest("Failed to delete cart item.");
            }
            return Ok("Deleted successfully.");
        }
    }
}
