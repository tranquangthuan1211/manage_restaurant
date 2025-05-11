'use strict';
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');

async function randPass() {
  const pass = Math.random().toString(36).slice(-8);
  return hashPass(pass);
}

async function hashPass(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

function getMockMail(username) {
  return `${username}@example.com`;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Quang Thuan',
        email: 'tranquangthuan132@gmail.com',
        password: await hashPass('1234567'),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'admin'
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'John Doe',
        email: getMockMail('johndoe'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Jane Doe',
        email: getMockMail('janedoe'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Alice Smith',
        email: getMockMail('alicesmith'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Bob Johnson',
        email: getMockMail('bobjohnson'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Charlie Brown',
        email: getMockMail('charliebrown'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'David Wilson',
        email: getMockMail('davidwilson'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Eve Davis',
        email: getMockMail('evedavis'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Frank Miller',
        email: getMockMail('frankmiller'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        name: 'Grace Lee',
        email: getMockMail('gracelee'),
        password: await randPass(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('users', null, {});
  }
};
