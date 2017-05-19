const mongoose = require('mongoose');
const Room = require('../models/Room');


exports.getSearch = (req, res) => {
	var roomType = req.param('roomtype') || "";
	if (roomType != "all"){ 
		Room.find({roomType:roomType}, (err, rooms) => {
			res.render('search', 
				{
					Rooms: rooms,
					title: 'Search'
				}
			);
		});
	} else {
		Room.find({}, (err, rooms) => {
			res.render('search', 
				{
					Rooms: rooms,
					title: 'Search'
				}
			);
		});
	}
};
