using Si20k_Backend.Model.Dtos.CategoryServiceDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepo;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepo = categoryRepository;
        }

        public async Task<bool> CreateAsync(CreateCategoryDto dto)
        {
            var category = await _categoryRepo.GetByNameAsync(dto.Name);
            if (category != null)
            {
                return false;
            }
            var newCategory = new Category
            {
                Id = Guid.NewGuid(),
                Name = dto.Name
            };
            await _categoryRepo.AddAsync(newCategory);
            await _categoryRepo.SaveChangeAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null)
            {
                return false;
            }
            await _categoryRepo.Delete(category);
            return true;
        }

        public async Task<IEnumerable<CategoryDataDto>> GetAllAsync()
        {
            var categories = await _categoryRepo.GetAllAsync();
            return categories.Select(c => new CategoryDataDto
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();
        }

        public async Task<CategoryDataDto?> GetByIdAsync(Guid id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);

            if (category == null)
            {
                return null;
            }

            return new CategoryDataDto
            {
                Id = category.Id,
                Name = category.Name
            };

        }

        public async Task<bool> UpdateAsync(Guid id, UpdateCategoryDto dto)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null)
            {
                return false;
            }
            category.Name = dto.Name;
            await _categoryRepo.Update(category);
            return true;
        }
    }
}
