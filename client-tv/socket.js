const socket = io('http://localhost:5500/client-tv/', { path: '/real-time' });

socket.on('connect', () => {
	console.log('Connected to Socket.IO server');
});

export default socket;
