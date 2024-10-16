import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <button id="thirdRupee-continue">Tap to Continue</button>
  `;

  document.getElementById('thirdRupee-continue').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('thirdRupeeChangeScreen', { message: 'rupee tapped to continue' });

    router.navigateTo('/tutorialPhone');

	});
}
