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

const rupeeChangeScreen = (socket, db, io) => {
	return (data) => {
		console.log('Received rupeeChangeScreen event:', data.message);
		// Here you can add logic to change the TV screen based on the received data
		io.emit('rupeeScreenChanged', { screen: 'allSetScreen' });
	};
};




module.exports = {
	connectUser,
	startGame,
	changeScreen,
	rupeeChangeScreen
};
