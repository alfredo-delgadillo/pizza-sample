using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace pizza_data.models
{
    public class Pizza
    {
        public Pizza() 
        {
            this.Toppings = new List<Topping>();
        }
        public Pizza(int id, string picture, string name, string description): this()
        {
            this.Id = id; this.Picture = picture; this.Name = name; this.Description = description;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        [JsonIgnore]
        public virtual List<Topping> Toppings { get; internal set; }
        [JsonIgnore]
        public List<PizzaOrder> PizzaOrders { get; internal set; }
    }
}
