import { router, socket } from '../routes.js';

export default function renderScreen6() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Controls!</h1>
    <p>You wil have to move your the sword in the correct direction to defeat the enemies!</p>

    <ul>
      <img id='linkControl' src='https://pbs.twimg.com/media/GaIxYJrWEAAblEh?format=jpg&name=4096x4096'/>
      <li>Left</li>

      <img id='linkControl' src='https://pbs.twimg.com/media/GaIzq2dXIAAXuxr?format=jpg&name=large'/>
      <li>Forward</li>

      <img id='linkControl' src='https://pbs.twimg.com/media/GaI0Mx-WQAEU3AL?format=jpg&name=4096x4096'/>
      <li>Right</li>
    </ul>

  `;
  socket.on('thirdRupeeScreenChanged', (data) => {
    if (data.screen === 'loadingScreen') {
        router.navigateTo('/loadingScreen');
    }
});
}
