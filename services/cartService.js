const userService = require('./userService')
const { Cart, CartItem, product, User, sequelize } = require('../models')
const { Op, Sequelize } = require('sequelize');

exports.findCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ where: { userId: userId } });
  return cart;
}

exports.addProductToCart = async (userId, productId, quantity) => {
  // We create cart for user if it doesn't exist
  const user = await userService.findUserById(userId);
  if (!user) {
    console.log('User not found');
    return;
  }
  console.log("user for cart",user);
  // Create a cart for the user if it doesn't exist
  const cart = await this.findCartByUserId(user.id);
  if (!cart) {
    const newCart = await Cart.create({ userId: user.id });
    console.log('New cart created:', newCart);
  }
  const prod = await product.findByPk(productId);
  if (!prod) {
    console.log('Product not found');
    return;
  }
  // Check if the product is already in the cart
  // If it is, increase the quantity
  // If it isn't, create a new cart item
  let cartItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId: prod.id,
    },
  });
  console.log('Cart item found:', cartItem);
  if (cartItem != null) {
    cartItem.quantity += 1;
    await cartItem.save();
  } else {
    const maxId = await CartItem.max('id');
    cartItem = await CartItem.create({
      id: maxId + 1,
      cartId: cart.id,
      productId: prod.id,
      quantity: quantity,
    });
  }
  console.log('Cart item created:', cartItem);
}

exports.countAll = async (userId) => {
  const cart = await this.findCartByUserId(userId);
  if (!cart) {
    console.log('Cart not found');
    const newCart = await Cart.create({ userId: userId });
    console.log('New cart created:', newCart);
    return 0;
  }
  const cartItems = await CartItem.findAll({
    where: { cartId: cart.id },
  });
  let total = 0;
  cartItems.forEach((item) => {
    total += item.quantity;
  });
  return total;
}

exports.getCart = async (userId) => {
  try {
    const result = await sequelize.query(`
      SELECT 
        u.id AS "userId", 
        u.name AS "userName", 
        c.id AS "cartId", 
        json_agg(
          json_build_object(
            'id', ci.id, 
            'productId', ci."productId", 
            'quantity', ci.quantity,
            'product', json_build_object(
              'id', p.id,
              'name', p.name,
              'price', p.price,
              'description', p.description
            )
          )
        ) AS "cartItems"
      FROM users u
      LEFT JOIN carts c ON u.id = c."userId"
      LEFT JOIN cart_items ci ON c.id = ci."cartId"
      LEFT JOIN products p ON ci."productId" = p.id
      WHERE u.id = :userId
      GROUP BY u.id, c.id
      HAVING COUNT(ci.id) > 0
    `, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(result);

    if (!result) {
      console.log('User not found');
      return;
    }

    return result[0];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

exports.removeFromCart = async (userId, productId) => {
  try {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      console.log('Cart not found');
      return;
    }

    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });
    if (!cartItem) {
      console.log('Product not found in cart');
      return;
    }
    await cartItem.destroy();
    console.log('Product removed from cart:', cartItem);
  } catch (error) {
    console.error('Error removing product from cart:', error);
  }
}

exports.increaseQuantity = async (userId, productId) => {
  try {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      console.log('Cart not found');
      return -1;
    }

    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });
    if (!cartItem) {
      console.log('Product not found in cart');
      return -1;
    }

    cartItem.quantity += 1;
    await cartItem.save();
    console.log('Quantity increased:', cartItem);
    return cartItem.quantity;
  } catch (error) {
    console.error('Error increasing quantity:', error);
    return -1;
  }
}

exports.decreaseQuantity = async (userId, productId) => {
  try {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      console.log('Cart not found');
      return -1;
    }

    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });
    if (!cartItem) {
      console.log('Product not found in cart');
      return -1;
    }

    if (cartItem.quantity == 1) {
      return 1;
    }
    cartItem.quantity -= 1;
    await cartItem.save();
    console.log('Quantity decreased:', cartItem);
    return cartItem.quantity;
  } catch (error) {
    console.error('Error decreasing quantity:', error);
    return -1;
  }
}

exports.totalPrice = async (userId) => {
  const cart = await this.getCart(userId);
  if (!cart) {
    console.log('Cart not found');
    // Hotfix: cart won't return anything if it's empty
    return 0;
  }
  let sum = 0;
  cart.cartItems.forEach((item) => {
    sum += item.quantity * item.product.price;
  });
  sum = Math.round(sum * 100) / 100;
  return sum;
}