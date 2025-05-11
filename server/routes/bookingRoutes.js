const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(expressLayouts);

router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Please login to book a service"});
  }
  res.render("pages/booking", {title : "Booking"});
});

router.post("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Unauthenticated"});
  };
  return bookingController.createBooking(req, res);
});

module.exports = router;
