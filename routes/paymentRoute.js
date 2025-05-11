const express = require("express");
const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('../config/paypal');
const router = express.Router();

router.post('/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  const value = req.body.value || '10.00'; // Default value if not provided
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: value,
      }
    }]
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

// Xác nhận đơn hàng
router.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error capturing order');
  }
});

module.exports = router;