// routes/orderRoutes.js
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.use(expressLayouts);

router.post('/checkout', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Unauthenticated"});
  }
  orderController.createOrder(req, res);
});

router.get('/checkout-success', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Unauthenticated"});
  }
  res.render('pages/products/checkout_success', {title: 'Checkout Success'});
});

router.get('/history', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', { title: 'Unauthenticated' });
  }
  orderController.getOrderHistory(req, res);
});


module.exports = router;