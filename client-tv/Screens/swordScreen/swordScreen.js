import { router, socket } from '../routes.js';

export default function renderScreen2() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Welcome Hero of Hyrule!</h1>
    <h2>Raise the Master Sword to Continue</h2>
    <button id="up-sword">Next</button>
  `;

  document.getElementById('up-sword').addEventListener('click', () => {
    router.navigateTo('/instructionsScreen');
  });

  // Escuchar el evento desde el teléfono
  socket.on('phoneContinue', (data) => {
    console.log(data.message);  // Puedes ver el mensaje si quieres para debug
    // Cambiar la pantalla de la TV
    router.navigateTo('/instructionsScreen');
  });
}
