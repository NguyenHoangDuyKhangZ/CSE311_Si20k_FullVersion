namespace Si20k_Backend.Model.Dtos.OrderServiceDto
{
    /// <summary>
    /// Một dòng trong giỏ hàng gửi lên khi đặt đơn
    /// </summary>
    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
