'use strict';
const { User } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('carts', [
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Hong Phuc' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'John Doe' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Jane Doe' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Alice Smith' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Bob Johnson' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Charlie Brown' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'David Wilson' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Eve Davis' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Frank Miller' } }).then(user => user.id),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        userId: await User.findOne({ where: { name: 'Grace Lee' } }).then(user => user.id),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('carts', null, {});
  }
};
