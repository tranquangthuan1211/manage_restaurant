'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update foreign key constraint for CartItem
    await queryInterface.removeConstraint('cart_items', 'cart_items_productId_fkey');
    await queryInterface.addConstraint('cart_items', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'cart_items_productId_fkey',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Update foreign key constraint for OrderItem
    await queryInterface.removeConstraint('order_items', 'order_items_productId_fkey');
    await queryInterface.addConstraint('order_items', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'order_items_productId_fkey',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert foreign key constraint for CartItem
    await queryInterface.removeConstraint('cart_items', 'cart_items_productId_fkey');
    await queryInterface.addConstraint('cart_items', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'cart_items_productId_fkey',
      references: {
        table: 'products',
        field: 'id'
      }
    });

    // Revert foreign key constraint for OrderItem
    await queryInterface.removeConstraint('order_items', 'order_items_productId_fkey');
    await queryInterface.addConstraint('order_items', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'order_items_productId_fkey',
      references: {
        table: 'products',
        field: 'id'
      }
    });
  }
};