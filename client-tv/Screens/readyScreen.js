import { router, socket } from '../routes.js';

export default function renderScreen9() {
	const app = document.getElementById('app');
	app.innerHTML = `

  <section id='readySection'>

    <section id='readySection1'>
    <h1 id='readyh1'>Are you Ready?</h1>
    <p id='readyp'>Overcome all the hero's trials and win an incredible prize! If you're ready, tap the button appearing on your phone screen to start playing the level !</p>
    </section>

    <section id='readySection2'>
		<img  id='trigif' src="https://media.tenor.com/yt3z4qDANTQAAAAi/zelda.gif" alt="Loading">
    <img id='battleLinkPigR' src='https://pbs.twimg.com/media/GdiEbTEWsAAQjE2?format=png&name=900x900'/>
    </section>

</section>

  `;


	socket.on('seeAgainT', (data) => {
		if (data.screen === 'tutorialScreen') {
			router.navigateTo('/tutorialScreen');
		}
	});

  socket.on('letsPlay', (data) => {
    if (data.screen === 'counterScreen') {
        router.navigateTo('/counterScreen');
    }
});


}
