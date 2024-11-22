// Inicializar Kaboom
kaboom({
  width: 1490, // Ancho de la pantalla
  height: 805, // Altura de la pantalla
  background: [0, 0, 0], // Fondo negro
});

// Cargar los sprites de Link y Pulpo
loadSprite('fondo', '../www/sprites/fondo.png');
loadSprite('LinkStay', '../www/sprites/LinkStay.png');
loadSprite('LinkDerecha', '../www/sprites/LinkDerecha.png');
loadSprite('LinkIzquierda', '../www/sprites/LinkIzquierda.png');
loadSprite('LinkFrente', '../www/sprites/LinkFrente.png');
loadSprite('LinkDañoIzq', '../www/sprites/LinkDañoIzq.png');
loadSprite('LinkDañoDer', '../www/sprites/LinkDañoDer.png');
loadSprite('LinkDañoFrente', '../www/sprites/LinkDañoFrente.png');
loadSprite('Pulpo', '../www/sprites/Pulpo.png');
loadSprite('Pulpodos', '../www/sprites/Pulpodos.png');
loadSprite('PulpoDaño', '../www/sprites/PulpoDaño.png');
loadSprite('PulpoPolvo', '../www/sprites/PulpoPolvo.png');

scene('juego', () => {
  // Agregar el fondo
  add([
    sprite('fondo', {
      width: 1490, // Tamaño del canvas
      height: 805, // Tamaño del canvas
    }),
    pos(0, 0), // Posición inicial
  ]);

  // Agregar a Link
  const link = add([
    sprite('LinkStay'), // Sprite por defecto
    pos(width() / 2.28, height() / 1.7), // Centro de la pantalla
    area(), // Habilita colisiones
    'Link', // Etiqueta para colisiones
    {
      estado: 'quieto', // Estado inicial (para controlar las animaciones)
      vivo: true, // Estado de Link
    },
  ]);

  // Rectángulo para visualizar el área de colisión (invisible)
  const colisionVisual = add([
    rect(32, 32), // Tamaño inicial
    pos(link.pos), // Sincronizado con Link
    outline(2), // Borde visible (opcional)
    z(1), // Asegura que esté encima del fondo
    opacity(0), // Hacerlo invisible
  ]);

  // Áreas de colisión personalizadas por sprite
  const areasColision = {
    quieto: { width: 100, height: 100, offset: vec2(50, 50) },
    derecha: { width: 160, height: 100, offset: vec2(40, 50) },
    izquierda: { width: 160, height: 100, offset: vec2(-4, 50) },
    frente: { width: 100, height: 170, offset: vec2(40, 0) },
    dañoIzq: { width: 100, height: 100, offset: vec2(50, 50) },
    dañoDer: { width: 100, height: 100, offset: vec2(50, 50) },
    dañoFrente: { width: 100, height: 100, offset: vec2(50, 60) },
  };

  // Función para cambiar el sprite y actualizar el área de colisión
  function cambiarSprite(estado, volverAQuieto = true) {
    const sprites = {
      quieto: 'LinkStay',
      derecha: 'LinkDerecha',
      izquierda: 'LinkIzquierda',
      frente: 'LinkFrente',
      dañoIzq: 'LinkDañoIzq',
      dañoDer: 'LinkDañoDer',
      dañoFrente: 'LinkDañoFrente',
    };

    if (!link.vivo) return; // No cambiar sprites si está muerto

    link.use(sprite(sprites[estado]));
    link.estado = estado;

    // Actualizar el área de colisión
    const { width, height, offset } = areasColision[estado];
    link.area.width = width;
    link.area.height = height;
    link.area.offset = offset;

    // Actualizar el rectángulo visual
    colisionVisual.width = width;
    colisionVisual.height = height;
    colisionVisual.pos = link.pos.add(offset);

    if (volverAQuieto) {
      wait(0.4, () => {
        if (link.estado === estado) {
          cambiarSprite('quieto', false);
        }
      });
    }
  }

  // Sincronizar el rectángulo de colisión con la posición de Link
  link.onUpdate(() => {
    const offset = areasColision[link.estado].offset || vec2(0, 0);
    colisionVisual.pos = link.pos.add(offset);
  });

  // Controles para cambiar sprites
  onKeyPress('right', () => cambiarSprite('derecha'));
  onKeyPress('left', () => cambiarSprite('izquierda'));
  onKeyPress('up', () => cambiarSprite('frente'));

  // **Integración del enemigo Pulpo**
  function generarPulpo() {
		const direcciones = [
			{ x: 0, y: rand(0, height()) },
			{ x: width(), y: rand(0, height()) },
			{ x: rand(0, width()), y: 0 },
		];
		const dir = choose(direcciones);

		const pulpo = add([
			sprite('Pulpo'),
			pos(dir.x, dir.y),
			area(),
			'Pulpo', // Etiqueta para colisiones
			{
				vivo: true,
				spriteFrame: 0, // Cambiar "frame" por "spriteFrame"
			},
		]);

		const velocidad = 50;
		const direccion = vec2(width() / 2, height() / 2).sub(pulpo.pos).unit();

		// Alternar sprites mientras se mueve
		loop(0.3, () => {
			if (pulpo.vivo) {
				pulpo.use(sprite(pulpo.spriteFrame === 0 ? 'Pulpodos' : 'Pulpo'));
				pulpo.spriteFrame = pulpo.spriteFrame === 0 ? 1 : 0; // Usar "spriteFrame"
			}
		});

		pulpo.onUpdate(() => {
			if (pulpo.vivo) pulpo.move(direccion.scale(velocidad));
		});

		// Colisión con Link
		pulpo.onCollide('Link', () => {
			if (!pulpo.vivo) return;

			if (link.estado === 'quieto') {
				cambiarSprite('dañoFrente');
				link.vivo = false; // Link muere
			} else {
				pulpo.vivo = false;
				pulpo.use(sprite('PulpoDaño'));
				wait(0.5, () => {
					pulpo.use(sprite('PulpoPolvo'));
					wait(0.5, () => destroy(pulpo));
				});
			}
		});
	}


  // Generar Pulpos periódicamente
  loop(2, () => generarPulpo());
});

// Iniciar la escena
go('juego');
