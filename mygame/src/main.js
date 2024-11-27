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

// Áreas de colisión de Link
const areasColision = {
  quieto: { width: 75, height: 100, offset: vec2(55, 53) },
  derecha: { width: 75, height: 90, offset: vec2(50, 55) },
  izquierda: { width: 75, height: 90, offset: vec2(65, 55) },
  frente: { width: 75, height: 90, offset: vec2(55, 70) },
  dañoIzq: { width: 100, height: 100, offset: vec2(50, 50) },
  dañoDer: { width: 100, height: 100, offset: vec2(50, 50) },
  dañoFrente: { width: 100, height: 100, offset: vec2(50, 50) },
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
  add([
    sprite('fondo', { width: 1490, height: 805 }),
    pos(0, 0),
  ]);

  // Link
  const link = add([
    sprite('LinkStay'),
    pos(width() / 2.28, height() / 1.7),
    area(),
    outline(2, RED),
    opacity(1),
    'Link',
    { estado: 'quieto', vivo: true },
  ]);

// Rectángulos para áreas de colisión visibles
const colisionVisual = add([
  rect(100, 100),
  pos(link.pos),
  outline(2, YELLOW),
  z(1),
  opacity(0.5),
]);

// Área de la espada
const espada = add([
  rect(20, 20),
  pos(link.pos),
  outline(2, RED),
  area(),
  z(1),
  opacity(0),
  'espada',
]);

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
    espada.opacity = 0.5; // Hacer visible para depuración
    espada.area.enabled = true; // Activar área de colisión
  } else {
    espada.opacity = 0; // Ocultar el área
    espada.area.enabled = false; // Desactivar área de colisión
  }
}


// Actualización de posición
link.onUpdate(() => {
  const offsetLink = areasColision[link.estado]?.offset || vec2(0, 0);
  colisionVisual.pos = link.pos.add(offsetLink);
  const offsetEspada = areasEspada[link.estado]?.offset || vec2(0, 0);
  espada.pos = link.pos.add(offsetEspada); // Corregido aquí
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
// Generar pulpos
function generarPulpo() {
  const dir = choose([
    { x: 0, y: rand(0, height()) },
    { x: width(), y: rand(0, height()) },
    { x: rand(0, width()), y: 0 },
  ]);
  const pulpo = add([
    sprite('Pulpo'),
    outline(2, RED),
    pos(dir.x, dir.y),
    area(),
    'Pulpo',
    { vivo: true, spriteFrame: 0, dañó: false }, // Inicializa dañó en false
  ]);


  // Visualizar el área de colisión del pulpo
  const pulpoAreaVisual = add([
    rect(60, 60), // Tamaño del área de colisión (ajusta según sea necesario)
    pos(pulpo.pos),
    outline(2, BLUE), // Color del borde del área de colisión
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
      pulpoAreaVisual.pos = pulpo.pos; // Sincronizar posición del área visual con el pulpo
    }
  });

  pulpo.onCollide('Link', () => {
    if (pulpo.vivo && !pulpo.dañó) {
      pulpo.dañó = true; // Marca el pulpo como que ya infligió daño
      cambiarSprite('dañoFrente');
      wait(0.4, () => cambiarSprite('quieto', false));
    }
  });


  pulpo.onCollide('espada', () => {
    if (!espada.area.enabled) return; // Ignorar si el área de la espada no está activa
    debug.log("Colisión detectada entre pulpo y espada.");
    if (pulpo.vivo) {
      pulpo.vivo = false;
      pulpo.use(sprite('PulpoDaño'));
      wait(0.5, () => {
        pulpo.use(sprite('PulpoPolvo'));
        wait(0.5, () => destroy(pulpo));
        destroy(pulpoAreaVisual); // Eliminar el área visual cuando el pulpo desaparezca
      });
    }
  });
}




  loop(2, generarPulpo);
});

// Iniciar escena
go('juego');