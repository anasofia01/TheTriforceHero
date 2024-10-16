import renderConectionPhone from './Screens/conectionPhone.js';
import renderNotifyUser from './Screens/notifyUser.js';
import renderRupeeScreen from './Screens/rupeeScreen.js';
import renderRegisterScreen from './Screens/registerScreen.js';
import renderLoserScreen from './Screens/loserScreen.js';
import renderWinnerScreen from './Screens/winnerScreen.js';
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

router.add('conectionPhone', async () => {
	clearScripts();
	renderConectionPhone();
});

router.add('/notifyUser', async () => {
	clearScripts();
	renderNotifyUser();
});

router.add('/rupeeScreen', async () => {
	clearScripts();
	renderRupeeScreen();
});

router.add('/registerScreen', async () => {
	clearScripts();
	renderRegisterScreen();
});

router.add('/loserScreen', async () => {
	clearScripts();
	renderLoserScreen();
});

router.add('/winnerScreen', async () => {
	clearScripts();
	renderWinnerScreen();
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
