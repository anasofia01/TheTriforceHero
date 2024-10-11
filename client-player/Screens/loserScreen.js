import { router, socket } from '../routes.js';

export default function renderScreen5() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <h5>Thank You for Try</h5>
    <p>Reclama tu cupon de Nintendo que se te envio al Correo</p>
    <button id="btn-finalize">Get your cuppon</button>
  `;

	socket.on('resultScreen', () => {
		console.log('The phone screen shows the results of the game');
	});

	document.getElementById('btn-finalize').addEventListener('click', () => {
		router.navigateTo('/winnerScreen');
	});
}
