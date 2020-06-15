'use strict';
module.exports = (sequelize, DataTypes) => {
  const pizzaorderdetail = sequelize.define('pizzaorderdetail', {
    /*pizzaorderid: {
      type: DataTypes.INTEGER,
      references: {
         model: 'pizzaorder',
         key: 'id',
      }
    },
    toppingid: {
      type: DataTypes.INTEGER,
      references: {
         model: 'topping',
         key: 'id',
      }
    }*/
  }, {});
  pizzaorderdetail.associate = models => {
    // associations can be defined here
    pizzaorderdetail.belongsTo(models.pizzaorder, {
      foreignKey: {
        allowNull: false
      }
    });
    pizzaorderdetail.belongsTo(models.topping, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return pizzaorderdetail;
};