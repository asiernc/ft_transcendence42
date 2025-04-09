import { HomeView } from "./views/HomeView.js";
import { LoginView } from "./views/LoginView.js";
import { RegisterView } from "./views/RegisterView.js";
import { OTPView } from "./views/OTPView.js";
import { PlayView } from "./views/PlayView.js";
import { OptionsGameView } from "./views/OptionsGameView.js";
import { GameView } from "./views/GameView.js";
import { OptionsTournamentView } from "./views/OptionsTournament.js";
import { OptionsAliasView } from "./views/OptionsAlias.js";
import { handleCallback } from "./components/handle_callback.js";
import { ProfileView } from "./views/ProfileView.js";
import { ProfileEditView } from "./views/ProfileEditView.js";
import { LeaderboardView } from "./views/LeaderboardView.js";
import { AboutUsView } from "./views/AboutUsView.js";
import { LandingView } from "./views/LandingView.js";
import { TournamentComponentView } from "./views/TournamentView.js";

// creo que no deberiamos alojar las cookies en el localstorage,
// como las estamos seteando en el navegador, podemos hacer lo
// que ya hicimos de una funcion en cuando entre en el gateway
// que se llame get cookies y nos la guardamos como variable en
// el frontent, pero no en el local

let ws = null;

function connectWebSocket(username) {
	ws = new WebSocket(`wss://localhost:3042/ws/friends/${username}/`);

	ws.onopen = function (event) {
		
	};

	ws.onclose = function (event) {
		//logout
		localStorage.clear();
		
	};

	ws.onerror = function (event) {
		
	};

	ws.onmessage = function (event) {
		const data = JSON.parse(event.data);
		
		if (data.type === "message") {
			// todos los componentes salvo el juego (no queremos notificaciones mientras estamos jugando?)
			// mostrar x amigo se ha conectado, x amigo se ha desconectado
			displayMessage(data.from, data.message);
		} else if (data.type === "status") {
			// cambiar color boton
			console.log("SOCKEEEEEEEEEEEET");
			displayStatus(data.message);
		}
	};

	window.addEventListener("beforeunload", function () {
		ws.close();
	});
}

function closeWebSocket()
{
	if (ws)
		ws.close();
}

function displayMessage(from, message) {
	// los componentes tendran que tener un div para mostrar el mensaje( supongo que solo sera en la ventana/compon de profile)
	const messageContainer = document.getElementById("messages");
	const messageElement = document.createElement("div");
	messageElement.className = "message";
	messageElement.innerHTML = `<strong>${from}:</strong> ${message}`;
	messageContainer.appendChild(messageElement);
}

const routes = {
	"/": LandingView,
	"/home": HomeView,
	"/login": LoginView,
	"/register": RegisterView,
	"/otp": OTPView,
	"/play": PlayView,
	"/options_game": OptionsGameView,
	"/game": GameView,
	"/options_tournament": OptionsTournamentView,
	"/options_alias": OptionsAliasView,
	"/tournament": TournamentComponentView,
	"/callback": handleCallback,
	"/profile": ProfileView,
	"/profile_edit": ProfileEditView,
	"/leaderboard": LeaderboardView,
	"/about_us": AboutUsView,
};

function handleRoute() {
	let path = window.location.pathname;
	const access_token = localStorage.getItem("access_token");
	const refresh_token = localStorage.getItem("refresh_token");

	if (path == "/callback") {
		handleCallback();
		return;
	}

	if (!access_token && !refresh_token) {
		if (
			path !== "/login" &&
			path !== "/register" &&
			path !== "/otp" &&
			path !== "/"
		) {
			navigateTo("/login");
			return;
		}
	} else {
		const username = localStorage.getItem('username');
		if (!ws && username)
			connectWebSocket(username);
		if (path === '/login' || path === '/register') {
			navigateTo('/home');
			return ;
		}
	}

	if (path == "/profile" || path == "/profile/") {
		navigateTo("/profile/" + localStorage.getItem("username"));
		return;
	} else if (path.startsWith("/profile/")) {
		document.getElementById("app").innerHTML = ProfileView();
		return;
	}
	const view =
		routes[path] ||
		(() => "<navbar-component></navbar-component><h1>404 Not Found</h1>");
	document.getElementById("app").innerHTML = view();

}

function navigateTo(path) {
	window.history.pushState({}, path, path);
	handleRoute();
}

window.addEventListener("load", handleRoute);
window.addEventListener("popstate", handleRoute);

export { navigateTo, closeWebSocket };
