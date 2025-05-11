'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'shippingMethod', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'standard' // Provide a default value
    });
    await queryInterface.addColumn('orders', 'shippingAddress', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'default address' // Provide a default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'shippingMethod');
    await queryInterface.removeColumn('orders', 'shippingAddress');
  }
};