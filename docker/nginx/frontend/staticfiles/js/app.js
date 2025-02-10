import { HomeView } from './views/HomeView.js';
import { LoginView } from './views/LoginView.js';
import { Login42View } from './views/Login42View.js';

const routes = {
	'/home': HomeView,
    '/login': LoginView,
	'/login42': Login42View,
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
        navigateTo('/login42');
});
window.addEventListener('popstate', handleRoute);

export { navigateTo };