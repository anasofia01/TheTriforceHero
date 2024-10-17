import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <button id="seeAgain-btn">Tap to see again</button>
    <button id="letsPlay-btn">Let's Play!</button>
  `;

  document.getElementById('letsPlay-btn').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('letsPlay', { message: 'game starting!' });
    
    router.navigateTo('/moveSwordScreen');

	});

  document.getElementById('seeAgain-btn').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('seeAgain', { message: 'see Again Tutorial' });

	});

}
