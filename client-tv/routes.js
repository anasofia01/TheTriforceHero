import renderScreen1 from './Screens/screen1.js';
import renderScreen2 from './Screens/screen2.js';
import renderScreen3 from './Screens/screen3.js';
import renderScreen4 from './Screens/screen4.js';
import renderScreen5 from './Screens/screen5.js';
import renderScreen6 from './Screens/screen6.js';
import renderScreen7 from './Screens/screen7.js';
import renderScreen8 from './Screens/screen8.js';
import renderScreen9 from './Screens/screen9.js';
import renderScreen10 from './Screens/screen10.js';
import renderScreen11 from './Screens/screen11.js';
import renderScreen12 from './Screens/screen12.js';
import renderScreen13 from './Screens/screen13.js';
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

router.add('/screen2', async () => {
	clearScripts();
	renderScreen2();
});

router.add('/screen3', async () => {
	clearScripts();
	renderScreen3();
});

router.add('/screen4', async () => {
	clearScripts();
	renderScreen4();
});

router.add('/screen5', async () => {
	clearScripts();
	renderScreen5();
});

router.add('/screen6', async () => {
	clearScripts();
	renderScreen6();
});

router.add('/screen7', async () => {
	clearScripts();
	renderScreen7();
});

router.add('/screen8', async () => {
	clearScripts();
	renderScreen8();
});

router.add('/screen9', async () => {
	clearScripts();
	renderScreen9();
});

router.add('/screen10', async () => {
	clearScripts();
	renderScreen10();
});

router.add('/screen11', async () => {
	clearScripts();
	renderScreen11();
});

router.add('/screen12', async () => {
	clearScripts();
	renderScreen12();
});

router.add('/screen13', async () => {
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
