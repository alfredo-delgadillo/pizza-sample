using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace pizza_data.models
{
    public class PizzaOrder
    {
        public PizzaOrder()
        {
            this.Orders = new List<PizzaOrderDetail>();
        }

        public PizzaOrder(Pizza pizza) : this()
        {
            this.PizzaId = pizza.Id;
        }

        public int Id { get; set; }
        [JsonIgnore]
        public int PizzaId { get; set; }
        public virtual Pizza Pizza { get; set; }
        public virtual List<PizzaOrderDetail> Orders { get; private set; }
    }
}
