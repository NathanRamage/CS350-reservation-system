const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomType: String,
  numPeople: Number,
  beds: Array
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
