import { router, socket } from '../routes.js';

export default function renderScreen2() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <p>Hey!!Look at the Screen</p>
    <button id="btn-continue">Tap to Continue</button>
  `;
	document.getElementById('btn-continue').addEventListener('click', () => {
		router.navigateTo('/screen3');
	});
}
