const { createServer } = require("http");
require("dotenv/config");

const app = require("./app.js");
const { initSocket } = require("./socket.js");
const { initSerial } = require("./serial.js"); // Importar la inicialización del serial

const httpServer = createServer(app); // Crea un servidor HTTP a partir de la app de Express

// Inicializar Socket.IO
initSocket(httpServer);

// Inicializar la comunicación con Arduino
initSerial();

// Iniciar el servidor
httpServer.listen(5050, () => {
  console.log("Servidor corriendo 🚀 en http://localhost:5050");
});
