const { changeScreen, winner, loser, registerInfoSaved } = require('../events-handlers/playersEventsHandlers');

const playersEvents = (socket, io) => {
	socket.on('winner', winner(socket, io));
	socket.on('loser', loser(socket, io));
	socket.on('motion-data', (data) => {
		console.log('Motion data:', data);
	});
	socket.on('user-location', (location) => {
		console.log('User location:', location);
	});
	socket.on('registerInfoSaved', (data) => {
		console.log(data);
		registerInfoSaved(socket, io, data);
	});
};

module.exports = { playersEvents };
