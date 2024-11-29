import { router, socket } from '../routes.js';

export default function renderScreen6() {
	const app = document.getElementById('app');
	app.innerHTML = `
  <section id='fondoSword'>

  <section id='swordtry'>
    <section id='swordtry1'>
      <h1 id ='titleswordtry'>Controls!</h1>
      <p>You wil have to move your the sword in the correct direction to defeat the enemies!</p>
    </section>

    <section id='swordtry2'>
      <div id='cajita'>
      <img id='linkControl' src='https://pbs.twimg.com/media/GdjCGFWXAAAKwTQ?format=png&name=small'/>
      <h2 id='h2try'>Left</h2>
      </div>

      <div id='cajita'>
      <img id='linkControl' src='https://pbs.twimg.com/media/GdjCEIJWwAASUDR?format=png&name=small'/>
      <h2 id='h2try'>Forward</h2>
      </div>

      <div id='cajita'>
      <img id='linkControl' src='https://pbs.twimg.com/media/GdjCByNWcAAPPat?format=png&name=small'/>
      <h2 id='h2try'>Right</h2>
      </div>
    </section>
  </section>

  </section>

  `;
  socket.on('thirdRupeeScreenChanged', (data) => {
    if (data.screen === 'loadingScreen') {
        router.navigateTo('/loadingScreen');
    }
});
}
