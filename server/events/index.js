const { arduinoEvents } = require('./arduinoEvents');
const { playersEvents } = require('./playersEvents');
const { tvEvents } = require('./tvEvents');

const handleEvents = (socket, io) => {
	arduinoEvents(socket, io);
	playersEvents(socket, io);
	tvEvents(socket, io);
};

module.exports = { handleEvents };
