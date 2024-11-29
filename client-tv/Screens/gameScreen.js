import { router, socket } from '../routes.js';

export default function renderScreen12() {
	const app = document.getElementById('app');

	socket.emit('sendMailWinner', 'prueba');

	// Escena principal
	scene('juego', () => {
		// Fondo inicial
		add([sprite('fondo', { width: 1490, height: 805 }), pos(0, 0)]);

		const trifuerza = add([
			sprite('Trifuerza'),
			pos(718, 660),
			area(),
			'trifuerza',
			{
				cambiarSprite: false,
			},
		]);

		loop(0.5, () => {
			if (trifuerza.exists()) {
				trifuerza.use(trifuerza.cambiarSprite ? sprite('Trifuerza') : sprite('Trifuerza1'));
				trifuerza.cambiarSprite = !trifuerza.cambiarSprite;
			}
		});

		// Link en su posición inicial
		const LinkStay = add([
			sprite('LinkStay'),
			pos(705, 525), // Link está centrado
			area(),
			body(),
			'link', // Etiqueta para identificar a Link
		]);

		// Espada
		let espada = null;

		// Vida inicial de Link
		let vida = 10;

		// Corazones en pantalla
		let corazones = []; // Arreglo que almacena los sprites de corazones

		// Inicializamos los corazones en pantalla
		function inicializarCorazones() {
			for (let i = 1; i <= 5; i++) {
				const corazon = add([
					sprite(`Corazon${i}`),
					pos(20 + (i - 1) * 40, 20), // Posiciones horizontales separadas
					scale(0.2), // Tamaño reducido
					`corazon${i}`, // Etiqueta para identificar cada corazón
				]);
				corazones.push(corazon);
			}
		}

		// Mostrar corazones iniciales
		inicializarCorazones();

		// Función para actualizar corazones según la vida
		function actualizarCorazones() {
			if (vida === 0) {
				// Cambiar a pantalla de Game Over
				go('gameOver');
				return;
			}

			const indice = Math.ceil(vida / 2); // Calcular índice del corazón afectado
			const esMedio = vida % 2 !== 0; // Verificar si la vida es impar (corazón medio)

			if (esMedio) {
				// Cambiar sprite al corazón medio
				corazones[indice - 1].use(sprite(`CorazonMedio${indice}`));
			} else {
				// Eliminar el corazón medio cuando vida es par
				destroy(corazones[indice]);
				corazones.pop();
			}
		}

		// Función para reducir la vida
		function recibirDaño() {
			if (vida > 0) {
				vida -= 1;
				actualizarCorazones();
			}
		}

		// Función para cambiar la sprite de Link y manejar la espada
		function atacar(direccion, offsetX, offsetY, spriteEspada) {
			cambiarSprite(direccion);

			// Destruir espada previa si existe
			if (espada) {
				destroy(espada);
				espada = null;
			}

			// Añadir espada en la posición relativa
			espada = add([sprite(spriteEspada), pos(LinkStay.pos.x + offsetX, LinkStay.pos.y + offsetY), area(), 'espada']);

			// Volver al estado inicial y eliminar la espada
			wait(0.5, () => {
				cambiarSprite('LinkStay');
				if (espada) {
					destroy(espada);
					espada = null;
				}
			});
		}

		// Función para cambiar la sprite de Link
		function cambiarSprite(spriteLink) {
			LinkStay.use(sprite(spriteLink));
		}

		// Conectar con el servidor (suponiendo que tienes un servidor socket.io corriendo)
		//const socket = io();

		// Escuchar los eventos emitidos por el servidor y mover a Link
		socket.on('MoveSwordLeft', (data) => {
			console.log('se recibe movimiento izquierda');
			atacar('LinkIzquierda', -60, -30, 'EspadaIzquierda');
		});

		socket.on('MoveSwordRight', (data) => {
			console.log('se recibe movimiento derecha');
			atacar('LinkDerecha', 85, -30, 'EspadaDerecha');
		});

		socket.on('MoveSwordFront', (data) => {
			console.log('se recibe movimiento frente');
			atacar('LinkFrente', -40, -65, 'EspadaFrente');
		});

		// Generar fantasmas periódicamente
		loop(1.5, () => {
			generarFantasma();
		});

		// Función para generar un fantasma
		function generarFantasma() {
			const borde = rand([0, 1, 2]);
			let spawnPos;

			if (borde === 0) {
				spawnPos = vec2(0, rand(0, height()));
			} else if (borde === 1) {
				spawnPos = vec2(width(), rand(0, height()));
			} else {
				spawnPos = vec2(rand(0, width()), 0);
			}

			const fantasma = add([
				sprite('Fantasma'),
				pos(spawnPos),
				area(),
				'fantasma',
				{
					cambiarSprite: false,
					estaMuriendo: false, // Propiedad para controlar animación de muerte
					yaInfligioDanio: false, // Propiedad para controlar daño
				},
			]);

			// Cambiar sprite del fantasma periódicamente
			loop(0.5, () => {
				if (fantasma.exists()) {
					fantasma.use(fantasma.cambiarSprite ? sprite('Fantasma') : sprite('FantasmaDos'));
					fantasma.cambiarSprite = !fantasma.cambiarSprite;
				}
			});

			// Movimiento del fantasma hacia Link
			fantasma.onUpdate(() => {
				const direccion = LinkStay.pos.sub(fantasma.pos).unit();
				fantasma.move(direccion.scale(100));
			});

			// Al ser golpeado por la espada
			fantasma.onCollide('espada', () => {
				if (!fantasma.estaMuriendo) {
					// Evitar reinicio de animación
					fantasma.estaMuriendo = true; // Marcar que está muriendo
					fantasma.use(sprite('FantasmaDaño')); // Cambiar a sprite de daño
					wait(0.2, () => {
						fantasma.use(sprite('FantasmaPolvo')); // Cambiar a sprite de polvo
						wait(0.2, () => destroy(fantasma)); // Eliminar después de la animación
					});
				}
			});

			// Al colisionar con Link
			fantasma.onCollide('link', () => {
				if (!fantasma.yaInfligioDanio) {
					// Verificar si ya infligió daño
					fantasma.yaInfligioDanio = true; // Marcar como que infligió daño
					recibirDaño(); // Reducir vida al colisionar
					cambiarSprite('LinkDaño'); // Cambiar a sprite de daño
					destroy(fantasma); // Destruir al fantasma de inmediato
					wait(0.4, () => cambiarSprite('LinkStay')); // Regresar al sprite normal
				}
			});
		}

		// Generar enemigos desde arriba cuando el temporizador llegue a 40 segundos
		loop(4, () => {
			if (tiempoRestante <= 40) {
				// Generar enemigo cada 4 segundos desde los 40 segundos restantes
				loop(10, () => generarEnemigo());
			}
		});

		// Función para generar un enemigo desde arriba
		function generarEnemigo() {
			const spawnPos = vec2(705, 0); // Siempre desde arriba, alineado con Link
			const velocidad = vec2(0, 100); // Movimiento vertical hacia abajo

			const enemigo = add([
				sprite('EnemigoIz1'), // Sprite inicial
				pos(spawnPos),
				area(),
				'enemigo',
				{
					cambiarSprite: 0, // Contador para alternar entre sprites
					estaMuriendo: false, // Controla la animación de muerte
					yaInfligioDanio: false, // Evita daño múltiple
				},
			]);

			// Alternar sprites para animación de movimiento
			loop(0.3, () => {
				if (enemigo.exists() && !enemigo.estaMuriendo) {
					enemigo.cambiarSprite = (enemigo.cambiarSprite + 1) % 3;
					const spriteActual = `EnemigoIz${enemigo.cambiarSprite + 1}`;
					enemigo.use(sprite(spriteActual));
				}
			});

			// Movimiento hacia Link
			enemigo.onUpdate(() => {
				if (!enemigo.estaMuriendo) {
					enemigo.move(velocidad); // Movimiento fijo hacia abajo
				}
			});

			// Colisión con la espada
			enemigo.onCollide('espada', () => {
				if (!enemigo.estaMuriendo) {
					enemigo.estaMuriendo = true;
					enemigo.use(sprite('FantasmaPolvo')); // Sprite de animación de muerte
					wait(0.2, () => destroy(enemigo)); // Eliminar tras animación
				}
			});

			// Colisión con Link
			enemigo.onCollide('link', () => {
				if (!enemigo.yaInfligioDanio) {
					enemigo.yaInfligioDanio = true;
					recibirDaño();
					cambiarSprite('LinkDaño'); // Cambiar sprite de Link al de daño
					destroy(enemigo); // Destruir enemigo tras colisión
					wait(0.4, () => cambiarSprite('LinkStay')); // Regresar sprite de Link
				}
			});
		}

		// Temporizador de 1 minuto
		let tiempoRestante = 60; // 1 minuto
		const temporizadorTexto = add([
			text(tiempoRestante.toString(), { size: 64 }), // Texto del temporizador
			pos(width() - 120, 17), // Posición en la esquina superior derecha
			color(255, 255, 255), // Color blanco
		]);

		// Actualizar el temporizador cada segundo
		loop(1, () => {
			if (tiempoRestante > 0) {
				tiempoRestante--;
				temporizadorTexto.text = tiempoRestante.toString();
			} else {
				// Si el tiempo acaba y Link sigue vivo, cambiar a la pantalla de victoria
				if (vida > 0) {
					go('youWin');
				}
			}
		});
	});

	// Escena de Victoria
	scene('youWin', async () => {
		// Fondo verde

		add([sprite('Winner', { width: 1490, height: 805 }), pos(0, 0)]);
		socket.emit('sendMailWinner', { winner: 'You Won!', score: 100 });
	});

	// Escena de Game Over
	scene('gameOver', () => {
		// Fondo negro

		add([sprite('Loser', { width: 1490, height: 805 }), pos(0, 0)]);
	});

	// Iniciar escena
	go('juego');
}
