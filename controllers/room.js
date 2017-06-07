const mongoose = require('mongoose');
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');
var MobileDetect = require('mobile-detect');


exports.getRoom = (req, res) => {
	mobileInfo = new MobileDetect(req.headers['user-agent'])
	var roomId = req.param('roomId') || "";
	Room.findOne({roomId:roomId}, (err, room) => {
		templateName = mobileInfo.mobile()?"mobile_room":"room"
		res.render(templateName, 
			{
				room: room,
				title: room.roomName + "Bluewhale Hotel Reservation",
				previewImageUrl: room.previewImageUrl?room.previewImageUrl:"/sample.jpg"
			}
		);
	});
};

exports.bookRoom = (req, res) => {
	mobileInfo = new MobileDetect(req.headers['user-agent']);
	var roomId = req.param('roomId') || "";
	Room.findOne({roomId:roomId}, (err, room) => {
		templateName = mobileInfo.mobile()?"mobile_book":"book";
		res.render(templateName, 
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

exports.cancelReservationAPI =  (req, res) => {
	var reservationId = req.param('reservationId') || "";

	if (!req.user) {
		req.flash('errors', { msg: 'Cancel failed. Please login first' });
      	res.redirect('/login');
	}

	//Hard-coded to be always success.
	if (true) {
		Reservation.findById(reservationId, (err, reservation) => {
			if (err) {
				req.flash('errors', { msg: 'Cancel failed. No reservation is cancelled' });
      			res.redirect('/booking-history');
			} else {
				reservation.remove(function(err){
					if (err) {
						req.flash('errors', { msg: 'Cancel failed. No reservation is cancelled' });
		      			res.redirect('/booking-history');
					} else {
						req.flash('success', { msg: 'Cancelation successful' });
						res.redirect('/booking-history');
					}
				});
			}
		});
	} else {
		// do smth when fail
	}

};
