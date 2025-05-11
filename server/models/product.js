// const { ARRAY } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   const product = sequelize.define('product', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true
//     },
//     category: {
//       type: ARRAY(DataTypes.STRING),
//       allowNull: false
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: 'in_stock',
//       validate: {
//         isIn: [['in_stock', 'out_of_stock']]
//       }
//     }
//   }, {
//     tableName: 'products',
//     timestamps: false
//   });

  
//   product.associate = (models) => {
//     product.hasMany(models.CartItem, {
//       foreignKey: 'productId',
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE'
//     });
//     product.hasMany(models.OrderItem, {
//       foreignKey: 'productId',
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE'
//     });
//     product.hasMany(models.Review, {
//       foreignKey: 'productId',
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE'
//     });
//   }
  
//   return product;
// };

const { ARRAY } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'in_stock',
        validate: {
          isIn: [['in_stock', 'out_of_stock']],
        },
      },
    },
    {
      tableName: 'products',
      timestamps: false,
    }
  );

  product.associate = (models) => {
    product.hasMany(models.CartItem, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    product.hasMany(models.OrderItem, {
      foreignKey: 'productId',
      as: 'orderItems',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    product.hasMany(models.Review, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return product;
};
