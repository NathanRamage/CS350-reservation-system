const async = require('async');
const mongoose = require('mongoose');
const Room = require('../models/Room');

var roomFilterByDate = function(rooms, startDate, endDate, callback){
	startDate = startDate?startDate:0;
	endDate = endDate?endDate:Date.parse("2100-01-01");
	result = [];
	async.each(rooms, function(room, cb_rooms){
		console.log(room.roomName)
		var overlapped = false;
		async.each(room.reservedPeriods, function(reservedPeriod, cb_period){
			if (cb_period.endDate > startDate && cb_period.endDate <= endDate
				|| cb_period.startDate >= startDate && cb_period.startDate < endDate
				|| cb_period.startDate <= startDate && cb_period.endDate > endDate) {
				overlapped = true;
			}
			cb_period();
		}, function(err){
			if (!overlapped) {
				result.push(room);
			} 
			cb_rooms();
		});
	}, function(err){
		callback(result);
	});
}

exports.getSearch = (req, res) => {
	var roomType = req.param('roomtype');
	if (roomType == "all") {
		roomType = "";
	}
	var startDate = req.param('startDate')?Date.parse(req.param('startDate')):null;
	var endDate = req.param('endDate')?Date.parse(req.param('endDate')):null;

	Room.find({roomType:roomType}, (err, rooms) => {
		roomFilterByDate(rooms, startDate, endDate, function(rooms){
			res.render('search', 
				{
					Rooms: rooms,
					title: 'Search',
					startDate: startDate?Date.toISOString(startDate).substring(0,10):null,
					endDate: startDate?Date.toISOString(startDate).substring(0,10):null
				}
			);
		});
	});

};
