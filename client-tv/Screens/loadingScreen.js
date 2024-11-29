import { router, socket } from '../routes.js';

export default function renderScreen7() {
	const app = document.getElementById('app');
	app.innerHTML = `
<section id="loading-screen">
		<img src="https://media.tenor.com/yt3z4qDANTQAAAAi/zelda.gif" alt="Loading">
		<h1>Loading...</h1>
	</section>
  `;

	  // Navegar automáticamente después de 25 segundos
		setTimeout(() => {
			router.navigateTo('/tutorialScreen');
		}, 3000); // 6 segundos

}
