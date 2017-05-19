const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: String,
  roomName: String,
  totalNumber: Number,
  availableNumber: Number,
  roomType: String,
  numPeople: Number,
  beds: Array,
  previewImageUrl: String
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
