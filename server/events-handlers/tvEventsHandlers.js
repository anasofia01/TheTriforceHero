const { exampleFunction } = require('../utils/helpers');

const connectUser = (socket, db, io) => {
	return () => {};
};

const startGame = (socket, db, io) => {
	return () => {};
};


const connectchangeScreen = (socket, db, io) => {
	return (data) => {
		console.log('Received connectchangeScreen event:', data.message);
		// Emit an action to all connected clients or to a specific room
		io.emit('connectScreenChanged', { screen: 'swordScreen' });
	};
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
		io.emit('rupeeScreenChanged', { screen: 'allSetScreen' });
	};
};


const secondRupeeChangeScreen  = (socket, db, io) => {
	return (data) => {
		console.log('Received secondRupeeChangeScreen event:', data.message);
		io.emit('secondRupeeScreenChanged', { screen: 'swordTryScreen' });
	};
};


const thirdRupeeChangeScreen  = (socket, db, io) => {
	return (data) => {
		console.log('Received thirdRupeeChangeScreen event:', data.message);
		io.emit('thirdRupeeScreenChanged', { screen: 'loadingScreen' });
	};
};


const nextRupeeChangeScreen  = (socket, db, io) => {
	return (data) => {
		console.log('Received nextRupeeChangeScreen event:', data.message);
		io.emit('nextRupeeScreenChanged', { screen: 'readyScreen' });
	};
};


const seeAgain = (socket, db, io) => {
	return (data) => {
			console.log('Received seeAgain event:', data.message);
			// Emitir el evento tvScreenChanged a la TV para refrescar la pantalla actual (tutorialScreen)
			io.emit('seeAgainT', { screen: 'tutorialScreen' });
	};
};


const letsPlay = (socket, db, io) => {
	return (data) => {
			console.log('Received letsPlay event:', data.message);
			// Emitir el evento tvScreenChanged a la TV para refrescar la pantalla actual (tutorialScreen)
			io.emit('letsPlay', { screen: 'counterScreen' });
	};
};


module.exports = {
	connectUser,
	startGame,
	changeScreen,
	rupeeChangeScreen,
	connectchangeScreen,
	secondRupeeChangeScreen,
	thirdRupeeChangeScreen,
	nextRupeeChangeScreen,
	seeAgain,
	letsPlay
};
