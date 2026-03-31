using Si20k_Backend.Model.Entities;

namespace Si20k_Backend.Repositories.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        /// <summary>Lấy tất cả đơn hàng kèm chi tiết, sắp xếp mới nhất trước</summary>
        Task<IEnumerable<Order>> GetAllWithDetailsAsync();

        /// <summary>Lấy đơn hàng theo ID kèm OrderDetails</summary>
        Task<Order?> GetByIdWithDetailsAsync(Guid id);

        /// <summary>Lấy tất cả đơn hàng của một user cụ thể</summary>
        Task<IEnumerable<Order>> GetByUserIdAsync(Guid userId);
    }
}
