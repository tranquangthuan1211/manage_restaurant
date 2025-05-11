'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('orders', 'shippingMethod', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null // Remove the default value
    });
    await queryInterface.changeColumn('orders', 'shippingAddress', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null // Remove the default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('orders', 'shippingMethod', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'standard' // Revert to the previous default value
    });
    await queryInterface.changeColumn('orders', 'shippingAddress', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'default address' // Revert to the previous default value
    });
  }
};