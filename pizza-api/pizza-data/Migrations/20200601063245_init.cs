using Microsoft.EntityFrameworkCore.Migrations;

namespace pizza_data.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pizzas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Picture = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pizzas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PizzaOrders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PizzaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PizzaOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PizzaOrders_Pizzas_PizzaId",
                        column: x => x.PizzaId,
                        principalTable: "Pizzas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Toppings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    PizzaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Toppings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Toppings_Pizzas_PizzaId",
                        column: x => x.PizzaId,
                        principalTable: "Pizzas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PizzaOrderDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PizzaOrderId = table.Column<int>(nullable: false),
                    ToppingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PizzaOrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PizzaOrderDetails_PizzaOrders_PizzaOrderId",
                        column: x => x.PizzaOrderId,
                        principalTable: "PizzaOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PizzaOrderDetails_Toppings_ToppingId",
                        column: x => x.ToppingId,
                        principalTable: "Toppings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "Description", "Name", "Picture" },
                values: new object[] { 1, "Description", "Hawaiian", "https://www.publicdomainpictures.net/pictures/270000/t2/pizza-1532881335pCX.jpg" });

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "Description", "Name", "Picture" },
                values: new object[] { 2, "Description", "Peperoni", "https://www.publicdomainpictures.net/pictures/300000/t2/pizza-1557512546UWH.jpg" });

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "Description", "Name", "Picture" },
                values: new object[] { 3, "Description", "Irish", "https://www.publicdomainpictures.net/pictures/120000/t2/pizza-1431957490WiY.jpg" });

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "Description", "Name", "Picture" },
                values: new object[] { 4, "Description", "Strogonoff", "https://www.publicdomainpictures.net/pictures/40000/t2/fresh-pizza.jpg" });

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "Description", "Name", "Picture" },
                values: new object[] { 5, "Description", "Corn", "https://www.publicdomainpictures.net/pictures/340000/t2/pizza-food-picture-1589652491vsj.jpg" });

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "Description", "Name", "Picture" },
                values: new object[] { 6, "Description", "Hotdog", "https://www.publicdomainpictures.net/pictures/10000/t2/pizza-topping-87127713332743Vt.jpg" });

            migrationBuilder.CreateIndex(
                name: "IX_PizzaOrderDetails_PizzaOrderId",
                table: "PizzaOrderDetails",
                column: "PizzaOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PizzaOrderDetails_ToppingId",
                table: "PizzaOrderDetails",
                column: "ToppingId");

            migrationBuilder.CreateIndex(
                name: "IX_PizzaOrders_PizzaId",
                table: "PizzaOrders",
                column: "PizzaId");

            migrationBuilder.CreateIndex(
                name: "IX_Toppings_PizzaId",
                table: "Toppings",
                column: "PizzaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PizzaOrderDetails");

            migrationBuilder.DropTable(
                name: "PizzaOrders");

            migrationBuilder.DropTable(
                name: "Toppings");

            migrationBuilder.DropTable(
                name: "Pizzas");
        }
    }
}
