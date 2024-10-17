import { router, socket } from '../routes.js';

export default function renderScreen10() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Timer</h1>
    <p id="timer-display">10</p>
  `;

	let timeLeft = 10; // Inicia con 10 segundos
	const timerDisplay = document.getElementById('timer-display');
	timerDisplay.textContent = timeLeft; // Muestra el tiempo inicial

	// Inicia el intervalo cuando la pantalla se carga
	const timerInterval = setInterval(() => {
		timeLeft--;
		timerDisplay.textContent = timeLeft; // Actualiza el contador en pantalla

		// Si llega a 0, detener el temporizador y navegar a la siguiente pantalla
		if (timeLeft <= 0) {
			clearInterval(timerInterval);
			router.navigateTo('/beginScreen'); // Redirigir a la pantalla deseada
		}
	}, 1000); // Actualiza cada 1 segundo
}
