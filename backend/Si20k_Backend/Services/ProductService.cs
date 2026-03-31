using Si20k_Backend.Model.Dtos.ProductServiceDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;

        public ProductService(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        public async Task<bool> CreateAsync(CreateProductDto dto, Guid sellerId)
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                CurrentPrice = dto.CurrentPrice,
                OriginalPrice = dto.OriginalPrice,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl,
                SellerId = sellerId,
                Quantity = dto.Quantity,
                SoldNumber = dto.SoldNumber
            };

            await _productRepo.AddAsync(product);
            await _productRepo.SaveChangeAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
            {
                return false;
            }
            await _productRepo.Delete(product);
            await _productRepo.SaveChangeAsync();
            return true;
        }

        public async Task<IEnumerable<ProductDataDto>> GetAllAsync()
        {
            var products = await _productRepo.GetProductsIncludeSellerCategory();
            var productDtos = products.Select(p => new ProductDataDto
            {
                Id = p.Id,
                Name = p.Name,
                CurrentPrice = p.CurrentPrice,
                OriginalPrice = p.OriginalPrice,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Quantity = p.Quantity,
                SoldNumber = p.SoldNumber,
                CategoryName = p.Category?.Name,
                CategoryId = p.CategoryId,
                SellerName = p.Seller?.FullName,
                SellerId = p.SellerId
            });
            return productDtos;
        }

        public async Task<IEnumerable<ProductDataDto>> GetAllAsyncByUserId(Guid id)
        {
            var products = await _productRepo.GetProductsBySellerId(id);
            if (products == null || !products.Any())
            {
                return null;
            }
            var productDtos = products.Select(p => new ProductDataDto
            {
                Id = p.Id,
                Name = p.Name,
                CurrentPrice = p.CurrentPrice,
                OriginalPrice = p.OriginalPrice,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Quantity = p.Quantity,
                SoldNumber = p.SoldNumber,
                CategoryName = p.Category?.Name,
                CategoryId = p.CategoryId,
                SellerName = p.Seller?.FullName,
                SellerId = p.SellerId
            });
            return productDtos;
        }

        public async Task<ProductDataDto?> GetByIdAsync(Guid id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
            {
                return null;
            }
            var productDto = new ProductDataDto
            {
                Id = product.Id,
                Name = product.Name,
                CurrentPrice = product.CurrentPrice,
                OriginalPrice = product.OriginalPrice,
                Description = product.Description,
                ImageUrl = product.ImageUrl,
                Quantity = product.Quantity,
                SoldNumber = product.SoldNumber,
            };
            return productDto;
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateProductDto dto)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
            {
                return false;
            }

            if (!string.IsNullOrWhiteSpace(dto.Name)) product.Name = dto.Name;
            if (!string.IsNullOrWhiteSpace(dto.Description)) product.Description = dto.Description;
            if (dto.CurrentPrice > 0) product.CurrentPrice = dto.CurrentPrice;
            if (dto.OriginalPrice > 0) product.OriginalPrice = dto.OriginalPrice;
            if (!string.IsNullOrWhiteSpace(dto.ImageUrl)) product.ImageUrl = dto.ImageUrl;
            if (dto.Quantity >= 0) product.Quantity = dto.Quantity;
            product.SoldNumber = dto.SoldNumber;
            if (dto.CategoryId != Guid.Empty) product.CategoryId = dto.CategoryId;
            await _productRepo.Update(product);
            await _productRepo.SaveChangeAsync();
            return true;
        }
    }
}
