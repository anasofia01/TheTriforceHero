import { router, socket } from "../routes.js"; // Importamos el router y socket

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Welcome Hero of Hyrule!</h1>
    <img id='sword' src="https://pbs.twimg.com/media/GaINbJFXUAAchZU?format=jpg&name=large" alt="Master Sword" />
    <h2>Raise the Master Sword to Continue</h2>
  `;

  // Escuchar el evento de cambio de pantalla
  socket.on("tvScreenChanged", (data) => {
    console.log("Evento recibido:", data); // Esto va a la consola del navegador
    if (data.screen === "instructionsScreen") {
      console.log("Cambiando de pantalla a instrucciones");
      router.navigateTo("/instructionsScreen"); // Cambiar de pantalla
    }
  });
}
