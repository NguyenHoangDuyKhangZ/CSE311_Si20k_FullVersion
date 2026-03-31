using Si20k_Backend.Model.Entities;

namespace Si20k_Backend.Repositories.Interfaces
{
    public interface IVoucherRepository : IRepository<Voucher>
    {
        Task<Voucher?> GetByVoucherCode(string voucherCode);
    }

}
