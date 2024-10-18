import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <ul id="instructions">
      <section>
      <li>1. Place your smartphone in the sword pocket</li>
      <img src="https://pbs.twimg.com/media/GaIlSrgWgAIiEBf?format=png&name=small" alt="Sword Pocket"/>
      </section>
      <section>
      <li>2. Hold the Sword vertically</li>
      <img src="https://pbs.twimg.com/media/GaIlqMdXUAAB2RO?format=png&name=small" alt=Link holding sword"/>
      </section>
      <section>
      <li>3. Tap the Rupee on the screen to continue</li>
      <img src="https://pbs.twimg.com/media/GaIlt2WXIAAR2GF?format=png&name=small" alt="Screen with Rupee"/>
      </section>
    </ul>
  `;

  socket.on('rupeeScreenChanged', (data) => {
    if (data.screen === 'allSetScreen') {
        router.navigateTo('/allSetScreen');
    }
});

}
