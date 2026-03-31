using Si20k_Backend.Model.Dtos.VoucherServiceDto;

namespace Si20k_Backend.Services.Interfaces
{
    public interface IVoucherService
    {
        Task<IEnumerable<VoucherDataDto>> GetAllAsync(); //Admin Only 
        Task<VoucherDataDto?> GetByIdAsync(Guid id); //Seller and Buyer
        Task<VoucherDataDto?> GetByVoucherCodeAsync(string voucherCode); //Seller and Buyer
        Task<bool> CreateAsync(CreateVoucherDto user); //Admin Only
        Task<bool> UpdateAsync(Guid id, UpdateVoucherDto dto); //Admin Only
        Task<bool> DeleteAsync(Guid id); //Admin Only
    }
}
