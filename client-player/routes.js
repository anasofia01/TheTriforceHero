import renderScreen1 from './Screens/screen1.js';
import renderScreen2 from './Screens/screen2.js';
import renderScreen3 from './Screens/screen3.js';
import renderScreen4 from './Screens/screen4.js';
import renderScreen5 from './Screens/screen5.js';
import renderScreen6 from './Screens/screen6.js';
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
