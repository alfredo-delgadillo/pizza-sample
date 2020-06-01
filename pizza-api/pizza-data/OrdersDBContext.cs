using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using pizza_data.models;

namespace pizza_data
{
    public class OrdersDBContext : DbContext
    {
        private readonly string _baseUrl = "https://www.publicdomainpictures.net/pictures";
        public OrdersDBContext() : base() { }
        public OrdersDBContext(DbContextOptions<OrdersDBContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pizza>()
                .HasMany(t => t.Toppings)
                .WithOne(x => x.Pizza)
                .HasForeignKey(y => y.PizzaId)
                .IsRequired();

            modelBuilder.Entity<Pizza>()
                .HasMany(t => t.PizzaOrders)
                .WithOne(x => x.Pizza)
                .HasForeignKey(y => y.PizzaId);

            modelBuilder.Entity<PizzaOrder>()
                .HasMany(a => a.Orders)
                .WithOne(b => b.PizzaOrder)
                .HasForeignKey(b => b.PizzaOrderId);

            /*modelBuilder.Entity<PizzaOrderDetail>()
                .HasKey(bc => new { bc.PizzaOrderRefId, bc.ToppingRefId });*/

            var hawaiian = new Pizza(1, $"{ this._baseUrl }/270000/t2/pizza-1532881335pCX.jpg", "Hawaiian", "Description");
            var peperoni = new Pizza(2, $"{ this._baseUrl }/300000/t2/pizza-1557512546UWH.jpg", "Peperoni", "Description");
            var irish = new Pizza(3, $"{ this._baseUrl }/120000/t2/pizza-1431957490WiY.jpg", "Irish", "Description");
            var strogonoff = new Pizza(4, $"{ this._baseUrl }/40000/t2/fresh-pizza.jpg", "Strogonoff", "Description");
            var corn = new Pizza(5, $"{ this._baseUrl }/340000/t2/pizza-food-picture-1589652491vsj.jpg", "Corn", "Description");
            var hotdog = new Pizza(6, $"{ this._baseUrl }/10000/t2/pizza-topping-87127713332743Vt.jpg", "Hotdog", "Description");
            modelBuilder.Entity<Pizza>()
                .HasData(
                    hawaiian,
                    peperoni,
                    irish,
                    strogonoff,
                    corn,
                    hotdog);

            /*modelBuilder.Entity<Pizza>()
                .HasData(
                new Topping(1, "Ham,", "Description", hawaiian),
                  new Topping(2, "Pineapple", "Description", hawaiian),
                  new Topping(3, "Peperoni.", "Description", peperoni),
                  new Topping(4, "Potatoes", "Description", irish),
                  new Topping(5, "Cabbage", "Description", irish),
                  new Topping(6, "Strogonoff", "Description", strogonoff),
                  new Topping(7, "Corn", "Description", corn),
                  new Topping(8, "Hotdog", "Description", hotdog)
            );*/
        }

        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<PizzaOrder> PizzaOrders { get; set; }
        public DbSet<PizzaOrderDetail> PizzaOrderDetails { get; set; }
    }
}
