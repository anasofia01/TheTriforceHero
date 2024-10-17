const db = require('../db');
const { changeScreen } = require('../events-handlers/playersEventsHandlers');
const { winner } = require('../events-handlers/playersEventsHandlers');
const { loser } = require('../events-handlers/playersEventsHandlers');

const playersEvents = (socket, io) => {

	socket.on('winner', winner(socket, db, io));
	socket.on('loser', loser(socket, db, io));
};

module.exports = { playersEvents };
