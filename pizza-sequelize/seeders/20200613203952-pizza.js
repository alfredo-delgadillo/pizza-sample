'use strict';

const returnID = value => (
  Array.isArray(value) ? value[0].id : value
);

module.exports = {
  async up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      INSERT INTO [Pizzas] ([Id],[Name],[Description],[Picture]) VALUES (
      1,'Hawaiian','Description','https://www.publicdomainpictures.net/pictures/270000/t2/pizza-1532881335pCX.jpg');
      INSERT INTO [Pizzas] ([Id],[Name],[Description],[Picture]) VALUES (
      2,'Peperoni','Description','https://www.publicdomainpictures.net/pictures/300000/t2/pizza-1557512546UWH.jpg');
      INSERT INTO [Pizzas] ([Id],[Name],[Description],[Picture]) VALUES (
      3,'Irish','Description','https://www.publicdomainpictures.net/pictures/120000/t2/pizza-1431957490WiY.jpg');
      INSERT INTO [Pizzas] ([Id],[Name],[Description],[Picture]) VALUES (
      4,'Strogonoff','Description','https://www.publicdomainpictures.net/pictures/40000/t2/fresh-pizza.jpg');
      INSERT INTO [Pizzas] ([Id],[Name],[Description],[Picture]) VALUES (
      5,'Corn','Description','https://www.publicdomainpictures.net/pictures/340000/t2/pizza-food-picture-1589652491vsj.jpg');
      INSERT INTO [Pizzas] ([Id],[Name],[Description],[Picture]) VALUES (
      6,'Hotdog','Description','https://www.publicdomainpictures.net/pictures/10000/t2/pizza-topping-87127713332743Vt.jpg');
      Example:*/
    const currentDate = new Date();
    const option = { returning: true };

    const pizzaSeeded = await queryInterface.rawSelect('pizzas', {
      where: {
        id: 1,
      },
    }, ['id']);

    //If pizzas not seeded already
    if (!pizzaSeeded) {
      let pizzaid = returnID(await queryInterface.bulkInsert('pizzas', [{
        name: 'Hawaiian',
        description: "Hawaiian Pizza",
        picture: "https://www.publicdomainpictures.net/pictures/270000/t2/pizza-1532881335pCX.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], option));
      await queryInterface.bulkInsert('toppings', [
        { name: "Ham", description: "Ham Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate },
        { name: "Pineapple", description: "Pineapple Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate }
      ], {});

      pizzaid = returnID(await queryInterface.bulkInsert('pizzas', [{
        name: 'Peperoni',
        description: "Peperoni Pizza",
        picture: "https://www.publicdomainpictures.net/pictures/300000/t2/pizza-1557512546UWH.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], option));
      await queryInterface.bulkInsert('toppings', [
        { name: "Peperoni", description: "Peperoni Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate }
      ], {});

      pizzaid = returnID(await queryInterface.bulkInsert('pizzas', [{
        name: 'Irish',
        description: "Irish Pizza",
        picture: "https://www.publicdomainpictures.net/pictures/120000/t2/pizza-1431957490WiY.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], option));
      await queryInterface.bulkInsert('toppings', [
        { name: "Potatoes", description: "Potatoes Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate },
        { name: "Cabbage", description: "Cabbage Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate }
      ], {});

      pizzaid = returnID(await queryInterface.bulkInsert('pizzas', [{
        name: 'Strogonoff',
        description: "Strogonoff Pizza",
        picture: "https://www.publicdomainpictures.net/pictures/40000/t2/fresh-pizza.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], option));
      await queryInterface.bulkInsert('toppings', [
        { name: "Strogonoff", description: "Strogonoff Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate }
      ], {});

      pizzaid = returnID(await queryInterface.bulkInsert('pizzas', [{
        name: 'Corn',
        description: "Corn Pizza",
        picture: "https://www.publicdomainpictures.net/pictures/340000/t2/pizza-food-picture-1589652491vsj.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], option));
      await queryInterface.bulkInsert('toppings', [
        { name: "Corn", description: "Corn Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate }
      ], {});

      pizzaid = returnID(await queryInterface.bulkInsert('pizzas', [{
        name: 'Hotdog',
        description: "Hotdog Pizza",
        picture: "https://www.publicdomainpictures.net/pictures/10000/t2/pizza-topping-87127713332743Vt.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], option));
      await queryInterface.bulkInsert('toppings', [
        { name: "Hotdog", description: "Hotdog Topping", pizzaId: pizzaid, createdAt: currentDate, updatedAt: currentDate }
      ], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('toppings', null, {});
    await queryInterface.bulkDelete('pizzas', null, {});
  }
};
