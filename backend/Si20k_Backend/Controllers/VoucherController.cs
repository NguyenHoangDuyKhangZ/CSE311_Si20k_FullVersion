using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Si20k_Backend.Model.Dtos.VoucherServiceDto;
using Si20k_Backend.Services.Interfaces;

namespace Si20k_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly IVoucherService _voucherService;

        public VoucherController(IVoucherService voucherService)
        {
            _voucherService = voucherService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VoucherDataDto>>> GetAllVouchers()
        {
            var vouchers = await _voucherService.GetAllAsync();
            if (vouchers == null || !vouchers.Any())
            {
                return NotFound("No vouchers found.");
            }
            return Ok(vouchers);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<VoucherDataDto>> GetVoucherById(Guid id)
        {
            var voucher = await _voucherService.GetByIdAsync(id);
            if (voucher == null)
            {
                return NotFound("Voucher Not Found.");
            }
            return Ok(voucher);
        }
        [Authorize]
        [HttpGet("code/{voucherCode}")]
        public async Task<ActionResult<VoucherDataDto>> GetVoucherByCode(string voucherCode)
        {
            var voucher = await _voucherService.GetByVoucherCodeAsync(voucherCode);
            if (voucher == null)
            {
                return NotFound("Voucher Not Found.");
            }
            return Ok(voucher);
        }
        [Authorize(Policy = "OnlyAdmin")]
        [HttpPost]
        public async Task<IActionResult> CreateVoucher([FromBody] CreateVoucherDto dto)
        {
            var result = await _voucherService.CreateAsync(dto);
            if (!result)
            {
                return BadRequest("Failed to create voucher, please try again later.");
            }
            return Ok("Voucher created successfully.");
        }
        [Authorize(Policy ="OnlyAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVoucher(Guid id, [FromBody] UpdateVoucherDto dto)
        {
            var result = await _voucherService.UpdateAsync(id, dto);
            if (!result)
            {
                return BadRequest("Failed to update voucher, please try again later.");
            }
            return Ok("Voucher updated successfully.");
        }

        [Authorize(Policy = "OnlyAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoucher(Guid id)
        {
            var result = await _voucherService.DeleteAsync(id);
            if (!result)
            {
                return BadRequest("Failed to delete voucher, please try again later.");
            }
            return Ok("Voucher deleted successfully.");
        }
    }
}
