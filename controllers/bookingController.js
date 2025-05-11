const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
  const { name, datetime, numberOfPeople, specialRequest } = req.body;
  const userId = req.user.id;

  try {
    const booking = await bookingService.createBooking({ userId, name, datetime, numberOfPeople, specialRequest });
    res.status(200).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};