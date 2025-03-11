import HomeComponent from "../components/home.js";
import NavbarComponent from "../components/navbar.js";

export function HomeView() {
	return `
			<navbar-component></navbar-component>
			<home-component></home-component>
	`;
}