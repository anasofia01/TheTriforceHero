import { router, socket } from '../routes.js';

export default function renderScreen10() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Timer</h1>
    <button id="start-timer">START!</button>
  `;
	document.getElementById('start-timer').addEventListener('click', () => {
		router.navigateTo('/screen11');
	});
}
