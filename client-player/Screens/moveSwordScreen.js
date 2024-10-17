import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <p>Move your sword from side to side to defeat the enemies.</p>
    <p>Look at the TV screen!</p>

  `;

	socket.on('winner', (data) => {
		if (data.screen === 'winnerScreen') {
			router.navigateTo('/winnerScreen');
		}
	});

  socket.on('loser', (data) => {
		if (data.screen === 'loserScreen') {
			router.navigateTo('/LoserScreen');
		}
	});


}