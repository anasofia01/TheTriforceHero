import { router, socket } from '../routes.js';

export default function renderScreen5() {
	const app = document.getElementById('app');
	app.innerHTML = `
  <section>
    <h1>How to Play?</h1>
    <p>You are the chosen hero, tasked with protecting the Triforce. Defend Hyrule by fighting off the monsters send by Ganon that threaten the peace!</p>
		<img id='battleLinkPig' src='https://pbs.twimg.com/media/GaH35BiWgAAMhNi?format=jpg&name=4096x4096'/>
  </section>

  <section>
  <img id='battlefield' src='https://pbs.twimg.com/media/GaIpV4BXYAE9u-F?format=jpg&name=4096x4096'/>
  </section>


  `;
  socket.on('secondRupeeScreenChanged', (data) => {
    if (data.screen === 'swordTryScreen') {
        router.navigateTo('/swordTryScreen');
    }
});
}
