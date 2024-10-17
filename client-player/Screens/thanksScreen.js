import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Thanks for playing! we sent you and email, please check to claim your prize!</h1>
  `;
}