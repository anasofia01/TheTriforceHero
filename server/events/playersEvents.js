const {
	changeScreen,
	winner,
	loser,
	registerInfoSaved,
	moveSwordLeft,
	moveSwordRight,
	moveSwordFront,
} = require('../events-handlers/playersEventsHandlers');

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
	socket.on('moveSwordLeft', (data) => {
		console.log('Movimiento a la izquierda:', data);
		io.emit('MoveSwordLeft', { direction: 'left', player: socket.id });
		// Lógica para el movimiento a la izquierda
	});

	socket.on('moveSwordRight', (data) => {
		console.log('Movimiento a la derecha:', data);
		io.emit('MoveSwordRight', { direction: 'right', player: socket.id });
		// Lógica para el movimiento a la derecha
	});

	socket.on('moveSwordFront', (data) => {
		console.log('Movimiento al frente:', data);
		io.emit('MoveSwordFront', { direction: 'front', player: socket.id });
		// Lógica para el movimiento al frente
	});
};

module.exports = { playersEvents };
