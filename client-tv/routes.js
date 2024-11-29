import renderScreen1 from './Screens/QrCodeScreen.js';
import renderScreen2 from './Screens/swordScreen.js';
import renderScreen3 from './Screens/instructionsScreen.js';
import renderScreen4 from './Screens/allSetScreen.js';
import renderScreen5 from './Screens/howToScreen.js';
import renderScreen6 from './Screens/swordTryScreen.js';
import renderScreen7 from './Screens/loadingScreen.js';
import renderScreen8 from './Screens/tutorialScreen.js';
import renderScreen9 from './Screens/readyScreen.js';
import renderScreen10 from './Screens/counterScreen.js';
import renderScreen11 from './Screens/beginScreen.js';
import renderScreen12 from './Screens/gameScreen.js';
import renderScreen13 from './Screens/congratsScreen.js';
import socket from './socket.js';

kaboom({
	width: 1490,
	height: 805,
	background: [0, 0, 0],
});

// Cargar sprites
loadSprite('fondo', './sprites/fondo.png');
loadSprite('LinkStay', './sprites/LinkStay.png');
loadSprite('LinkDerecha', './sprites/LinkDerecha.png');
loadSprite('LinkIzquierda', './sprites/LinkIzquierda.png');
loadSprite('LinkFrente', './sprites/LinkFrente.png');
loadSprite('EspadaDerecha', './sprites/EspadaDerecha.png');
loadSprite('EspadaIzquierda', './sprites/EspadaIzquierda.png');
loadSprite('EspadaFrente', './sprites/EspadaFrente.png');
loadSprite('LinkDaño', './sprites/LinkDaño.png');
loadSprite('Fantasma', './sprites/Fantasma.png');
loadSprite('FantasmaDos', './sprites/FantasmaDos.png');
loadSprite('FantasmaDaño', './sprites/FantasmaDaño.png');
loadSprite('FantasmaPolvo', './sprites/FantasmaPolvo.png');

loadSprite('Corazon1', './sprites/Corazon1.png');
loadSprite('CorazonMedio1', './sprites/CorazonMedio1.png');

loadSprite('Corazon2', './sprites/Corazon2.png');
loadSprite('CorazonMedio2', './sprites/CorazonMedio2.png');

loadSprite('Corazon3', './sprites/Corazon3.png');
loadSprite('CorazonMedio3', './sprites/CorazonMedio3.png');

loadSprite('Corazon4', './sprites/Corazon4.png');
loadSprite('CorazonMedio4', './sprites/CorazonMedio4.png');

loadSprite('Corazon5', './sprites/Corazon5.png');
loadSprite('CorazonMedio5', './sprites/CorazonMedio5.png');

loadSprite('EnemigoIz1', './sprites/EnemigoIz1.png');
loadSprite('EnemigoIz2', './sprites/EnemigoIz2.png');
loadSprite('EnemigoIz3', './sprites/EnemigoIz3.png');
loadSprite('EnemigoDe1', './sprites/EnemigoDe1.png');
loadSprite('EnemigoDe2', './sprites/EnemigoDe2.png');
loadSprite('EnemigoDe3', './sprites/EnemigoDe3.png');
loadSprite('EnemigoFe1', './sprites/EnemigoFe1.png');
loadSprite('EnemigoFe2', './sprites/EnemigoFe2.png');
loadSprite('EnemigoFe3', './sprites/EnemigoFe3.png');

loadSprite('Trifuerza', './sprites/Trifuerza.png');
loadSprite('Trifuerza1', './sprites/Trifuerza1.png');

loadSprite('Winner', './sprites/Winner.png');
loadSprite('Loser', './sprites/Loser.png');




const router = new Router({
	// check this for more features with Router: https://github.com/Graidenix/vanilla-router
	mode: 'hash',
	page404: (path) => {
		const app = document.getElementById('app');
		app.innerHTML = `
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    `;
	},
});

function clearScripts() {
	document.getElementById('app').innerHTML = '';
}

router.add('/', async () => {
	clearScripts();
	renderScreen1();
});

router.add('/swordScreen', async () => {
	clearScripts();
	renderScreen2();
});

router.add('/instructionsScreen', async () => {
	clearScripts();
	renderScreen3();
});

router.add('/allSetScreen', async () => {
	clearScripts();
	renderScreen4();
});

router.add('/howToScreen', async () => {
	clearScripts();
	renderScreen5();
});

router.add('/swordTryScreen', async () => {
	clearScripts();
	renderScreen6();
});

router.add('/loadingScreen', async () => {
	clearScripts();
	renderScreen7();
});

router.add('/tutorialScreen', async () => {
	clearScripts();
	renderScreen8();
});

router.add('/readyScreen', async () => {
	clearScripts();
	renderScreen9();
});

router.add('/counterScreen', async () => {
	clearScripts();
	renderScreen10();
});

router.add('/beginScreen', async () => {
	clearScripts();
	renderScreen11();
});

router.add('/gameScreen', async () => {
	clearScripts();
	renderScreen12();

});

router.add('/congratsScreen', async () => {
	clearScripts();
	renderScreen13();
});

router.check().addUriListener();

// Listen for popstate event to handle browser navigation
window.addEventListener('popstate', () => {
	router.check();
});

document.addEventListener('DOMContentLoaded', () => {
	router.check();
});

router.check();

export { router, socket };
