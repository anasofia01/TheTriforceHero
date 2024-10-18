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
		const rotationRate = event.rotationRate;
		console.log('ACCELERATION: ', acceleration);
		console.log('ROTATION: ', rotationRate);
		// EMIT EVENT TO SERVER WITH VALUES
		//Emitir estas 3 vainas amarillas de abajo al lservidor y luego a la pantalla del tv y renderizar en el tv

		drawAxes();
		drawAcceleration(acceleration);
		drawRotationRate(rotationRate);

		const dataDiv = document.getElementById('data');
		dataDiv.innerHTML = `
      <p>Acceleration (including gravity):</p>
      <p>X: ${acceleration.x?.toFixed(2)}, Y: ${acceleration.y?.toFixed(2)}, Z: ${acceleration.z?.toFixed(2)}</p>
      <p>Rotation Rate:</p>
      <p>Alpha: ${rotationRate.alpha?.toFixed(2)}, Beta: ${rotationRate.beta?.toFixed(
			2
		)}, Gamma: ${rotationRate.gamma?.toFixed(2)}</p>
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
