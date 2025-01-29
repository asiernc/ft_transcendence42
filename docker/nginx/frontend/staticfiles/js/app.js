import { HomeView } from './views/HomeView.js';
import { LoginView } from './views/LoginView.js';

const routes = {
	'/': HomeView,
    '/login': LoginView,
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

window.addEventListener('load', handleRoute);
window.addEventListener('popstate', handleRoute);

export { navigateTo }