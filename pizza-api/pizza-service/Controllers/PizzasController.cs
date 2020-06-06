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
    public class PizzasController : ControllerBase
    {
        private readonly OrdersDBContext _context;
        private readonly ILogger<PizzasController> _logger;

        public PizzasController(OrdersDBContext context, ILogger<PizzasController> logger)
        {
            this._context = context;
            this._logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetPizzas()
        {
            this._logger.LogInformation($"{nameof(GetPizzas)} called");
            var pizzas = await _context.Pizzas.ToListAsync();
            this._logger.LogInformation($"{nameof(GetPizzas)} correctly loaded data");
            if (pizzas.Any())
                return Ok(pizzas);
            else
                return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPizza(int id)
        {
            this._logger.LogInformation($"{nameof(GetPizzas)} called");
            var pizza = await _context.Pizzas.FirstOrDefaultAsync(x => x.Id == id);
            this._logger.LogInformation($"{nameof(GetPizzas)} correctly loaded data");
            if (pizza != null)
                return Ok(pizza);
            else
                return NotFound();
        }

        [HttpGet("{id}/toppings")]
        public async Task<IActionResult> GetToppings(int id)
        {
            this._logger.LogInformation($"{nameof(GetToppings)} called");
            var toppings = await _context.Toppings.Where(x => x.PizzaId == id).ToListAsync();
            this._logger.LogInformation($"{nameof(GetToppings)} correctly loaded data");
            
            if (toppings.Any())
                return Ok(toppings);
            else
                return NotFound();
        }
    }
}
