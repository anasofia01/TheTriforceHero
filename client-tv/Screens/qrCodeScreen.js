import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Triforce Hero</h1>
    <h4>Hey Listen</h4>
    <h4>Scan Me</h4>
    <button id="emit-userConnected">Connect User</button>
    <button id="init-experience">Next</button>
  `;

	document.getElementById('emit-userConnected').addEventListener('click', () => {
		socket.emit('connectUser', { message: 'The user has connected to the game' });
	});

	document.getElementById('init-experience').addEventListener('click', () => {
		router.navigateTo('/swordScreen');
	});
}
