const { exampleFunction } = require('../utils/helpers');

const connectUser = (socket, db, io) => {
	return () => {};
};

const startGame = (socket, db, io) => {
	return () => {};
};

const changeScreen = (socket, db, io) => {
	return (data) => {
		console.log('Received changeScreen event:', data.message);
		// Emit an action to all connected clients or to a specific room
		io.emit('tvScreenChanged', { screen: 'instructionsScreen' });
	};
};

module.exports = {
	connectUser,
	startGame,
	changeScreen,
};
