const { SerialPort, ReadlineParser } = require('serialport');
const { getIO } = require('./socket'); // Importar la función para obtener la instancia de Socket.IO

// Configuración del puerto serial
const port = new SerialPort({
	path: 'COM8', // Asegúrate de que el puerto sea el correcto
	baudRate: 9600,
});

// Crear el parser para leer los datos
const parser = new ReadlineParser({ delimiter: '\r\n' });
port.pipe(parser); // Conecta el parser al puerto serial

// Inicializar el puerto serial
const initSerial = () => {
	// Escuchar los datos que llegan desde el Arduino
	parser.on('data', (data) => {
		console.log('Datos recibidos del Arduino:', data); // Verifica que recibimos los datos correctamente

		// Si el Arduino envía "ESPADA LEVANTADA", emitir un evento a través de Socket.IO
		if (data.trim() === 'ESPADA LEVANTADA') {
			const io = getIO(); // Obtiene la instancia de Socket.IO
			io.emit('tvScreenChanged', { screen: 'instructionsScreen' });
			console.log('Evento emitido: tvScreenChanged');
		}
	});

	// Manejar errores en el puerto serial
	port.on('error', (err) => {
		console.error('Error en el puerto serial:', err.message);
	});
};

module.exports = { initSerial };
