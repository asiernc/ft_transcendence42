import { HomeView } from './views/HomeView.js';
import { LoginView } from './views/LoginView.js';
import { RegisterView } from './views/RegisterView.js';
import { OTPView } from './views/OTPView.js';
import { PlayView } from './views/PlayView.js';
import { OptionsGameView } from './views/OptionsGameView.js';
import { GameView } from './views/GameView.js'

const routes = {
	'/home': HomeView,
    '/login': LoginView,
    '/register': RegisterView,
    '/otp': OTPView,
    '/play': PlayView,
    '/options_game': OptionsGameView,
    '/game': GameView,
};

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

function handleRoute() {
    const path = window.location.pathname;
	const access_token = localStorage.getItem('access_token');
	const refresh_token = localStorage.getItem('refresh_token');
	console.log(access_token)

	if (!access_token && !refresh_token) {
		if (path !== '/login' && path !== '/register' && path !== '/otp') {
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
}

function navigateTo(path) {
    window.history.pushState({}, path, path);
    handleRoute();
}

window.addEventListener('load', handleRoute);
window.addEventListener('popstate', handleRoute);

export { navigateTo };