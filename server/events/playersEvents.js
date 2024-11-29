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
		io.emit('MoveSwordLeft', { direction: 'left', player: socket.id });
		console.log('movimienti izquierda');
		// Lógica para el movimiento a la izquierda
	});

	socket.on('moveSwordRight', (data) => {
		io.emit('MoveSwordRight', { direction: 'right', player: socket.id });
		console.log('movimienti derecha');
		// Lógica para el movimiento a la derecha
	});

	socket.on('moveSwordFront', (data) => {
		io.emit('MoveSwordFront', { direction: 'front', player: socket.id });
		console.log('movimienti frente');
		// Lógica para el movimiento al frente
	});

	socket.on('prueba', (data) => {
		console.log('se emite desde game screen');
	});
};

module.exports = { playersEvents };