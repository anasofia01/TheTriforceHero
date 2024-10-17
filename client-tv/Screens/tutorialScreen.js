import { router, socket } from '../routes.js';

export default function renderScreen8() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Tutorial</h1>
  `;


  socket.on('nextRupeeScreenChanged', (data) => {
    if (data.screen === 'readyScreen') {
        router.navigateTo('/readyScreen');
    }
});

socket.on('seeAgainT', (data) => {
	if (data.screen === 'tutorialScreen') {
		router.navigateTo('/tutorialScreen');

	}
});



}
