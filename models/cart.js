'use strict';

const User = require('./user'); 

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
    }
  }, {
    tableName: 'carts',
    timestamps: false,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cartId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Cart;
};