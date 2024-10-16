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
const { rupeeChangeScreen } = require('../events-handlers/tvEventsHandlers');
const { connectchangeScreen } = require('../events-handlers/tvEventsHandlers');
const { secondRupeeChangeScreen } = require('../events-handlers/tvEventsHandlers');
const { thirdRupeeChangeScreen } = require('../events-handlers/tvEventsHandlers');
const { nextRupeeChangeScreen } = require('../events-handlers/tvEventsHandlers');
const { seeAgain } = require('../events-handlers/tvEventsHandlers');

const tvEvents = (socket, io) => {
	socket.on('changeScreen', changeScreen(socket, db, io));
	socket.on('rupeeChangeScreen' , rupeeChangeScreen(socket, db, io));
	socket.on('connectchangeScreen', connectchangeScreen(socket, db, io));
	socket.on('secondRupeeChangeScreen', secondRupeeChangeScreen(socket, db, io));
	socket.on('thirdRupeeChangeScreen', thirdRupeeChangeScreen(socket, db, io));
	socket.on('nextRupeeChangeScreen', nextRupeeChangeScreen(socket, db, io));
	socket.on('seeAgain', seeAgain(socket, db, io));
};



module.exports = { tvEvents };
