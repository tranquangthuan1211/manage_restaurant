'use strict';

const { Order, OrderItem, product, User } = require('../models');

exports.getAdminOrders = async (req, res) => {
  try {
    const { page = 1, status } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const dbFilter = {};
    if (status) {
      dbFilter.where = {status};
    }
    dbFilter.order = [['createdAt', 'DESC']];
    dbFilter.limit = limit;
    dbFilter.offset = offset;

    //const totalOrders = await Order.count();

    const ordersResult = await Order.findAndCountAll(dbFilter);
    const totalOrders = ordersResult.count;
    const orders = ordersResult.rows;

    const totalPages = Math.ceil(totalOrders / limit);
  
    // Find order items (with name) for each order 
    for (const order of orders) {
      const orderItems = await OrderItem.findAll({
        where: { orderId: order.id },
        include: [{ model: product, as: 'product', attributes: ['name'] }]
      });
      order.orderItems = orderItems;
    }

    if (req.xhr) {
      return res.json({ orders, totalPages, currentPage: page });
    }

    // Pass the query data back to match 
    const queryData = { page, limit };
    if (status) {
      queryData.status = status;
    }
    
    const queryString = new URLSearchParams(queryData).toString();

    res.render('admin/orders/adminOrders', {
      title: 'Manage Orders', orders, totalPages, currentPage: page, user: req.user, layout: 'layouts/admin/admin_page_layout',
      queryData: queryData,
      queryString: queryString,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    //res.render('error', { title: 'Error', message: 'Unable to fetch orders.' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully.', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status.' });
  }
};