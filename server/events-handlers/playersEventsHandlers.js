const { exampleFunction } = require('../utils/helpers');

const changeScreen = (socket, db, io) => {
	return () => {};
};

const validedPlays = (socket, db, io) => {
	return () => {};
};

const registerInfoSaved = (socket, db, io) => {
	return () => {};
};

const changeScreenPhone = (socket, db, io) => {
	return () => {};
};

const winner = (socket, db, io) => {
	return (data) => {
			console.log('Received winner event:', data.message);
			// Emitir el evento tvScreenChanged a la TV para refrescar la pantalla actual (tutorialScreen)
			io.emit('winner', { screen: 'winnerScreen' });
	};
};

const loser = (socket, db, io) => {
	return (data) => {
			console.log('Received loser event:', data.message);
			// Emitir el evento tvScreenChanged a la TV para refrescar la pantalla actual (tutorialScreen)
			io.emit('loser', { screen: 'loserScreen' });
	};
};

module.exports = {
	changeScreen,
	validedPlays,
	registerInfoSaved,
	changeScreenPhone,
	winner,
	loser
};
