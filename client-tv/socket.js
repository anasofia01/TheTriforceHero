const socket = io('http://localhost:5050', { path: '/real-time' });

socket.on('connect', () => {
	console.log('Connected to Socket.IO server');
});
// #############################




socket.on('connectScreenChanged', (data) => {
	console.log('Received connectScreenChanged event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'swordScreen') {
		// Call a function to render the instructions screen
		renderSwordScreen();;
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderSwordScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering Sword screen on TV');
}






// Add this new event listener
socket.on('tvScreenChanged', (data) => {
	console.log('Received tvScreenChanged event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'instructionsScreen') {
		// Call a function to render the instructions screen
		renderInstructionsScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderInstructionsScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering instructions screen on TV');
}




socket.on('rupeeScreenChanged', (data) => {
	console.log('Received rupeeScreenChanged event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'allSetScreen') {
		// Call a function to render the instructions screen
		renderAllsetScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderAllsetScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering All set screen on TV');
}



export default socket;
