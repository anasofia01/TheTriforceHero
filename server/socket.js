

const socketIo = require('socket.io');
const { handleEvents } = require('./events');

let io;

const initSocket = (httpServer) => {
	io = socketIo(httpServer, {
		path: '/real-time',
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		console.log('New client connected');
		handleEvents(socket, io);
	});
};

const getIO = () => {
	if (!io) {
		throw new Error('Socket.io not initialized!');
	}
	return io;
};

module.exports = { initSocket, getIO };
