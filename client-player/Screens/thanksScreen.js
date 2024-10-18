import { router, socket } from '../routes.js';

export default function renderScreen3() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <h1>Thanks for playing!</h1>
    <p>We sent you and email, please check it to claim your prize!</p>
     <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/01554fca-1849-4572-8deb-9317c3b7c3c0/dfn6nnz-93560c7d-2c8d-438f-838f-82518a748569.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAxNTU0ZmNhLTE4NDktNDU3Mi04ZGViLTkzMTdjM2I3YzNjMFwvZGZuNm5uei05MzU2MGM3ZC0yYzhkLTQzOGYtODM4Zi04MjUxOGE3NDg1NjkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5eJL76AtiVsXikZVN9GDseXAct_04pzYIxLZxGgaLKo" alt="LinkDance"/>

    <button id="finish">Finish</button>
     `;

  document.getElementById('finish').addEventListener('click', () => {
    // Emitir el evento changeScreen al servidor

    router.navigateTo('/conectionPhone');

	});
}