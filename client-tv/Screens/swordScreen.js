// import { router, socket } from '../routes.js';

// export default function renderScreen2() {
//   const app = document.getElementById('app');
//   app.innerHTML = `
//     <h1>Welcome Hero of Hyrule!</h1>
//     <h2>Raise the Master Sword to Continue</h2>
//     <button id="up-sword">Next</button>
//   `;

//   // Escuchar el evento changeScreen desde el servidor
//   socket.on('changeScreen', (data) => {
//     console.log(data.message);  // Ver el mensaje para debug
//     // Cambiar la pantalla de la TV a 'instructionsScreen'
//     router.navigateTo('/instructionsScreen');
//   });

//   document.getElementById('up-sword').addEventListener('click', () => {
//     router.navigateTo('/instructionsScreen');
//   });
// }

import { router, socket } from '../routes.js';

export default function renderScreen2() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Welcome Hero of Hyrule!</h1>
        <h2>Raise the Master Sword to Continue</h2>
        <button id="up-sword">Next</button>
    `;

    socket.on('tvScreenChanged', (data) => {
        if (data.screen === 'instructionsScreen') {
            router.navigateTo('/instructionsScreen');
        }
    });

    document.getElementById('up-sword').addEventListener('click', () => {
        router.navigateTo('/instructionsScreen');
    });
}
