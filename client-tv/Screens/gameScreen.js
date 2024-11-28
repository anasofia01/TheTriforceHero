import { router, socket } from '../routes.js';

export default function renderScreen12() {
	const app = document.getElementById('app');

	
// Escena principal
scene('juego', () => {
	// Fondo
	add([sprite('fondo', { width: 1490, height: 805 }), pos(0, 0)]);

	// Link en su posición inicial
	const LinkStay = add([
			sprite("LinkStay"),
			pos(705, 525), // Link está centrado
			area(),
			body(),
			"link", // Etiqueta para identificar a Link
	]);

	// Espada (no añadimos inicialmente, se añadirá dinámicamente)
	let espada = null;

	// Barra de vida
	const barraVida = add([
			rect(200, 20), // Rectángulo como barra de vida
			pos(20, 20),   // Posición en la pantalla
			color(0, 255, 0), // Color verde inicial
			outline(2),
			"vida",
	]);
	let vida = 100;

	// Función para cambiar la sprite de Link y manejar la espada
	function atacar(direccion, offsetX, offsetY, spriteEspada) {
			cambiarSprite(direccion);

			// Destruir espada previa si existe
			if (espada) {
					destroy(espada);
					espada = null;
			}

			// Añadir espada en la posición relativa
			espada = add([
					sprite(spriteEspada),
					pos(LinkStay.pos.x + offsetX, LinkStay.pos.y + offsetY),
					area(),
					"espada",
			]);

			// Volver al estado inicial y eliminar la espada
			wait(0.4, () => {
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

	// Usar onKeyPress para escuchar las teclas
	onKeyPress('left', () => {
			atacar('LinkIzquierda', -60, -30, 'EspadaIzquierda');
	});

	onKeyPress('right', () => {
			atacar('LinkDerecha', 85, -30, 'EspadaDerecha');
	});

	onKeyPress('up', () => {
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
					"fantasma",
					{
							cambiarSprite: false,
					},
			]);

			loop(0.5, () => {
					if (fantasma.exists()) {
							fantasma.use(fantasma.cambiarSprite ? sprite('Fantasma') : sprite('FantasmaDos'));
							fantasma.cambiarSprite = !fantasma.cambiarSprite;
					}
			});

			fantasma.onUpdate(() => {
					const direccion = LinkStay.pos.sub(fantasma.pos).unit();
					fantasma.move(direccion.scale(100));
			});

			fantasma.onCollide("espada", () => {
					fantasma.use(sprite("FantasmaDaño")); // Cambiar a sprite de daño
					wait(0.2, () => {
							fantasma.use(sprite("FantasmaPolvo")); // Cambiar a sprite de polvo
							wait(0.2, () => destroy(fantasma)); // Eliminar después de la animación
					});
			});

			fantasma.onCollide("link", () => {
					destroy(fantasma);
					vida -= 8;
					if (vida <= 0) {
							vida = 0;
					}
					cambiarSprite("LinkDaño"); // Cambiar a sprite de daño
					wait(0.4, () => cambiarSprite("LinkStay")); // Regresar al sprite normal
					actualizarBarraVida();
			});
	}

	// Función para actualizar la barra de vida
	function actualizarBarraVida() {
			barraVida.width = (vida / 100) * 200;
			if (vida > 50) {
					barraVida.color = rgb(0, 255, 0);
			} else if (vida > 20) {
					barraVida.color = rgb(255, 165, 0);
			} else {
					barraVida.color = rgb(255, 0, 0);
			}
	}
});

// Iniciar escena
go('juego');



}
