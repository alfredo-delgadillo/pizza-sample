using System.Text.Json.Serialization;

namespace pizza_data.models
{
    public class PizzaOrderDetail
    {
        public PizzaOrderDetail() { }
        public PizzaOrderDetail(PizzaOrder order, Topping topping)
        {
            this.PizzaOrderId = order.Id; this.ToppingId = topping.Id;
        }

        public int Id { get; internal set; }
        [JsonIgnore]
        public int PizzaOrderId { get; set; }
        public virtual PizzaOrder PizzaOrder { get; set; }
        [JsonIgnore]
        public int ToppingId { get; set; }
        public virtual Topping Topping { get; set; }
    }
}
