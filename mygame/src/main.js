// Inicializar Kaboom
kaboom({
  width: 1490, // Ancho de la pantalla
  height: 805, // Altura de la pantalla
  background: [0, 0, 0], // Fondo negrO
	layers: ['bg', 'game', 'ui'], // Capas definidas
});

// Cargar los sprites de Link
loadSprite('fondo', '../www/sprites/fondo.png');
loadSprite('LinkStay', '../www/sprites/LinkStay.png');
loadSprite('LinkDerecha', '../www/sprites/LinkDerecha.png');
loadSprite('LinkIzquierda', '../www/sprites/LinkIzquierda.png');
loadSprite('LinkFrente', '../www/sprites/LinkFrente.png');
loadSprite('LinkDañoIzq', '../www/sprites/LinkDañoIzq.png');
loadSprite('LinkDañoDer', '../www/sprites/LinkDañoDer.png');
loadSprite('LinkDañoFrente', '../www/sprites/LinkDañoFrente.png');

scene('juego', () => {
	// Agregar el fondo
	add([
		sprite('fondo', {
			width: 1490, // Tamaño del canvas
			height: 805, // Tamaño del canvas
		}), // Escalar para que coincida con el tamaño de pantalla
		pos(0, 0), // Posición inicial
	]);

	// Agregar a Link
	const link = add([
		sprite('LinkStay'), // Sprite por defecto
		pos(width() / 2.28, height() / 1.7), // Centro de la pantalla
		area(), // Habilita colisiones
		{
			estado: 'quieto', // Estado inicial (para controlar las animaciones)
		},
	]);

	// Función para cambiar el sprite de Link según la acción
	function cambiarSprite(estado, volverAQuieto = true) {
		if (estado === 'quieto') {
			link.use(sprite('LinkStay'));
		} else if (estado === 'derecha') {
			link.use(sprite('LinkDerecha'));
		} else if (estado === 'izquierda') {
			link.use(sprite('LinkIzquierda'));
		} else if (estado === 'frente') {
			link.use(sprite('LinkFrente'));
		} else if (estado === 'dañoIzq') {
			link.use(sprite('LinkDañoIzq'));
		} else if (estado === 'dañoDer') {
			link.use(sprite('LinkDañoDer'));
		} else if (estado === 'dañoFrente') {
			link.use(sprite('LinkDañoFrente'));
		}
		link.estado = estado; // Actualizar el estado

		// Si debe volver a "quieto", esperar un breve momento antes de cambiar
		if (volverAQuieto) {
			wait(0.5, () => {
				if (link.estado === estado) {
					cambiarSprite('quieto', false); // No volver a quieto repetidamente
				}
			});
		}
	}

	// Iniciar con Link estático
	cambiarSprite('quieto');

	// Controles para cambiar sprites
	onKeyPress('right', () => cambiarSprite('derecha'));
	onKeyPress('left', () => cambiarSprite('izquierda'));
	onKeyPress('up', () => cambiarSprite('frente'));
	onKeyPress('space', () => cambiarSprite('quieto', false)); // No volver a quieto automáticamente aquí

	// Simula daño (usa las teclas para pruebas)
	onKeyPress('a', () => cambiarSprite('dañoIzq'));
	onKeyPress('s', () => cambiarSprite('dañoDer'));
	onKeyPress('d', () => cambiarSprite('dañoFrente'));
});

// Iniciar la escena
go('juego');
