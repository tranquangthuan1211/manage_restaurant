'use strict';

const { ARRAY } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category', {
      type: ARRAY(Sequelize.STRING),
      allowNull: true // ?
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category');
  }
};