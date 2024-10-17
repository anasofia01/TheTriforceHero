import { router, socket } from '../routes.js';

export default function renderScreen12() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Nivel One</h1>
	

    <button id="winner-btn">Winer</button>
		<button id="loser-btn">Loser</button>
  `;


  document.getElementById('winner-btn').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('winner', { message: 'Winner!' });

    router.navigateTo('/congratsScreen');

	});

  document.getElementById('loser-btn').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('loser', { message: 'Loser!' });

    router.navigateTo('/congratsScreen');

	});


}
