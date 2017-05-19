const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: String,
  roomName: String,
  roomType: String,
  numPeople: Number,
  beds: Array,
  previewImageUrl: String,
  reservedPeriods: Array //array of {startDate: .., endDate: ..}
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
