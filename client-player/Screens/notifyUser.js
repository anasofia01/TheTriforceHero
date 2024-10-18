import { router, socket } from '../routes.js';

export default function renderScreen2() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <p>Hey!!Look at the Screen</p>
    <img id='gifNotify' src="https://media.tenor.com/wOar0JtSmEcAAAAi/link-zelda.gif" alt="Link gif" />
    <button id="btn-continue">Tap to Continue</button>
  `;

  document.getElementById('btn-continue').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor
    socket.emit('changeScreen', { message: 'Phone tapped to continue' });

    // Cambiar la pantalla del teléfono a 'rupeeScreen'
    router.navigateTo('/rupeeScreen');
  });
}
