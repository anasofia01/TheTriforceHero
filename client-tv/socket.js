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


socket.on('secondRupeeScreenChanged', (data) => {
	console.log('Received secondrupeeScreenChanged event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'swordTryScreen') {
		// Call a function to render the instructions screen
		renderSwordTryScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderSwordTryScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering sword try screen on TV');
}


socket.on('thirdRupeeScreenChanged', (data) => {
	console.log('Received thirdrupeeScreenChanged event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'loadingScreen') {
		// Call a function to render the instructions screen
		renderLoadingScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderLoadingScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering loading screen on TV');
}


socket.on('nextRupeeScreenChanged', (data) => {
	console.log('Received nextrupeeScreenChanged event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'readyScreen') {
		// Call a function to render the instructions screen
		renderReadyScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderReadyScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering Ready screen on TV');
}


socket.on('seeAgainT', (data) => {
	console.log('Received seeAgainT event:', data);
	if (data.screen === 'tutorialScreen') {
			// Llamar a una función para refrescar el tutorial en la TV
			renderTutorialScreen(); // Esta función recarga o actualiza la pantalla actual
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderTutorialScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering tutorial screen on TV');
}


socket.on('letsPlay', (data) => {
	console.log('Received letsPlay event:', data);
	// Here you can add logic to change the TV screen based on the received data
	if (data.screen === 'counterScreen') {
		// Call a function to render the instructions screen
		renderCounterScreen();
	}
});

// You'll need to define this function elsewhere in your TV client code
function renderCounterScreen() {
	// Logic to render the instructions screen on the TV
	console.log('Rendering Counter screen on TV');
}




export default socket;
