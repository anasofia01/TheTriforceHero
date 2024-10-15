import { router, socket } from '../routes.js';

export default function renderScreen13() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Congratulations, Hero!</h1>
    <p>You’ve passed all the trials. Claim your prize by clicking on your phone screen and filling out the form that will appear. Let’s continue protecting Hyrule!</p>
    <p>Thanks for playing!</p>
    <button id="finish">Finish</button>
  `;
	document.getElementById('finish').addEventListener('click', () => {
		router.navigateTo('/qrCodeScreen/qrCodeScreen');
	});
}
