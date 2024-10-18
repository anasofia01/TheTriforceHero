import { router, socket } from '../routes.js';

export default function renderScreen5() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <h5>Thank You for Trying</h5>
    <p>Claim your Nintendo Coupon</p>
    <img id="loser" src="https://pbs.twimg.com/media/GaJTyXrWAAAcmyP?format=png&name=small" alt="Coupon">
    <button id="btn-finalize">Get your coupon</button>
  `;

	document.getElementById('btn-finalize').addEventListener('click', () => {
		router.navigateTo('/registerScreen');
	});
}
