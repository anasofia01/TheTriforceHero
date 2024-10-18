import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <img id='rupee-continue' src="https://pbs.twimg.com/media/GaJOtY2WQAA3ibK?format=png&name=360x360" alt="Rupee">
    <p id="rupee-continue">Tap to Continue!</p>
  `;

  document.getElementById('rupee-continue').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('rupeeChangeScreen', { message: 'rupee tapped to continue' });

    router.navigateTo('/secondRupeeScreen');

	});
}
