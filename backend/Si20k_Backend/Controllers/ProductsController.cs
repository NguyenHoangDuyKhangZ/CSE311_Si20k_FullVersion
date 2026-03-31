using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Si20k_Backend.Model.Dtos.ProductServiceDto;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDataDto>>> GetAllProducts()
        {
            var products = await _productService.GetAllAsync();
            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }
            return Ok(products);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDataDto>> GetProductById(Guid id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }
            return Ok(product);
        }
        [Authorize]
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<ProductDataDto>>> GetProductsByUserId(Guid id)
        {
            var products = await _productService.GetAllAsyncByUserId(id);
            if (products == null || !products.Any())
            {
                return NotFound($"No products found for user with ID {id}.");
            }
            return Ok(products);
        }

        [Authorize(Policy = "OnlySeller")]
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto productCreateDto)
        {
            var userIdString = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid sellerId))
            {
                return Unauthorized("User ID not found in token.");
            }

            var result = await _productService.CreateAsync(productCreateDto, sellerId);
            if (result == false)
            {
                return BadRequest("Failed to create product.");
            }
            return Ok("Product created successfully.");
        }

        [Authorize(Policy ="OnlySeller")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] UpdateProductDto productUpdateDto)
        {
            var result = await _productService.UpdateAsync(id, productUpdateDto);
            if (result == false)
            {
                return BadRequest($"Failed to update product with ID {id}.");
            }
            return Ok("Product updated successfully.");
        }
        [Authorize(Policy = "OnlySeller")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var result = await _productService.DeleteAsync(id);
            if (result == false)
            {
                return BadRequest($"Failed to delete product with ID {id}.");
            }
            return Ok("Product deleted successfully.");
        }
    }
}
