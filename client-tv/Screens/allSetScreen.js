import { router, socket } from '../routes.js';

export default function renderScreen4() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <img src="https://pbs.twimg.com/media/GaIoKB1W0AATk9L?format=png&name=small" alt="All Set!" />
    <h1>All Set!</h1>
  `;

  // Navegar automáticamente después de 25 segundos
  setTimeout(() => {
    router.navigateTo('/howToScreen');
  }, 2000); // 2 segundos

}
