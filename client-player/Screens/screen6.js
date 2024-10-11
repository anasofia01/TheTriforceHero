import { router, socket } from '../routes.js';

export default function renderScreen6() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <h5>WINNER!</h5>
    <p>Reclama tu Amiibo y poster de Zelda</p>
    <button id="btn-winner">Get your prize</button>
  `;
	document.getElementById('btn-winner').addEventListener('click', () => {
		router.navigateTo('/');
	});
}
