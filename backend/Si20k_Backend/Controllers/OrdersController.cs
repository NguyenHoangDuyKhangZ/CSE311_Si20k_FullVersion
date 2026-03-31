using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Si20k_Backend.Model.Dtos.OrderServiceDto;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        /// <summary>
        /// POST /api/Orders — Khách đặt hàng.
        /// Yêu cầu đăng nhập (bất kỳ role nào).
        /// Backend sẽ kiểm tra kho và xử lý toàn bộ trong DB Transaction.
        /// </summary>
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            // Lấy UserId từ JWT claim
            var userIdString = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid userId))
                return Unauthorized("Không xác định được người dùng.");

            try
            {
                var order = await _orderService.ProcessOrderAsync(dto, userId);
                return Ok(order);
            }
            catch (InvalidOperationException ex)
            {
                // Lỗi nghiệp vụ: hết hàng, sản phẩm không tồn tại...
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// GET /api/Orders — Admin xem tất cả đơn hàng.
        /// </summary>
        [Authorize(Policy = "OnlyAdmin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDataDto>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllAsync();
            return Ok(orders);
        }

        /// <summary>
        /// GET /api/Orders/{id} — Xem chi tiết một đơn hàng.
        /// Người dùng chỉ xem được đơn của họ; Admin xem được tất cả.
        /// </summary>
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDataDto>> GetOrderById(Guid id)
        {
            var order = await _orderService.GetByIdAsync(id);
            if (order == null) return NotFound("Không tìm thấy đơn hàng.");

            // Kiểm tra quyền: chỉ owner hoặc Admin mới xem được
            var userIdString = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var role = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;

            if (role != "Admin" && (!Guid.TryParse(userIdString, out Guid userId) || order.UserId != userId))
                return Forbid();

            return Ok(order);
        }

        /// <summary>
        /// GET /api/Orders/my — Lấy lịch sử đơn hàng của user hiện tại.
        /// </summary>
        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<OrderDataDto>>> GetMyOrders()
        {
            var userIdString = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            if (!Guid.TryParse(userIdString, out Guid userId))
                return Unauthorized();

            var orders = await _orderService.GetByUserIdAsync(userId);
            return Ok(orders);
        }

        /// <summary>
        /// PATCH /api/Orders/{id}/status — Admin cập nhật trạng thái đơn hàng.
        /// </summary>
        [Authorize(Policy = "OnlyAdmin")]
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] UpdateOrderStatusDto dto)
        {
            var result = await _orderService.UpdateStatusAsync(id, dto.Status);
            if (!result) return NotFound("Không tìm thấy đơn hàng.");
            return Ok($"Cập nhật trạng thái thành '{dto.Status}' thành công.");
        }
    }

    /// <summary>Simple DTO cho PATCH status</summary>
    public class UpdateOrderStatusDto
    {
        public string Status { get; set; } = string.Empty;
    }
}
