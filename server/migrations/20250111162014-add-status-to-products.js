'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'in_stock',
      validate: {
        isIn: [['in_stock', 'out_of_stock']]
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'status');
  }
};