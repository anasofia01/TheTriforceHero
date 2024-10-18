import { router, socket } from '../routes.js';

export default function renderScreen4() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <h4>Register:</h4>
    <p>Enter your details below to claim the prize!</p>
    <form id="form-register">
      <div>
        <input type="text" id="name" name="name" placeholder="Name" required/>
      </div>
      <div>
        <input type="email" id="email" name="email" placeholder="Email" required/>
      </div>
       <div>
        <input type="number" id="cellPhone" name="cellPhone" placeholder="CellPhone" required/>
      </div>
       <div>
        <button type="submit" id="save-form">Send</button>
      </div>
    </form>
  `;

  socket.on('formScreen', () => {
    console.log('The phone screen shows the register form');
  });

  // Agregar el evento submit al formulario, no al botón
  document.getElementById('form-register').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir que se recargue la página

    // Recoger los datos del formulario
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      cellPhone: document.getElementById('cellPhone').value,
    };

    // Emitir los datos al servidor
    socket.emit('registerInfoSaved', data);

    // Navegar a la pantalla de agradecimiento
    router.navigateTo('/thanksScreen');
  });
}
