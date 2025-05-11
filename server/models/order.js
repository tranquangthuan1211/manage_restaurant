// 'use strict';
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     static associate(models) {
//       // Define association here
//       Order.belongsTo(models.User, {
//         foreignKey: 'userId',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//       Order.hasMany(models.OrderItem, {
//         foreignKey: 'orderId',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }


//   }
//   Order.init({
//     userId: {
//       type: DataTypes.UUID,
//       allowNull: false
//     },
//     totalAmount: {
//       type: DataTypes.FLOAT,
//       allowNull: false
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: 'pending'
//     },
//     shippingMethod: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     shippingAddress: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     modelName: 'Order',
//     tableName: 'orders',
//     timestamps: true
//   });
//   return Order;
// };

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Association with User
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Order.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        as: 'orderItems',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      shippingMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: true,
    }
  );

  return Order;
};
