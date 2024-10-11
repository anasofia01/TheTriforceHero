import { router, socket } from '../routes.js';

export default function renderScreen6() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Let's Give it a Try</h1>
    <p>Move your sword in the correct direction to defeat the enemies!</p>
    <ul>
      <li>Left</li>
      <li>Forward</li>
      <li>Right</li>
    </ul>
    <button id="movements">Next</button>
  `;
	document.getElementById('movements').addEventListener('click', () => {
		router.navigateTo('/screen7');
	});
}
