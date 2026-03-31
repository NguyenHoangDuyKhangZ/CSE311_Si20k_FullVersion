using Si20k_Backend.Data;
using Si20k_Backend.Model.Entities;
using Si20k_Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Si20k_Backend.Repositories
{
    public class VoucherRepository : GenericRepository<Voucher>, IVoucherRepository
    {
        public VoucherRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Voucher?> GetByVoucherCode(string voucherCode)
        {
            return await _dbSet.FirstOrDefaultAsync(v => v.VoucherCode == voucherCode);
        }
    }
}
