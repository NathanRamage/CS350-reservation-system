const mongoose = require('mongoose');
const Room = require('../models/Room');

exports.getSearch = (req, res) => {
  Room.find({}, (err, rooms) => {
    console.log(rooms);
    res.render('search', {Rooms: rooms});
  });
};
