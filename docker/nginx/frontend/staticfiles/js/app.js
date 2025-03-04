import { HomeView } from './views/HomeView.js';
import { LoginView } from './views/LoginView.js';
import { RegisterView } from './views/RegisterView.js';
import { OTPView } from './views/OTPView.js';
import { PlayView } from './views/PlayView.js';
import { OptionsGameView } from './views/OptionsGameView.js';
import { GameView } from './views/GameView.js';
import { OptionsTournamentView } from './views/OptionsTournament.js';
import { OptionsAliasView } from './views/OptionsAlias.js';
import { handleCallback } from './components/handle_callback.js'
import { AboutUsView } from './views/AboutUsView.js';
import { LandingView } from './views/LandingView.js';

// creo que no deberiamos alojar las cookies en el localstorage,
// como las estamos seteando en el navegador, podemos hacer lo 
// que ya hicimos de una funcion en cuando entre en el gateway 
// que se llame get cookies y nos la guardamos como variable en
// el frontent, pero no en el local

let ws;

function connectWebSocket(username) {
	ws = new WebSocket(`wss://localhost:3042/ws/friends/${username}/`);

	ws.onopen = function(event) {
		console.log("Websocket is connected.")
	}

	ws.onclose = function(event) {
		//logout
		console.log("Websocket is closed.")
	};

	ws.onerror = function(event) {
		console.log("Websocket error: ", event);
	};

	ws.onmessage = function(event) {
		const data = JSON.parse(event.data);
		console.log("Websocket message received: ", data);
		if ( data.type === "message" ) {
			// todos los componentes salvo el juego (no queremos notificaciones mientras estamos jugando?)
			// mostrar x amigo se ha conectado, x amigo se ha desconectado
			displayMessage(data.from, data.message);
		} else if ( data.type === "status" ) {
			// cambiar color boton
			displayStatus(data.message)
		}
	}

 	window.addEventListener('beforeunload', function() {
		ws.close();
	})
}

function displayMessage(from, message) {
	// los componentes tendran que tener un div para mostrar el mensaje( supongo que solo sera en la ventana/compon de profile)
	const messageContainer = document.getElementById('messages');
	const messageElement = document.createElement('div');
	messageElement.className = 'message';
	messageElement.innerHTML = `<strong>${from}:</strong> ${message}`;
	messageContainer.appendChild(messageElement);
}

const routes = {
	'/': LandingView,
	'/home': HomeView,
    '/login': LoginView,
    '/register': RegisterView,
    '/otp': OTPView,
    '/play': PlayView,
    '/options_game': OptionsGameView,
    '/game': GameView,
	'/options_tournament': OptionsTournamentView,
	'/options_alias': OptionsAliasView,
	'/callback': handleCallback,
	'/about_us': AboutUsView,
};

function handleRoute() {
    let path = window.location.pathname;
	const access_token = localStorage.getItem('access_token');
	const refresh_token = localStorage.getItem('refresh_token');

	if (path == '/callback') {
		handleCallback();
		return ;
	}

	if (!access_token && !refresh_token) {
		if (path !== '/login' && path !== '/register' && path !== '/otp' && path !== '/') {
			navigateTo('/login');
			return ;
		}
	} else {
		if (path === '/login' || path === '/register') {
			navigateTo('/home');
			return ;
		}
	}

    const view = routes[path] || (() => '<h1>404 Not Found</h1>');
    document.getElementById('app').innerHTML = view();

	if (path == '/home') {
		const username = localStorage.getItem('username');
		connectWebSocket(username);
	}
}

function navigateTo(path) {
    window.history.pushState({}, path, path);
    handleRoute();
}

window.addEventListener('load', handleRoute);
window.addEventListener('popstate', handleRoute);


export { navigateTo };