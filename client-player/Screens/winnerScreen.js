import { router, socket } from '../routes.js';

export default function renderScreen6() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <h5>WINNER!</h5>
    <p>Claim your Amiibo & Zelda Poster</p>
    <img src="https://pbs.twimg.com/media/GaJURQCXUAATAf1?format=png&name=small" alt="LinkDance"/>
    <button id="btn-winner">Get your prize</button>
  `;

	document.getElementById('btn-winner').addEventListener('click', () => {
		router.navigateTo('registerScreen');
	});
}
