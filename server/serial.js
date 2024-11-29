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
		const io = getIO(); // Obtiene la instancia de Socket.IO

		if (data.trim() === 'ESPADA LEVANTADA') {
			io.emit('tvScreenChanged', { screen: 'instructionsScreen' });
			console.log('Evento emitido: tvScreenChanged');
		} else if (data.trim() === 'ESPADA SENTADA') {
			io.emit('finish', { screen: '/' });
			console.log('Evento emitido: finish');
		}
	});

	// Manejar errores en el puerto serial
	port.on('error', (err) => {
		console.error('Error en el puerto serial:', err.message);
	});
};

module.exports = { initSerial };
