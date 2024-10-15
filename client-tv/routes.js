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
