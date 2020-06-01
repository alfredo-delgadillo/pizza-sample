using System.Text.Json.Serialization;

namespace pizza_data.models
{
    public class Topping
    {
        public Topping() { }
        public Topping(int id, string name, string description, Pizza pizza) 
        {
            this.Id = id; this.Name = name; this.Description = description; this.PizzaId = pizza.Id;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public int PizzaId { get; set; }
        [JsonIgnore]
        public virtual Pizza Pizza { get; set; }
    }
}
