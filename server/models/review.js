'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Define association here
      Review.belongsTo(models.product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Review.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    helpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    notHelpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: true
  });
  return Review;
};