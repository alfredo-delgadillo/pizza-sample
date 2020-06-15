'use strict';
module.exports = (sequelize, DataTypes) => {
  const pizza = sequelize.define('pizza', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  pizza.associate = models => {
    //associations can be defined here
    pizza.hasMany(models.topping, {
      onDelete: "cascade"
    });
    pizza.hasMany(models.pizzaorder, {
      onDelete: "cascade"
    });
  };
  
  return pizza;
};