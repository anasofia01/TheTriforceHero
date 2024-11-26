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

// Definir las áreas de colisión personalizadas para Link
const areasColision = {
  quieto: { width: 75, height: 100, offset: vec2(55, 53) },
  derecha: { width: 75, height: 90, offset: vec2(50, 55) },
  izquierda: { width: 75, height: 90, offset: vec2(65, 55) },
  frente: { width: 75, height: 90, offset: vec2(55, 70) },
  dañoIzq: { width: 100, height: 100, offset: vec2(50, 50) },
  dañoDer: { width: 100, height: 100, offset: vec2(50, 50) },
  dañoFrente: { width: 100, height: 100, offset: vec2(50, 50) },
};

// Definir las áreas de colisión para la espada
const areasEspada = {
  derecha: { width: 60, height: 110, offset: vec2(128, 40) },
  izquierda: { width: 60, height: 110, offset: vec2(0, 40) },
  frente: { width: 85, height: 70, offset: vec2(50, 0) },
};

// Escena principal
scene('juego', () => {
  // Agregar el fondo
  add([
    sprite('fondo', {
      width: 1490,
      height: 805,
    }),
    pos(0, 0),
  ]);

  // Agregar a Link
  const link = add([
    sprite('LinkStay'), // Sprite inicial
    pos(width() / 2.28, height() / 1.7), // Posición inicial
    area(), // Activar colisiones
    outline(2, RED), // Resaltar colisión
    opacity(1), // Opacidad visible para el área
    'Link', // Etiqueta para colisiones
    {
      estado: 'quieto', // Estado inicial
      vivo: true, // Indica que Link está vivo
    },
  ]);

  // Crear un rectángulo para visualizar el área de colisión de Link
  const colisionVisual = add([
    rect(100, 100), // Tamaño inicial
    pos(link.pos), // Sincronizar con la posición de Link
    outline(2, YELLOW), // Borde visible en amarillo
    z(1), // Asegura que esté encima del fondo
    opacity(0.5), // Hacerlo visible con opacidad
  ]);

  // Crear un rectángulo para visualizar el área de la espada
  const espadaVisual = add([
    rect(20, 20), // Tamaño inicial
    pos(link.pos), // Posición sincronizada con Link
    outline(2, RED), // Borde visible en rojo
    z(1), // Sobre el fondo
    opacity(0), // Oculto por defecto
  ]);

  // Función para actualizar el área de colisión de Link y la espada
  function actualizarColisionLink(estado) {
    const colisionLink = areasColision[estado];
    if (colisionLink) {
      link.area.width = colisionLink.width;
      link.area.height = colisionLink.height;
      link.area.offset = colisionLink.offset;

      // Actualizar rectángulo visual de Link
      colisionVisual.width = colisionLink.width;
      colisionVisual.height = colisionLink.height;
      colisionVisual.pos = link.pos.add(colisionLink.offset);
    }

    const colisionEspada = areasEspada[estado];
    if (colisionEspada) {
      espadaVisual.width = colisionEspada.width;
      espadaVisual.height = colisionEspada.height;
      espadaVisual.pos = link.pos.add(colisionEspada.offset);
      espadaVisual.opacity = 0.5; // Mostrar si está activa
    } else {
      espadaVisual.opacity = 0; // Ocultar si no está activa
    }
  }

  // Actualizar la posición de los rectángulos visuales cuando Link se mueve
  link.onUpdate(() => {
    const offsetLink = areasColision[link.estado]?.offset || vec2(0, 0);
    colisionVisual.pos = link.pos.add(offsetLink);

    const offsetEspada = areasEspada[link.estado]?.offset || vec2(0, 0);
    espadaVisual.pos = link.pos.add(offsetEspada);
  });

  // Modificar la función cambiarSprite para incluir la actualización
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

    if (!link.vivo) return; // No cambiar si está muerto

    link.use(sprite(sprites[estado]));
    link.estado = estado;

    // Actualizar el área de colisión y el rectángulo visual
    actualizarColisionLink(estado);

    if (volverAQuieto) {
      wait(0.4, () => {
        if (link.estado === estado) {
          cambiarSprite('quieto', false);
        }
      });
    }
  }

  // Controles para ataques
  onKeyPress('right', () => cambiarSprite('derecha'));
  onKeyPress('left', () => cambiarSprite('izquierda'));
  onKeyPress('up', () => cambiarSprite('frente'));


  // **Generar Pulpo**
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

    // Rectángulo para visualizar el área de colisión del pulpo
    const colisionPulpo = add([
      rect(110, 110), // Tamaño inicial
      pos(pulpo.pos), // Sincronizado con Pulpo
      outline(2), // Borde visible (opcional)
      z(1), // Asegura que esté encima del fondo
      opacity(0.5), // Hacerlo visible para ver la colisión
      { pulpo }, // Asociar con el pulpo
    ]);

    // Actualizar el área de colisión del pulpo
    pulpo.onUpdate(() => {
      colisionPulpo.pos = pulpo.pos; // Sincronizar con la posición del pulpo
    });

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
      } else {
        pulpo.vivo = false;
        pulpo.use(sprite('PulpoDaño'));
        wait(0.5, () => {
          pulpo.use(sprite('PulpoPolvo'));
          wait(0.5, () => {
            destroy(pulpo); // Eliminar pulpo de la pantalla
            destroy(colisionPulpo); // Eliminar área de colisión del pulpo
          });
        });
      }
    });
  }

  // Generar Pulpos periódicamente
  loop(2, () => generarPulpo());
});

// Iniciar la escena
go('juego');