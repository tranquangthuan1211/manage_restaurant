const { Order, OrderItem, product } = require('../models');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

exports.viewRevenueAnalytics = async (req, res) => {
    console.log('viewRevenueByProduct function called');
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;

    const start = startDate
      ? new Date(startDate).setHours(0, 0, 0, 0)
      : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate
      ? new Date(endDate).setHours(23, 59, 59, 999)
      : new Date();

    let groupByFormat;
    switch (groupBy) {
      case 'month':
        groupByFormat = sequelize.fn('to_char', sequelize.col('createdAt'), 'YYYY-MM');
        break;
      case 'year':
        groupByFormat = sequelize.fn('to_char', sequelize.col('createdAt'), 'YYYY');
        break;
      default:
        groupByFormat = sequelize.fn('DATE', sequelize.col('createdAt')); // Default: day
    }

    const revenueData = await Order.findAll({
      attributes: [
        [groupByFormat, 'groupedDate'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalRevenue'],
      ],
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
        status: 'complete',
      },
      group: [groupByFormat],
      order: [[groupByFormat, 'ASC']],
    });

    if (req.xhr) {
      return res.json({ revenueData });
    }

    res.render('../views/admin/analytics/analytics.ejs', {
      user: req.user,
      revenueData,
      title: 'Revenue Analytics',
      layout: 'layouts/admin/admin_page_layout'
    });
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({ error: 'Unable to fetch analytics data.' });
  }
};

exports.viewRevenueByProduct = async (req, res) => {
    try {
      const { startDate, endDate, groupBy = 'day' } = req.query;
  
      const start = startDate && !isNaN(new Date(startDate))
        ? new Date(startDate).setHours(0, 0, 0, 0)
        : new Date(new Date().setDate(new Date().getDate() - 30));
      const end = endDate && !isNaN(new Date(endDate))
        ? new Date(endDate).setHours(23, 59, 59, 999)
        : new Date();
  
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      console.log('Group By:', groupBy);
  
      let groupByFormat;
      switch (groupBy) {
        case 'month':
          groupByFormat = sequelize.fn('to_char', sequelize.col('Order.createdAt'), 'YYYY-MM');
          break;
        case 'year':
          groupByFormat = sequelize.fn('to_char', sequelize.col('Order.createdAt'), 'YYYY');
          break;
        default:
          groupByFormat = sequelize.fn('DATE', sequelize.col('Order.createdAt'));
      }
  
      const revenueData = await OrderItem.findAll({
        attributes: [
          [sequelize.col('product.id'), 'productId'],
          [sequelize.col('product.name'), 'productName'],
          [groupByFormat, 'groupedDate'],
          [sequelize.fn('SUM', sequelize.literal('OrderItem.price * OrderItem.quantity')), 'totalRevenue'],
          [sequelize.fn('SUM', sequelize.col('OrderItem.quantity')), 'totalQuantity'],
        ],
        include: [
          {
            model: product,
            as: 'product',
            attributes: [],
          },
          {
            model: Order,
            as: 'order',
            where: {
              createdAt: {
                [Op.between]: [start, end],
              },
              status: 'complete',
            },
            attributes: [],
          },
        ],
        group: ['product.id', 'product.name', sequelize.col('Order.createdAt')],
        order: [[groupByFormat, 'ASC'], ['product.id', 'ASC']],
      });
  
      if (req.xhr) {
        return res.json({ revenueData });
      }
  
      res.render('../views/admin/analytics/analytics.ejs', {
        user: req.user,
        revenueData,
        title: 'Revenue By Product',
      });
    } catch (error) {
      console.error('Error in viewRevenueByProduct:', error);
      res.status(500).json({ success: false, message: 'Error loading data.' });
    }
  };
