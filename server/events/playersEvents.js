const { changeScreen } = require('../events-handlers/playersEventsHandlers');
const { winner } = require('../events-handlers/playersEventsHandlers');
const { loser } = require('../events-handlers/playersEventsHandlers');
const { registerInfoSaved } = require('../events-handlers/playersEventsHandlers');

const playersEvents = (socket, io) => {
	/* socket.on('winner', winner(socket, db, io));
	socket.on('loser', loser(socket, db, io)); */
	socket.on('motion-data', (data) => {
		console.log('Motion data:', data);
	});
	socket.on('user-location', (location) => {
		console.log('User location:', location);
	});
	socket.on('registerInfoSaved', (data) => {
		registerInfoSaved(socket, io, data);
	});
};

module.exports = playersEvents;
