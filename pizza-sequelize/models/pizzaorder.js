'use strict';
module.exports = (sequelize, DataTypes) => {
  const pizzaorder = sequelize.define('pizzaorder', {
    description: DataTypes.STRING,
    /*pizzaid: {
      type: DataTypes.INTEGER,
      references: {
         model: 'pizzas',
         key: 'id',
      }
   }*/
  }, {});
  pizzaorder.associate = models => {
    // associations can be defined here
    pizzaorder.belongsTo(models.pizza, {
      foreignKey: {
        allowNull: false
      }
    });
    pizzaorder.hasMany(models.pizzaorderdetail, {
      onDelete: "cascade"
    });
  };
  return pizzaorder;
};