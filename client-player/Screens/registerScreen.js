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
        <input type="number" id="cellphone" name="cellphone" placeholder="CellPhone" required/>
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
	document.getElementById('form-register').addEventListener('submit', async (event) => {
		event.preventDefault(); // Prevenir que se recargue la página

		// Recoger los datos del formulario
		const data = {
			name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			cellphone: document.getElementById('cellphone').value,
		};

		try {
			const response = await fetch('https://0857-200-3-193-225.ngrok-free.app/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				localStorage.setItem('userEmail', data.email);
			}
		} catch (error) {
			console.error(error);
		}

		const dataEmail = {
			email: document.getElementById('email').value,
		};

		try {
			const response = await fetch('https://0857-200-3-193-225.ngrok-free.app/send-email/template', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataEmail),
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Email enviado con éxito:', result);
			} else {
				const error = await response.json();
				console.error('Error al enviar el email:', error);
			}
		} catch (error) {
			console.error('Error en la solicitud fetch:', error);
		}

		// Navegar a la pantalla de agradecimiento
		router.navigateTo('/thanksScreen');
	});
}
