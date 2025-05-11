// services/bookingService.js
const { Booking } = require('../models');

exports.createBooking = async (bookingData) => {
  const booking = await Booking.create(bookingData);
  return booking;
};