using pizza_data.models;

namespace pizza_service.Models
{
    public class PizzaOrderModel
    {
        public Pizza Pizza { get; set; }
        public Topping[] Toppings { get; set; }
    }
}
