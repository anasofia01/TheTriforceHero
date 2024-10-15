import { router, socket } from '../routes.js';

export default function renderScreen12() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Nivel One</h1>
    <button id="nivel-one">Continue</button>
  `;
	document.getElementById('nivel-one').addEventListener('click', () => {
		router.navigateTo('/congratsScreen');
	});
}
