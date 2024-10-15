import { router, socket } from '../routes.js';

export default function renderScreen8() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Tutorial</h1>
    <button id="btn-next">Next</button>
  `;
	document.getElementById('btn-next').addEventListener('click', () => {
		router.navigateTo('/readyScreen');
	});
}
