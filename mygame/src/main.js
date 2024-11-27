// Inicializar Kaboom
kaboom({
  width: 1490,
  height: 805,
  background: [0, 0, 0],
});

// Cargar sprites
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

// Áreas de colisión de Link (ajustadas y centradas)
const areasColision = {
  quieto: { width: 20, height: 20, offset: vec2(5, 5) },
  derecha: { width: 40, height: 60, offset: vec2(5, 5) },
  izquierda: { width: 40, height: 60, offset: vec2(5, 5) },
  frente: { width: 40, height: 60, offset: vec2(5, 5) },
  dañoIzq: { width: 40, height: 60, offset: vec2(5, 5) },
  dañoDer: { width: 40, height: 60, offset: vec2(5, 5) },
  dañoFrente: { width: 40, height: 60, offset: vec2(5, 5) },
};

// Áreas de colisión de la espada
const areasEspada = {
  derecha: { width: 60, height: 110, offset: vec2(128, 40) },
  izquierda: { width: 60, height: 110, offset: vec2(0, 40) },
  frente: { width: 85, height: 70, offset: vec2(50, 0) },
};

// Escena principal
scene('juego', () => {
  // Fondo
  add([sprite('fondo', { width: 1490, height: 805 }), pos(0, 0)]);

  // Link
  const link = add([
    sprite('LinkStay'),
    pos(width() / 2.28, height() / 1.7),
    area(),
    'Link',
    { estado: 'quieto', vivo: true },
  ]);

  // Rectángulos para áreas de colisión visibles
  const colisionVisual = add([rect(40, 60), pos(link.pos), outline(20, YELLOW), z(1), opacity(0.5)]);

  const espada = add([rect(20, 20), pos(link.pos), outline(20, RED), area(), 'espada']);

  // Actualizar colisión de Link y espada
  function actualizarColisionLink(estado) {
    const colisionLink = areasColision[estado];
    if (colisionLink) {
      link.area.width = colisionLink.width;
      link.area.height = colisionLink.height;
      link.area.offset = colisionLink.offset;
      colisionVisual.width = colisionLink.width;
      colisionVisual.height = colisionLink.height;
      colisionVisual.pos = link.pos.add(colisionLink.offset);
    }

    const colisionEspada = areasEspada[estado];
    if (colisionEspada) {
      espada.width = colisionEspada.width;
      espada.height = colisionEspada.height;
      espada.pos = link.pos.add(colisionEspada.offset);
      espada.opacity = 0.5;
      espada.area.enabled = true; // Activar área de colisión de la espada
    } else {
      espada.opacity = 0;
      espada.area.enabled = false; // Desactivar área de colisión de la espada
    }
  }

  // Actualización de posición
  link.onUpdate(() => {
    const offsetLink = areasColision[link.estado]?.offset || vec2(0, 0);
    colisionVisual.pos = link.pos.add(offsetLink);
    const offsetEspada = areasEspada[link.estado]?.offset || vec2(0, 0);
    espada.pos = link.pos.add(offsetEspada);
  });

  // Cambiar sprites
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
    if (!link.vivo) return;
    link.use(sprite(sprites[estado]));
    link.estado = estado;
    actualizarColisionLink(estado);

    if (estado === 'frente' || estado === 'derecha' || estado === 'izquierda') {
      espada.area.enabled = true; // Activar el área de la espada
      wait(0.5, () => {
        espada.area.enabled = false; // Desactivar después de un ataque
      });
    }

    if (volverAQuieto) {
      wait(0.4, () => {
        if (link.estado === estado) cambiarSprite('quieto', false);
      });
    }
  }

  // Controles
  onKeyPress('right', () => cambiarSprite('derecha'));
  onKeyPress('left', () => cambiarSprite('izquierda'));
  onKeyPress('up', () => cambiarSprite('frente'));

  // Generar pulpos
  function generarPulpo() {
    const dir = choose([
      { x: 0, y: rand(0, height()) },
      { x: width(), y: rand(0, height()) },
      { x: rand(0, width()), y: 0 },
    ]);

    const pulpo = add([
      sprite('Pulpo'),
      pos(dir.x, dir.y),
      area({ width: 110, height: 110 }),
      outline(2, RED),
      z(1),
      opacity(0.5),
      'Pulpo',
      { vivo: true, spriteFrame: 0, dañó: false },
    ]);

    // Visualizar el área de colisión del pulpo
    const pulpoAreaVisual = add([
      rect(110, 110),
      pos(pulpo.pos),
      outline(2, BLUE),
      z(1),
      opacity(0.5),
    ]);

    const velocidad = 50;
    const direccion = vec2(width() / 2, height() / 2).sub(pulpo.pos).unit();

    loop(0.3, () => {
      if (pulpo.vivo) {
        pulpo.use(sprite(pulpo.spriteFrame === 0 ? 'Pulpodos' : 'Pulpo'));
        pulpo.spriteFrame = 1 - pulpo.spriteFrame;
      }
    });

    pulpo.onUpdate(() => {
      if (pulpo.vivo) {
        pulpo.move(direccion.scale(velocidad));
        pulpoAreaVisual.pos = pulpo.pos;
      }
    });

    // Detectar colisión con la espada
    pulpo.onCollide('espada', () => {
      if (pulpo.vivo && espada.area.enabled) {
        pulpo.vivo = false;
        pulpo.use(sprite('PulpoDaño')); // Cambiar a sprite de daño
        wait(0.2, () => {
          pulpo.use(sprite('PulpoPolvo')); // Cambiar a sprite de "destrucción"
          wait(0.2, () => {
            destroy(pulpo);
            destroy(pulpoAreaVisual); // Eliminar el área de colisión visual
          });
        });
      }
    });

    // Detectar colisión con Link
    pulpo.onCollide('Link', () => {
      if (pulpo.vivo && !pulpo.dañó) {
        pulpo.dañó = true; // Asegurar que solo haga daño una vez
        cambiarSprite('dañoFrente');
        wait(0.4, () => cambiarSprite('quieto', false));
      }
    });
  }

  // Crear pulpos a intervalos
  loop(2, generarPulpo);
});

// Iniciar escena
go('juego');