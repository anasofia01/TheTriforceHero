const socket = io('http://localhost:5050', { path: '/real-time' }); // Update this to your server URL

socket.on('connect', () => {
	console.log('Connected to Socket.IO server');
});

socket.on('winner', (data) => {
	console.log('Received winner event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'winnerScreen') {
		// Call a function to render the instructions screen
		renderWinnerScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderWinnerScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering Winner screen on TV');
}


socket.on('loser', (data) => {
	console.log('Received loser event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'loserScreen') {
		// Call a function to render the instructions screen
		renderLoserScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderLoserScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering Loser screen on TV');
}



export default socket;
