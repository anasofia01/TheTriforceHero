import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>

    <img id="secondrupee-continue" src="https://pbs.twimg.com/media/GaJOtY2WQAA3ibK?format=png&name=360x360" alt="Rupee">
    <p id="secondrupee-continue">Tap to Continue</p>
  `;

  document.getElementById('secondrupee-continue').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('secondRupeeChangeScreen', { message: 'rupee tapped to continue' });

    router.navigateTo('/thirdRupeeScreen');

	});
}
