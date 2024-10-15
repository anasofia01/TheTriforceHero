import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <ul>
      <li>1. Place your smartphone in the sword pocket</li>
      <li>2. Hold the Sword vertically</li>
      <li>3. Tap the Rupee on the screen to continue</li>
    </ul>
    <button id="instructions">Next</button>
  `;
	document.getElementById('instructions').addEventListener('click', () => {
		router.navigateTo('/allSetScreen');
	});
}
