'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update foreign key constraint for Cart
    await queryInterface.removeConstraint('carts', 'carts_userId_fkey');
    await queryInterface.addConstraint('carts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'carts_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Update foreign key constraint for Order
    await queryInterface.removeConstraint('orders', 'orders_userId_fkey');
    await queryInterface.addConstraint('orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'orders_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Update foreign key constraint for Booking
    await queryInterface.removeConstraint('bookings', 'bookings_userId_fkey');
    await queryInterface.addConstraint('bookings', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'bookings_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert foreign key constraint for Cart
    await queryInterface.removeConstraint('carts', 'carts_userId_fkey');
    await queryInterface.addConstraint('carts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'carts_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    });

    // Revert foreign key constraint for Order
    await queryInterface.removeConstraint('orders', 'orders_userId_fkey');
    await queryInterface.addConstraint('orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'orders_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    });

    // Revert foreign key constraint for Booking
    await queryInterface.removeConstraint('bookings', 'bookings_userId_fkey');
    await queryInterface.addConstraint('bookings', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'bookings_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    });
  }
};