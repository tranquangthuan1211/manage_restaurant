'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'inactive']]
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'status');
  }
};