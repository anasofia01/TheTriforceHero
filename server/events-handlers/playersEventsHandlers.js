const { exampleFunction } = require('../utils/helpers');
const { createUsers } = require('../controllers/users');

const changeScreen = (socket, io) => {
	return () => {};
};

const validedPlays = (socket, io) => {
	return () => {};
};

const registerInfoSaved = (socket, io, data) => {
	return () => {
		createUsers(data);
	};
};

const changeScreenPhone = (socket, io) => {
	return () => {};
};

const winner = (socket, io) => {
	return (data) => {
		console.log('Received winner event:', data.message);
		// Emitir el evento tvScreenChanged a la TV para refrescar la pantalla actual (tutorialScreen)
		io.emit('winner', { screen: 'winnerScreen' });
	};
};

const loser = (socket, io) => {
	return (data) => {
		console.log('Received loser event:', data.message);
		// Emitir el evento tvScreenChanged a la TV para refrescar la pantalla actual (tutorialScreen)
		io.emit('loser', { screen: 'loserScreen' });
	};
};

/* const moveSwordLeft = (socket, io) => {
	return (data) => {
		console.log('Movimiento a la izquierda recibido:', data);
		io.emit('MoveSwordLeft', { player: socket.id });
	};
};

const moveSwordRight = (socket, io) => {
	return (data) => {
		console.log('Movimiento a la derecha recibido:', data);
		io.emit('MoveSwordRight', { player: socket.id });
	};
};

const moveSwordFront = (socket, io) => {
	return (data) => {
		console.log('Movimiento al frente recibido:', data);
		io.emit('MoveSwordFront', { player: socket.id });
	};
}; */

module.exports = {
	changeScreen,
	validedPlays,
	registerInfoSaved,
	changeScreenPhone,
	winner,
	loser,
};
