import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <button id="secondrupee-continue">Tap to Continue</button>
  `;

  document.getElementById('secondrupee-continue').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('secondRupeeChangeScreen', { message: 'rupee tapped to continue' });

    router.navigateTo('/thirdRupeeScreen');

	});
}
