import renderConectionPhone from './Screens/conectionPhone.js';
import renderNotifyUser from './Screens/notifyUser.js';
import renderRupeeScreen from './Screens/rupeeScreen.js';
import renderSecondRupeeScreen from './Screens/secondrupeeScreen.js';
import renderThirdRupeeScreen from './Screens/thirdRupeeScreen.js';
import renderTutorialPhone from './Screens/tutorialPhone.js';
import renderTutorialPhone2 from './Screens/tutorialPhone2.js';
import renderMoveSwordScreen from './Screens/moveSwordScreen.js';
import renderRegisterScreen from './Screens/registerScreen.js';
import renderLoserScreen from './Screens/loserScreen.js';
import renderWinnerScreen from './Screens/winnerScreen.js';
import renderThanksScreen from './Screens/thanksScreen.js';
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

router.add('/conectionPhone', async () => {
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

router.add('/secondRupeeScreen', async () => {
	clearScripts();
	renderSecondRupeeScreen();
});

router.add('/thirdRupeeScreen', async () => {
	clearScripts();
	renderThirdRupeeScreen();
});

router.add('/tutorialPhone', async () => {
	clearScripts();
	renderTutorialPhone();
});

router.add('/tutorialPhone2', async () => {
	clearScripts();
	renderTutorialPhone2();
});

router.add('/moveSwordScreen', async () => {
	clearScripts();
	renderMoveSwordScreen();
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

router.add('/thanksScreen', async () => {
	clearScripts();
	renderThanksScreen();
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
