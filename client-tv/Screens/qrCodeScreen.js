import { router, socket } from '../routes.js';

export default function renderScreen1() {
	const app = document.getElementById('app');
	app.innerHTML = `
<section id='qrCodeSection'>
	<section id=Nintendo>
		<img id='nintendoLogo' src="https://pbs.twimg.com/media/GdiLjR7XAAEJigp?format=png&name=240x240"/>
	</section>
	<section id='qrCodeSection2'>
			<section id='qrCodeSection3'>
    		<img id='gameTitle' src='https://pbs.twimg.com/media/GdiHDJ5WwAAqyr2?format=png&name=small'/>
				<img id='battleLinkPig' src='https://pbs.twimg.com/media/GdiEbTEWsAAQjE2?format=png&name=900x900'/>
			</section>
			<section id='qrCodeSection4' >
    		<h4>HEY LISTEN!</h4>
				<img id='qrCode' src="https://pbs.twimg.com/media/Gdk1e5JWoAA1ubc?format=png&name=4096x4096"/>
    		<h4>SCAN ME</h4>
			</section>
	</section>



	</section>
  `;

	socket.on('connectScreenChanged', (data) => {
		if (data.screen === 'swordScreen') {
			router.navigateTo('/swordScreen'); // Navegar a swordScreen cuando se reciba el evento
		}
	});
}
