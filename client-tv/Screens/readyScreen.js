import { router, socket } from '../routes.js';

export default function renderScreen9() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Are you Ready?</h1>
    <p>Overcome all the hero's trials and win an incredible prize! If you're ready, tap the button appearing on your phone screen.</p>
    <button id="start-game">Nivel One</button>
  `;
	document.getElementById('start-game').addEventListener('click', () => {
		router.navigateTo('/counterScreen');
	});
}
