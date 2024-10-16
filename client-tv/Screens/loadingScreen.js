import { router, socket } from '../routes.js';

export default function renderScreen7() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Loading...</h1>

  `;

	  // Navegar automáticamente después de 25 segundos
		setTimeout(() => {
			router.navigateTo('/tutorialScreen');
		}, 5000); // 6 segundos

}
