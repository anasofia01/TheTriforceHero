import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <button id="seeAgain-btn">Tap to see again</button>
    <button id="nextRupee-continue">Tap to Continue</button>
  `;

  document.getElementById('nextRupee-continue').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('nextRupeeChangeScreen', { message: 'rupee tapped to continue' });

	});

  document.getElementById('seeAgain-btn').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('seeAgain', { message: 'see Again Tutorial' });

	});

}
