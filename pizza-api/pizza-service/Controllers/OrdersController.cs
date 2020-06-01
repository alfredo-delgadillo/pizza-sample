using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using pizza_data;
using pizza_service.DtoServices;
using pizza_service.Models;
using System.Linq;
using System.Threading.Tasks;

namespace pizza_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrdersDBContext _context;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(OrdersDBContext context, ILogger<OrdersController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            this._logger.LogInformation($"{nameof(GetOrders)} called");
            var pizzas = await _context.Pizzas.ToListAsync();
            this._logger.LogInformation($"{nameof(GetOrders)} correctly loaded data");
            if (pizzas.Any())
                return Ok(pizzas);
            else
                return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            this._logger.LogInformation($"{nameof(GetOrder)} called");
            var pizza = await _context.Pizzas.FirstOrDefaultAsync(x => x.Id == id);
            this._logger.LogInformation($"{nameof(GetOrder)} correctly loaded data");
            if (pizza != null)
                return Ok(pizza);
            else
                return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> PostOrder([FromBody] PizzaOrderModel order)
        {
            this._logger.LogInformation($"{nameof(PostOrder)} called");
            if (order != null && order.Pizza != null && order.Toppings != null)
            {
                var service = new OrdersService(_context);
                bool ret = await service.SaveOrder(order);
                this._logger.LogInformation($"{nameof(PostOrder)} correctly loaded data");
                return Ok(true);
            }

            this._logger.LogInformation($"{nameof(PostOrder)} unexpected data provided");

            return UnprocessableEntity();
        }
    }
}
