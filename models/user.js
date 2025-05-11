// models/user.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'customer', // Default role is 'customer'
      validate: {
        isIn: [['customer', 'admin']], // Only allow 'customer' or 'admin'
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'male', // Default gender is 'male'
      validate: {
        isIn: [['male', 'female']], // Only allow 'male' or 'female'
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null values
      validate: {
        len: [10, 15], // Assuming phone numbers are between 10 and 15 characters
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null values
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active', // Default status is 'active'
      validate: {
        isIn: [['active', 'inactive']], // Only allow 'active
      }
    }
  }, {
    tableName: 'users',
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Cart, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    User.hasMany(models.Booking, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return User;
};