import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
	<img id='nintendoLogo' src="https://logos-world.net/wp-content/uploads/2020/11/Nintendo-Logo-2006-2016.png"/>
	<section>
    <h1>The Triforce Hero</h1>
		<img id='battleLinkPig' src='https://pbs.twimg.com/media/GaH35BiWgAAMhNi?format=jpg&name=4096x4096'/>
	</section>
	<section>
    <h4>Hey Listen!</h4>
		<img id='qrCode' src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"/>
    <h4>Scan Me</h4>
	</section>
  `;

	socket.on('connectScreenChanged', (data) => {
		if (data.screen === 'swordScreen') {
			router.navigateTo('/swordScreen'); // Navegar a swordScreen cuando se reciba el evento
		}
	});
}
