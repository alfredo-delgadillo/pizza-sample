using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace pizza_data
{
    public static class DbStartup
    {
        public static IConfiguration Configuration { get; private set; }

        public static void AddOrdersDb(this IServiceCollection services, IConfiguration configuration)
        {
            Configuration = configuration;

            services
                .AddEntityFrameworkSqlite()
                .AddDbContext<OrdersDBContext>(
                    options => options.UseSqlite());
        }

        public static void UseSqlite(this DbContextOptionsBuilder options)
        {
            string conString;
            if (Configuration != null)
                conString = ConfigurationExtensions
                   .GetConnectionString(Configuration, "DBConnect");
            else
                conString = "./Data Source=orders.db";
            options.UseSqlite(conString);
            options.EnableSensitiveDataLogging(sensitiveDataLoggingEnabled: true);
        }
    }
}
