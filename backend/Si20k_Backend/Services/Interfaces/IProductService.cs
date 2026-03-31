using Si20k_Backend.Model.Dtos.ProductServiceDto;

namespace Si20k_Backend.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDataDto>> GetAllAsync(); //Anonymous
        Task<IEnumerable<ProductDataDto>> GetAllAsyncByUserId(Guid id); // Seller Only
        Task<ProductDataDto?> GetByIdAsync(Guid id);
        Task<bool> CreateAsync(CreateProductDto dto, Guid sellerId); //Seller Only
        Task<bool> UpdateAsync(Guid id, UpdateProductDto dto); //Seller Only
        Task<bool> DeleteAsync(Guid id); //Admin & Seller Only
    }
}
