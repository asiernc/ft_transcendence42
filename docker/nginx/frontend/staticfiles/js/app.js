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

function handleRoute() {
    const path = window.location.pathname;
    const view = routes[path] || (() => '<h1>404 Not Found</h1>');
    document.getElementById('app').innerHTML = view();
}

function navigateTo(path) {
    window.history.pushState({}, path, path);
    handleRoute();
}

window.addEventListener('load', () => {
        navigateTo('/home');
});
window.addEventListener('popstate', handleRoute);

export { navigateTo };