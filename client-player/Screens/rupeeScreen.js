import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <button id="rupee-continue">Tap to Continue</button>
  `;

	socket.on('changeScreen', () => {
		console.log('The phone screen has changed');
	});

	document.getElementById('rupee-continue').addEventListener('click', () => {
		router.navigateTo('/registerScreen');
	});
}
