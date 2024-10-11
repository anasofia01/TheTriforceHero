const db = require('../db');
const { event1Handler, event2Handler } = require('../events-handlers/arduinoEventsHandlers');

const arduinoEvents = (socket, io) => {
	/* 	socket.emit('sensorActived');
	socket.emit('updateStatusSword');
	socket.emit('changeScreen'); */
};

module.exports = { arduinoEvents };
