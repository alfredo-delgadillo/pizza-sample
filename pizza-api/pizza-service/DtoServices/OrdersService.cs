using pizza_data;
using pizza_data.models;
using pizza_service.Models;
using System.Linq;
using System.Threading.Tasks;

namespace pizza_service.DtoServices
{
    internal class OrdersService
    {
        private readonly OrdersDBContext _context;
        public OrdersService(OrdersDBContext context)
        {
            this._context = context;
        }
        public Task<bool> SaveOrder(PizzaOrderModel orderModel)
        {
            var order = new PizzaOrder(orderModel.Pizza);
            foreach (var topping in orderModel.Toppings)
            {
                order.Orders.Add(new PizzaOrderDetail(order, topping));
            }

            var saveOrder = new TaskCompletionSource<bool>();
            if (order.Orders.Any())
            {
                _context.PizzaOrders.Add(order);
                _context.SaveChanges();

                saveOrder.SetResult(true);
            }
            return saveOrder.Task;
        }
    }
}
