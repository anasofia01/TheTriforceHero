import { router, socket } from '../routes.js';

export default function renderScreen2() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Welcome Hero of Hyrule!</h1>
    <h2>Raise the Master Sword to Continue</h2>
    <button id="up-sword">Next</button>
  `;
	document.getElementById('up-sword').addEventListener('click', () => {
		router.navigateTo('/screen3');
	});
}
