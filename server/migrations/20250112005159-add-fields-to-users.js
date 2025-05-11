'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'male',
      validate: {
        isIn: [['male', 'female']], // Only allow 'male' or 'female'
      }
    });
    await queryInterface.addColumn('users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [10, 15], // Assuming phone numbers are between 10 and 15 characters
      }
    });
    await queryInterface.addColumn('users', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.removeColumn('users', 'phoneNumber');
    await queryInterface.removeColumn('users', 'address');
  }
};