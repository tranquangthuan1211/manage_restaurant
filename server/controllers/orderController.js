// controllers/orderController.js
const orderService = require('../services/orderService');
const { Order, OrderItem, product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(200).json({ message: 'Checkout successful', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const totalOrders = await Order.count({ where: { userId } });

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [
            {
              model: product,
              as: 'product',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(totalOrders / limit);

    if (req.xhr) {
      return res.json({ orders, totalPages, currentPage: page });
    }

    res.render('pages/users/order_history', {
      title: 'Order History',
      orders,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error('Error fetching order history:', err);
    res.render('pages/error', { title: 'Error', message: 'Failed to fetch order history.' });
  }
};

