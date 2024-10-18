import { router, socket } from '../routes.js';

export default function renderScreen8() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Tutorial</h1><div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGT4v48qq8/D8fNORytTR37cIgWuIOTLQ/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
<a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGT4v48qq8&#x2F;D8fNORytTR37cIgWuIOTLQ&#x2F;view?utm_content=DAGT4v48qq8&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">
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
