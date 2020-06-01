using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using pizza_data;
using System.Linq;
using System.Threading.Tasks;

namespace pizza_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToppingsController : ControllerBase
    {
        private readonly OrdersDBContext _context;
        private readonly ILogger<ToppingsController> _logger;

        public ToppingsController(OrdersDBContext context, ILogger<ToppingsController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetToppings()
        {
            this._logger.LogInformation($"{nameof(GetToppings)} called");
            var toppings = await _context.Toppings.ToListAsync();
            this._logger.LogInformation($"{nameof(GetToppings)} correctly loaded data");
            if (toppings.Any())
                return Ok(toppings);
            else
                return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTopping(int id)
        {
            this._logger.LogInformation($"{nameof(GetTopping)} called");
            var topping = await _context.Toppings.FirstOrDefaultAsync(x => x.Id == id);
            this._logger.LogInformation($"{nameof(GetTopping)} correctly loaded data");
            if (topping!=null)
                return Ok(topping);
            else
                return NotFound();
        }
    }
}
