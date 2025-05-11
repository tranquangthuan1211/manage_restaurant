// services/orderService.js
const { Cart, CartItem, Order, OrderItem, product } = require('../models');

exports.createOrder = async (orderDetails) => {
  const { userId, shippingMethod, shippingAddress } = orderDetails;
  console.log(JSON.stringify(orderDetails));

  // Retrieve the user's cart and cart items
  const cart = await Cart.findOne({ where: { userId }, include: [CartItem] });

  if (!cart) {
    throw new Error('Cart not found');
  }

  // Calculate the total amount
  let totalAmount = 0;
  const cartItems = await CartItem.findAll({ where: { cartId: cart.id }, include: [product] });
  cartItems.forEach(item => {
    totalAmount += item.quantity * item.product.price;
  });

  // Create a new order
  const order = await Order.create({
    userId,
    totalAmount,
    status: 'pending',
    shippingMethod: shippingMethod,
    shippingAddress: shippingAddress

  });

  // Create order items
  const orderItems = cartItems.map(item => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,
  }));
  await OrderItem.bulkCreate(orderItems);

  // Clear the cart
  await CartItem.destroy({ where: { cartId: cart.id } });

  return order;
};