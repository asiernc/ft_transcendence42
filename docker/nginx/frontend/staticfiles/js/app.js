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

let ws;

function connectWebSocket(username) {
	ws = new WebSocket(`wss://127.0.0.1:3042/ws/friends/${username}/`);

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

/* 	window.addEventListener('beforeunload', function() {
		ws.close();
	}) */
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