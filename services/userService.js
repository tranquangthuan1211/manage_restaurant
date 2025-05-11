const { updateUserById } = require('../controllers/userController');
const { User } = require('../models');
const { Op, Sequelize } = require('sequelize');

exports.findUserById = async (id) => {
    return await User.findByPk(id);
}

exports.findUserByEmail = async (email) => {
    return await User.findOne({ where: { email: email } });
}

exports.createUser = async (userData) => {
    if (userData.name && userData.email && userData.hashedPassword) {
        const userObject = { name: userData.name, email: userData.email, password: userData.hashedPassword, status : 'active' };
        return await User.create(userObject);
    } else {
        console.log(`One of the field is missing, received data was: ${userData}`);
    }
}

exports.updateUserById = async (id, updatingUser) => {
    try {
        await User.update(updatingUser, { where: { id: id } });
        return 0;
    } catch (err) {
        console.error(err.message || err); 
        return -1;
    }
}