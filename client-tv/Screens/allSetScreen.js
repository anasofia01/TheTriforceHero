import { router, socket } from '../routes.js';

export default function renderScreen4() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>All Set!</h1>
  `;

  // Navegar automáticamente después de 25 segundos
  setTimeout(() => {
    router.navigateTo('/howToScreen');
  }, 10000); // 10 segundos

}
