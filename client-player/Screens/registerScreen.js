import { router, socket } from '../routes.js';

export default function renderScreen4() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <h4>Register:</h4>
    <p>Enter your details below to claim the prize!</p>
    <form id="form-register">
      <div>
        <input type="text" id="name" name="name" placeholder="Name"/>
      </div>
      <div>
        <input type="email" id="email" name="email" placeholder="Email"/>
      </div>
       <div>
        <input type="number" id="cellPhone" name="cellPhone" placeholder="CellPhone"/>
      </div>
       <div>
        <button type="submit" id="save-form" value="Send"></button>
      </div>
      <button id="next-form">Next</button>
    </form>
  `;

	socket.on('formScren', () => {
		console.log('The phone screen shows the register form');
	});

	document.getElementById('save-form').addEventListener('submit', (event) => {
		event.preventDefault();
		socket.emit('registerInfoSaved', data);
	});

}
