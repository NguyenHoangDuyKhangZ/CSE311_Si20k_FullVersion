namespace Si20k_Backend.Model.Dtos.OrderServiceDto
{
    /// <summary>
    /// Chi tiết một dòng sản phẩm trong đơn — trả về cho client
    /// </summary>
    public class OrderDetailDataDto
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal SubTotal => UnitPrice * Quantity;
    }

    /// <summary>
    /// Toàn bộ thông tin đơn hàng trả về cho client
    /// </summary>
    public class OrderDataDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string RecipientName { get; set; } = string.Empty;
        public string RecipientPhone { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal FinalAmount { get; set; }
        public string? VoucherCode { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<OrderDetailDataDto> Items { get; set; } = new();
    }
}
