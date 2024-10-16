import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Triforce Hero</h1>
    <h4>Hey Listen</h4>
    <h4>Scan Me</h4>
  `;
	
	socket.on('connectScreenChanged', (data) => {
		if (data.screen === 'swordScreen') {
			router.navigateTo('/swordScreen'); // Navegar a swordScreen cuando se reciba el evento
		}
	});
}
