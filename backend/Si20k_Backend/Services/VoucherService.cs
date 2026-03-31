using Si20k_Backend.Model.Dtos.VoucherServiceDto;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Services
{
    public class VoucherService : IVoucherService
    {
        private readonly IVoucherRepository _voucherRepo;
        public VoucherService(IVoucherRepository voucherRepo)
        {
            _voucherRepo = voucherRepo;
        }

        public async Task<bool> CreateAsync(CreateVoucherDto dto)
        {
            var existingVoucher = _voucherRepo.GetByVoucherCode(dto.VoucherCode);
            if (existingVoucher != null)
            {
                return false;
            }

            var voucher = new Voucher
            {
                Id = Guid.NewGuid(),
                VoucherCode = dto.VoucherCode,
                DiscountType = dto.DiscountType,
                DiscountAmount = dto.DiscountAmount,
                MinOrder = dto.MinOrder,
                MaxDiscount = dto.MaxDiscount,
                Description = dto.Description,
                IsActive = dto.IsActive
            };

            await _voucherRepo.AddAsync(voucher);
            await _voucherRepo.SaveChangeAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var voucher = await _voucherRepo.GetByIdAsync(id);
            if (voucher == null)
            {
                return false;
            }
            await _voucherRepo.Delete(voucher);
            await _voucherRepo.SaveChangeAsync();
            return true;
        }

        public async Task<IEnumerable<VoucherDataDto>> GetAllAsync()
        {
            var vouchers = await _voucherRepo.GetAllAsync();
            return vouchers.Select(v => new VoucherDataDto
            {
                Id = v.Id,
                VoucherCode = v.VoucherCode,
                DiscountType = v.DiscountType,
                DiscountAmount = v.DiscountAmount,
                MinOrder = v.MinOrder,
                MaxDiscount = v.MaxDiscount,
                Description = v.Description,
                IsActive = v.IsActive
            }).ToList();
        }

        public async Task<VoucherDataDto?> GetByIdAsync(Guid id)
        {
            var voucher = await _voucherRepo.GetByIdAsync(id);
            if (voucher == null)
            {
                return null;
            }
            return new VoucherDataDto
            {
                Id = voucher.Id,
                VoucherCode = voucher.VoucherCode,
                DiscountType = voucher.DiscountType,
                DiscountAmount = voucher.DiscountAmount,
                MinOrder = voucher.MinOrder,
                MaxDiscount = voucher.MaxDiscount,
                Description = voucher.Description,
                IsActive = voucher.IsActive
            };
        }

        public async Task<VoucherDataDto?> GetByVoucherCodeAsync(string voucherCode)
        {
            var voucher = await _voucherRepo.GetByVoucherCode(voucherCode);
            if (voucher == null)
            {
                return null;
            }
            return new VoucherDataDto
            {
                Id = voucher.Id,
                VoucherCode = voucher.VoucherCode,
                DiscountType = voucher.DiscountType,
                DiscountAmount = voucher.DiscountAmount,
                MinOrder = voucher.MinOrder,
                MaxDiscount = voucher.MaxDiscount,
                Description = voucher.Description,
                IsActive = voucher.IsActive
            };
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateVoucherDto dto)
        {
            var existingVoucher = await _voucherRepo.GetByIdAsync(id);
            if (existingVoucher == null)
            {
                return false;
            }
            if (!string.IsNullOrWhiteSpace(dto.VoucherCode)) existingVoucher.VoucherCode = dto.VoucherCode;
            if (!string.IsNullOrWhiteSpace(dto.DiscountType)) existingVoucher.DiscountType = dto.DiscountType;
            if (dto.DiscountAmount.HasValue) existingVoucher.DiscountAmount = dto.DiscountAmount.Value;
            if (dto.MinOrder.HasValue) existingVoucher.MinOrder = dto.MinOrder.Value;
            if (dto.MaxDiscount.HasValue) existingVoucher.MaxDiscount = dto.MaxDiscount.Value;
            if (!string.IsNullOrWhiteSpace(dto.Description)) existingVoucher.Description = dto.Description;
            existingVoucher.IsActive = dto.IsActive;
            await _voucherRepo.Update(existingVoucher);
            await _voucherRepo.SaveChangeAsync();
            return true;
        }
    }
}
