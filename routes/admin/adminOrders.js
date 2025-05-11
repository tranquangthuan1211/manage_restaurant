const express = require('express');
const router = express.Router();
const { getAdminOrders, updateOrderStatus } = require('../../controllers/adminOrdersController');

router.get('/orders', getAdminOrders);

router.put('/orders/:orderId/status', updateOrderStatus);

module.exports = router;
