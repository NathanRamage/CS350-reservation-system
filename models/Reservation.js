const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  roomId: String,
  userId: String,
  startDate: Date,
  endDate: Date
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;