const mongoose = require('mongoose');
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');


exports.getRoom = (req, res) => {
	var roomId = req.param('roomId') || "";
	Room.findOne({roomId:roomId}, (err, room) => {
		res.render('room', 
			{
				room: room,
				title: room.roomName + "Bluewhale Hotel Reservation",
				previewImageUrl: room.previewImageUrl?room.previewImageUrl:"/sample.jpg"
			}
		);
	});
};

exports.bookRoom = (req, res) => {
	var roomId = req.param('roomId') || "";
	Room.findOne({roomId:roomId}, (err, room) => {
		res.render('book', 
			{
				room: room,
				title: room.roomName + "Bluewhale Hotel Reservation",
				previewImageUrl: room.previewImageUrl?room.previewImageUrl:"/sample.jpg"
			}
		);
	});
};

exports.reservationAPI = (req, res) => {
	var roomId = req.param('roomId') || "";
	var startDate = req.param('startDate')?Date.parse(req.param('startDate')):null;
	var endDate = req.param('endDate')?Date.parse(req.param('endDate')):null;

	if (!req.user) {
		req.flash('errors', { msg: 'Reservation failed. Please login first' });
      	res.redirect('/room/'+roomId);
	}

	//Hard-coded to be always success.
	if (true) {
		new_reservation = new Reservation({
			roomId : roomId,
			userId: req.user.id,
			startDate: startDate,
			endDate: endDate
		});
		new_reservation.save(function(err){
			req.flash('success', { msg: 'Reservation successful.' });
      		res.redirect('/room/'+roomId);
		});
	} else {
		// do smth when fail
	}

};
