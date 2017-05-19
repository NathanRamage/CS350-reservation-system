const mongoose = require('mongoose');
const Room = require('../models/Room');


exports.getRoom = (req, res) => {
	var roomId = req.param('roomId') || "";
	Room.findOne({roomId:roomId}, (err, room) => {
		res.render('room', 
			{
				room: room,
				title: room.Name + "Bluewhale Hotel Reservation"
			}
		);
	});
};
