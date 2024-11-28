const {
	changeScreen,
	rupeeChangeScreen,
	connectchangeScreen,
	secondRupeeChangeScreen,
	thirdRupeeChangeScreen,
	nextRupeeChangeScreen,
	seeAgain,
	letsPlay,
} = require('../events-handlers/tvEventsHandlers');

const tvEvents = (socket, io) => {
	socket.on('changeScreen', changeScreen(socket, io));
	socket.on('rupeeChangeScreen', rupeeChangeScreen(socket, io));
	socket.on('connectchangeScreen', connectchangeScreen(socket, io));
	socket.on('secondRupeeChangeScreen', secondRupeeChangeScreen(socket, io));
	socket.on('thirdRupeeChangeScreen', thirdRupeeChangeScreen(socket, io));
	socket.on('nextRupeeChangeScreen', nextRupeeChangeScreen(socket, io));
	socket.on('seeAgain', seeAgain(socket, io));
	socket.on('letsPlay', letsPlay(socket, io));

	socket.on('MoveSwordLeft', (data) => {
		console.log('Movimiento hacia la izquierda recibido:', data);
	});

	socket.on('MoveSwordRight', (data) => {
		console.log('Movimiento hacia la derecha recibido:', data);
	});

	socket.on('MoveSwordFront', (data) => {
		console.log('Movimiento al frente recibido:', data);
	});
};

module.exports = { tvEvents };
