import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>The Legend of Zelda</h1>
    <p>Move your sword from side to side to defeat the enemies.</p>
		<img id='moveSword' src="https://pbs.twimg.com/media/GaJSC7PWYAAMAiU?format=jpg&name=4096x4096" alt="Master Sword" />
    <p>Look at the TV screen!</p>

		<h1>Phone sensors</h1>
    <button id="location-button">Activate location</button>
    <button id="acceletometer-button">Activate Accelerometer</button>
    <canvas id="motionCanvas" width="400" height="400"></canvas>
    <div id="data"></div>

  `;

	console.log('prueba');

	socket.on('sendWinner', (data) => {
		alert('llega');
		console.log('llega2');
		router.navigateTo('/registerScreen');
	});

	socket.on('winner', (data) => {
		if (data.screen === 'winnerScreen') {
			router.navigateTo('/winnerScreen');
		}
	});

	socket.on('loser', (data) => {
		if (data.screen === 'loserScreen') {
			router.navigateTo('/LoserScreen');
		}
	});

	// let socket = io("http://172.20.10.2:5050", { path: "/real-time" });

	const canvas = document.getElementById('motionCanvas');
	const ctx = canvas.getContext('2d');

	function drawAxes() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.moveTo(200, 0); // Y-axis
		ctx.lineTo(200, 400);
		ctx.moveTo(0, 200); // X-axis
		ctx.lineTo(400, 200);
		ctx.moveTo(200, 200); // Z-axis (simulated in 2D)
		ctx.lineTo(400, 0);
		ctx.stroke();
		ctx.fillText('X', 390, 190);
		ctx.fillText('Y', 210, 10);
		ctx.fillText('Z', 390, 10);
	}

	function drawAcceleration(acceleration) {
		ctx.beginPath();
		ctx.arc(200 + acceleration.x * 10, 200 - acceleration.y * 10, 5, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillText(`Acc (x,y): (${acceleration.x.toFixed(2)}, ${acceleration.y.toFixed(2)})`, 10, 20);
	}

	function drawRotationRate(rotationRate) {
		ctx.fillText(
			`Rot Rate (α, β, γ): (${rotationRate.alpha?.toFixed(2)}, ${rotationRate.beta?.toFixed(
				2
			)}, ${rotationRate.gamma?.toFixed(2)})`,
			10,
			40
		);
	}

	function handleMotionEvent(event) {
		const acceleration = event.accelerationIncludingGravity;

		// Umbrales ajustados
		const LEFT_THRESHOLD = 3.0; // Izquierda: X positivo
		const RIGHT_THRESHOLD = -3.0; // Derecha: X negativo
		const FRONT_Z_THRESHOLD = 7.0; // Frente: Z mayor a 7

		// Dibujar ejes y datos en el canvas
		drawAxes();
		drawAcceleration(acceleration);

		// Actualización del elemento dataDiv
		const dataDiv = document.getElementById('data');
		dataDiv.innerHTML = `
				<p><strong>Datos del acelerómetro:</strong></p>
				<p>X: ${acceleration.x?.toFixed(2)}</p>
				<p>Y: ${acceleration.y?.toFixed(2)}</p>
				<p>Z: ${acceleration.z?.toFixed(2)}</p>
			`;

		// Detectar movimientos individuales y emitir eventos específicos
		if (acceleration.x >= LEFT_THRESHOLD) {
			socket.emit('moveSwordLeft', { move: 'left' });
			dataDiv.innerHTML += `
				<p style="color: green;">Movimiento detectado: Izquierda</p>`;
			console.log('Movimiento detectado: izquierda');
		} else if (acceleration.x <= RIGHT_THRESHOLD) {
			socket.emit('moveSwordRight', { move: 'right' });
			dataDiv.innerHTML += `
				<p style="color: blue;">Movimiento detectado: Derecha</p>`;
			console.log('Movimiento detectado: derecha');
		} else if (acceleration.z >= FRONT_Z_THRESHOLD) {
			socket.emit('moveSwordFront', { move: 'front' });
			dataDiv.innerHTML += `
				<p style="color: orange;">Movimiento detectado: Frente</p>`;
			console.log('Movimiento detectado: frente');
		} else {
			dataDiv.innerHTML += `
				<p style="color: red;">No se detectó un movimiento válido.</p>`;
			console.log('No se detectó un movimiento válido.');
		}

		// Información adicional
		dataDiv.innerHTML += `
			<p><strong>Información adicional:</strong></p>
			<p>Movimiento detectado solo si supera los umbrales establecidos.</p>
			<p>Umbral izquierda: X >= ${LEFT_THRESHOLD}</p>
			<p>Umbral derecha: X <= ${RIGHT_THRESHOLD}</p>
			<p>Umbral frente: Z >= ${FRONT_Z_THRESHOLD}</p>
		`;
	}

	drawAxes(); // Initial draw

	// ------------- GEOLOCALIZATION

	// ------------- GYROSCOPE SENSOR

	document.getElementById('acceletometer-button').addEventListener('click', initMotionEvent);

	// Request permission and initialize motion event on user interaction (e.g., button click)
	function initMotionEvent() {
		if (window.DeviceMotionEvent) {
			if (typeof DeviceMotionEvent.requestPermission === 'function') {
				DeviceMotionEvent.requestPermission()
					.then((permissionState) => {
						if (permissionState === 'granted') {
							window.addEventListener('devicemotion', handleMotionEvent);
						} else {
							alert('Permission to access device motion data denied.');
						}
					})
					.catch(console.error);
			} else {
				window.addEventListener('devicemotion', handleMotionEvent);
			}
		} else {
			console.log('DeviceMotionEvent is not supported by this browser.');
		}
	}

	drawAxes();
}