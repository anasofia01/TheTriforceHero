import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <p>Awesome! You're now connected to the game! Keep an eye on the screen to continue.</p>
    <button id="btn-next">Next</button>
  `;
	document.getElementById('btn-next').addEventListener('click', () => {
		router.navigateTo('/screen2');
	});
}
