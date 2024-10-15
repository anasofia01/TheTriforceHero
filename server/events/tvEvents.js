// const db = require('../db');
// const { connectUser } = require('../events-handlers/tvEventsHandlers');

// const tvEvents = (socket, io) => {
// 	/* 	// socket.on('connectUser', connectUser(socket, db, io));
// 	socket.emit('connectPhone', socket.id);
// 	// socket.on('startGame', startGame(socket, db, io));
// 	socket.emit('showGameScreen');
// 	socket.emit('readMovements', statusMoves); */
// };

// module.exports = { tvEvents };

const db = require('../db');
const { changeScreen } = require('../events-handlers/tvEventsHandlers');

const tvEvents = (socket, io) => {
	socket.on('changeScreen', changeScreen(socket, db, io));
};

module.exports = { tvEvents };
