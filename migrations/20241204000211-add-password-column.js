'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.describeTable('users', columns => {
      if (columns.password) {
        return Promise.resolve(); 
      }
    });
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'password');
  }
};
