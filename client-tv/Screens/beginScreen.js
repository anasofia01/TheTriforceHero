import { router, socket } from '../routes.js';

export default function renderScreen11() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Let's the Battle begin!</h1>
    <button id="start-nivel">Next</button>
  `;
	document.getElementById('start-nivel').addEventListener('click', () => {
		router.navigateTo('/gameScreen');
	});
}
