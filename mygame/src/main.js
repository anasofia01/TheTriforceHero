// Inicializar Kaboom
kaboom({
  width: 1490, // Ancho de la pantalla
  height: 805, // Altura de la pantalla
  background: [0, 0, 0], // Fondo negro
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
    }),
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

  // Rectángulo para visualizar el área de colisión
  const colisionVisual = add([
    rect(32, 32), // Tamaño inicial
    color(255, 0, 0),
    pos(link.pos), // Sincronizado con Link
    outline(2), // Borde
    z(1), // Asegura que esté encima del fondo
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

    // Cambiar sprite
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

    // Si debe volver a "quieto", esperar un momento antes de cambiar
    if (volverAQuieto) {
      wait(0.4, () => {
        if (link.estado === estado) {
          cambiarSprite('quieto', false); // No volver a quieto repetidamente
        }
      });
    }
  }

  // Sincronizar el rectángulo de colisión con la posición de Link
  link.onUpdate(() => {
    const offset = areasColision[link.estado].offset || vec2(0, 0);
    colisionVisual.pos = link.pos.add(offset);
  });

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
