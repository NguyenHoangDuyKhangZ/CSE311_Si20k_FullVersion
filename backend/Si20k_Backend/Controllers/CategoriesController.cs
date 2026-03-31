using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Si20k_Backend.Model.Dtos.CategoryServiceDto;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDataDto>>> GetAllCategories()
        {
            var categories = await _categoryService.GetAllAsync();
            if (categories == null || !categories.Any())
            {
                return NotFound("No categories found.");
            }
            return Ok(categories);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDataDto>> GetCategoryById(Guid id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }
            return Ok(category);
        }
        [Authorize(Policy = "OnlyAdmin")]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            var result = await _categoryService.CreateAsync(dto);
            if (!result)
            {
                return BadRequest("Failed to create category, please try again later");
            }
            return Ok("Category created successfully.");
        }
        [Authorize(Policy = "OnlyAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] UpdateCategoryDto dto)
        {
            var result = await _categoryService.UpdateAsync(id, dto);
            if (!result)
            {
                return BadRequest("Failed to update category, please try again later");
            }
            return Ok("Category updated successfully.");
        }
        [Authorize(Policy = "OnlyAdmin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var result = await _categoryService.DeleteAsync(id);
            if (!result)
            {
                return BadRequest("Failed to delete category, please try again later");
            }
            return Ok("Category deleted successfully.");
        }
    }
}
