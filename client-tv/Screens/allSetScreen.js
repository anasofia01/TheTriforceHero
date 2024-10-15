import { router, socket } from '../routes.js';

export default function renderScreen4() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>All Set!</h1>
    <button id="next">Next</button>
  `;
	document.getElementById('next').addEventListener('click', () => {
		router.navigateTo('/howToScreen');
	});
}
