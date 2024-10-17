import { router, socket } from '../routes.js';

export default function renderScreen11() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Let's the Battle begin!</h1>
  `;

	setTimeout(() => {
		router.navigateTo('/gameScreen');
	}, 3000); // 3 segundos

}
