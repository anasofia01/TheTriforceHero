import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
   <section id="instructionsScreen">
    <section id="instructions">
      <section id="instructionsSection">
        <h4>1. Place your smartphone in the sword pocket</h4>
        <img src="https://pbs.twimg.com/media/GaIlSrgWgAIiEBf?format=png&name=small" alt="Sword Pocket" />
      </section>
      <section>
        <h4>2. Hold the Sword vertically</h4>
        <img src="https://pbs.twimg.com/media/GaIlqMdXUAAB2RO?format=png&name=small" alt="Link holding sword" />
      </section>
      <section>
        <h4>3. Tap the Rupee on the screen to continue</h4>
        <img src="https://pbs.twimg.com/media/GaIlt2WXIAAR2GF?format=png&name=small" alt="Screen with Rupee" />
      </section>
    </section>
  </section>
  `;

  socket.on('rupeeScreenChanged', (data) => {
    if (data.screen === 'allSetScreen') {
        router.navigateTo('/allSetScreen');
    }
});

}
