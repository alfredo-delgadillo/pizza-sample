'use strict';
module.exports = (sequelize, DataTypes) => {
  const topping = sequelize.define('topping', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    /*pizzaid: {
      type: DataTypes.INTEGER,
      references: {
         model: 'pizza',
         key: 'id',
      }
   }*/
  }, {});
  topping.associate = models => {
    topping.belongsTo(models.pizza, {
      foreignKey: {
        allowNull: false
      }
    });
    topping.hasMany(models.pizzaorderdetail, {
      onDelete: "cascade"
    });
  };
  
  return topping;
};