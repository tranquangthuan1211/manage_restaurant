// 'use strict';
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class OrderItem extends Model {
//     static associate(models) {
//       // Define association here
//       OrderItem.belongsTo(models.Order, {
//         foreignKey: 'orderId',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//       OrderItem.belongsTo(models.product, {
//         foreignKey: 'productId',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }
//   }
//   OrderItem.init({
//     orderId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     productId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'OrderItem',
//     tableName: 'order_items',
//     timestamps: true
//   });
//   return OrderItem;
// };

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // Association with Order
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      OrderItem.belongsTo(models.product, {
        foreignKey: 'productId',
        as: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  OrderItem.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'order_items',
      timestamps: true,
    }
  );

  return OrderItem;
};
