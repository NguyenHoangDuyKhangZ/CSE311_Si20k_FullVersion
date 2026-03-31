using Si20k_Backend.Model.Dtos.CategoryServiceDto;

namespace Si20k_Backend.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDataDto>> GetAllAsync(); //Anonymous Access
        Task<CategoryDataDto?> GetByIdAsync(Guid id); //Anonymous Access
        Task<bool> CreateAsync(CreateCategoryDto user); //Admin Only
        Task<bool> UpdateAsync(Guid id, UpdateCategoryDto dto); //Admin Only
        Task<bool> DeleteAsync(Guid id); //Admin Only
    }
}
