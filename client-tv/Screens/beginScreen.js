import { router, socket } from '../routes.js';

export default function renderScreen11() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Let's the Battle begin!</h1>
		<img src="https://i.seadn.io/gae/CPpFBfbeJaOuz4HJbFOo-E1Mxy-xc_rFN_IY7gwenxIcO5ZTF2i2seKbNo_crZevy9DAsEbAOfoi_lIqNzqMn5JsU3rxgkPqYuv8Xw?auto=format&dpr=1&w=1000" alt="Loading">
  `;

	setTimeout(() => {
		router.navigateTo('/gameScreen');
	}, 2500); // 3 segundos

}
