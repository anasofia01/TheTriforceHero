import { router, socket } from '../routes.js';

export default function renderScreen7() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Loading...</h1>
    <button id="btn-waiting">Next</button>
  `;
	document.getElementById('btn-waiting').addEventListener('click', () => {
		router.navigateTo('/tutorialScreen');
	});
}
