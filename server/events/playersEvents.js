const db = require('../db');
const { changeScreen } = require('../events-handlers/playersEventsHandlers');

const playersEvents = (socket, io) => {
	/* 	/* 	socket.on('changeScreen', changeScreen(socket, db, io));
	socket.on('validedPlays', validedPlays(socket, db, io));
	socket.emit('formScreen');
	// socket.on('registerInfoSaved', registerInfoSaved(socket, db, io));
	socket.emit('resultScreen', data);
	socket.emit("connectPhone");"*/
};

module.exports = { playersEvents };
