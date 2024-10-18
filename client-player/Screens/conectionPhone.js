import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <p>Awesome! You're now connected to the game! Keep an eye on the screen and tap to continue.</p>
    <img src="https://media.tenor.com/QHr0ZUXVarMAAAAi/zelda-sword.gif" alt="Master Sword" />
    <button id="btn-next">Next</button>
  `;

	socket.on('connectPlayer', () => {
		console.log('The player has connected');
	});

	document.getElementById('btn-next').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('connectchangeScreen', { message: 'Phone tapped to continue' });

    // Cambiar la pantalla del teléfono a 'rupeeScreen'
    router.navigateTo('/notifyUser');
  });
}
