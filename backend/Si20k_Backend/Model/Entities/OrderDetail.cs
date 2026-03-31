using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Si20k_Backend.Model.Entities
{
    /// <summary>
    /// Chi tiết từng sản phẩm trong đơn hàng (Order - OrderDetail: 1-Many)
    /// </summary>
    public class OrderDetail : BaseEntity
    {
        [Required]
        public Guid OrderId { get; set; }

        [Required]
        public Guid ProductId { get; set; }

        [Required]
        [MaxLength(255)]
        public string ProductName { get; set; } = string.Empty; // Snapshot tên tại thời điểm mua

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; } // Snapshot giá tại thời điểm mua

        [Required]
        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal SubTotal => UnitPrice * Quantity;

        // Navigation properties
        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }
}
