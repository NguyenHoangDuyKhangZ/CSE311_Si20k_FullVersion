using Si20k_Backend.Model.Entities;

namespace Si20k_Backend.Repositories.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(Guid categoryId);
        Task<IEnumerable<Product>> GetProductsIncludeSellerCategory();

        Task<IEnumerable<Product>> GetProductsBySellerId(Guid sellerId);
    }
}
