import { router, socket } from "../routes.js"; // Importamos el router y socket

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
  <section id="sword-screen">
    <h1>Welcome Hero of Hyrule!</h1>
    <img id='sword' src="https://pbs.twimg.com/media/GdijLk3XIAAfquO?format=png&name=small" alt="Master Sword" />
    <h2>Raise the Master Sword to Continue</h2>
    </section>
  `;

  // Flag para garantizar que el evento solo se maneje una vez
  let eventHandled = false;

  socket.on("tvScreenChanged", (data) => {
    // Procesar el evento solo si no ha sido manejado previamente
    if (!eventHandled && data.screen === "instructionsScreen") {
      eventHandled = true; // Marcar el evento como manejado
      console.log("Evento recibido y procesado:", data); // Esto va a la consola del navegador
      console.log("Cambiando de pantalla a instrucciones");
      router.navigateTo("/instructionsScreen"); // Cambiar de pantalla
    }
  });
}


