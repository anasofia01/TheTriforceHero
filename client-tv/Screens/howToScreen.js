import { router, socket } from '../routes.js';

export default function renderScreen5() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>How to Play?</h1>
    <p>You are the chosen hero, tasked with protecting the Triforce. Defend Hyrule by fighting off the monsters send by Ganon that threaten the peace!</p>

  `;
  socket.on('secondRupeeScreenChanged', (data) => {
    if (data.screen === 'swordTryScreen') {
        router.navigateTo('/swordTryScreen');
    }
});
}
