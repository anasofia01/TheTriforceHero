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
			pos(705, 525),
			area(),
			body(),
	]);

	// Espada (no añadimos inicialmente, se añadirá dinámicamente)
	let espada = null; // Inicializar como null para comprobar si existe

	// Función para cambiar la sprite de Link y manejar la espada
	function atacar(direccion, offsetX, offsetY, spriteEspada) {
			cambiarSprite(direccion); // Cambiar sprite de Link

			// Destruir espada previa si existe
			if (espada) {
					destroy(espada);
					espada = null; // Asegurar que no intente destruir nuevamente
			}

			// Añadir espada en la posición relativa
			espada = add([
					sprite(spriteEspada),
					pos(LinkStay.pos.x + offsetX, LinkStay.pos.y + offsetY),
					area(),
			]);

			// Volver al estado inicial y eliminar la espada
			wait(0.4, () => {
					cambiarSprite('LinkStay'); // Volver a LinkStay
					if (espada) { // Verificar si la espada aún existe
							destroy(espada); // Destruir espada
							espada = null; // Resetear para futuras comprobaciones
					}
			});
	}

	// Función para cambiar la sprite de Link
	function cambiarSprite(spriteLink) {
			LinkStay.use(sprite(spriteLink)); // Cambiar sprite de Link
	}

	// Usar onKeyPress para escuchar las teclas
	onKeyPress('left', () => {
			atacar('LinkIzquierda', -60, -30, 'EspadaIzquierda'); // Espada a la izquierda
	});

	onKeyPress('right', () => {
			atacar('LinkDerecha', 85, -30, 'EspadaDerecha'); // Espada a la derecha
	});

	onKeyPress('up', () => {
			atacar('LinkFrente', -40, -65, 'EspadaFrente'); // Espada al frente
	});
});

// Iniciar escena
go('juego');


}
