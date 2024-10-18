import { router, socket } from '../routes.js';

export default function renderScreen9() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Are you Ready?</h1>
    <p>Overcome all the hero's trials and win an incredible prize! If you're ready, tap the button appearing on your phone screen to start playing Level 1 !</p>

    <section>

		<img src="https://media.tenor.com/yt3z4qDANTQAAAAi/zelda.gif" alt="Loading">
    <img id='battleLinkPig' src='https://pbs.twimg.com/media/GaH35BiWgAAMhNi?format=jpg&name=4096x4096'/>
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
