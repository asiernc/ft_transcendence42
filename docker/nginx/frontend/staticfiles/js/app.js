import { LoginView } from './views/LoginView.js';

const routes = {
	'/': LoginView,
    '/login': LoginView,
};

function handleRoute() {
    const path = window.location.pathname;
    const component = routes[path] || LoginComponent;
    component.init();
}

window.addEventListener('load', handleRoute);
window.addEventListener('popstate', handleRoute);