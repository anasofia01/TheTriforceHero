const socket = io('http://localhost:5/client-player', { path: '/real-time' }); // Update this to your server URL

socket.on('connect', () => {
	console.log('Connected to Socket.IO server');
});

export default socket;
