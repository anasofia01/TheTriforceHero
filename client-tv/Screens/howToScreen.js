import { router, socket } from '../routes.js';

export default function renderScreen5() {
	const app = document.getElementById('app');
	app.innerHTML = `
  <section id='howToSection' >
    <section id='howToSection1'>
      <h1 id='howtoplayh1'>How to Play?</h1>
      <p id='howtoplayp'>You are the chosen hero, tasked with protecting the Triforce. Defend Hyrule by fighting off the monsters send by Ganon that threaten the peace!</p>
		  <img id='battleLinkPigHOW' src='https://pbs.twimg.com/media/Gdi3MJrXcAEwV_5?format=png&name=900x900'/>
    </section>

    <section id='howToSection2'>
      <img id='battlefield' src='https://pbs.twimg.com/media/GaIpV4BXYAE9u-F?format=jpg&name=4096x4096'/>
    </section>
  </section>

  `;
  socket.on('secondRupeeScreenChanged', (data) => {
    if (data.screen === 'swordTryScreen') {
        router.navigateTo('/swordTryScreen');
    }
});
}
