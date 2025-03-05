import { navigateTo } from "../app.js";

export default class NavbarComponent extends HTMLElement {
	constructor() {
		super();

        const shadow = this.attachShadow({ mode: 'open' });

		// if (window.location.pathname == '/')
		// 	return;
		// NECESITAMOS QUE NO APAREZCA EN LANDING

		const style = document.createElement('style');
        style.textContent = `
			.nav_bar{
				position: fixed;
				display: grid;
				background-color: rgba(217, 217, 217, 0.548);
				padding: 10px;
				border-radius: 0px 3px 3px 0px;
				top: 50%;
				transform: translateY(-50%);
				left: 0px;
			}
			.fa {
				padding: 5px;
				font-size: 35px;
				width: 40px;
				margin-top: 10px;
				margin-bottom: 10px;
				text-align: center;
				line-height: 45px;
				text-decoration: none;
				vertical-align: middle;
				transition: all 0.2s;
				color: rgba(0, 0, 0, 0.402);
				cursor: pointer;
			}
			.fa:hover {
				opacity: 0.7;
				transform: scale(1.2);
			}
        `;
		

        const div = document.createElement('div');
        div.innerHTML = `
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fa" id="home">
				<title>Leaderboard</title>
				<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#000000"></path> </g></svg>
			</svg>
			<svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="fa" id="profile">
				<title>Profile</title>
				<path d="M7.21895,1.5621c1.5621,1.5621 1.5621,4.09476 0,5.65685c-1.5621,1.5621 -4.09476,1.5621 -5.65685,0c-1.5621,-1.5621 -1.5621,-4.09476 -8.88178e-16,-5.65685c1.5621,-1.5621 4.09476,-1.5621 5.65685,-8.88178e-16" transform="translate(3.60948, -0.390524)"></path>
				<path d="M13.1357,2.46387c-3.64648,-2.46387 -8.625,-2.46387 -12.2715,0c-0.541016,0.365234 -0.864258,0.982422 -0.864258,1.65137v3.46582h14v-3.46582c0,-0.668945 -0.323242,-1.28613 -0.864258,-1.65137Z" transform="translate(1, 8.41895)"></path>
			</svg>
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fa" id="play">
				<title>Play</title>
				<path d="M5.018,12.088l12.892,12.1-1.968,2.1,5.77,5.77L24,29.91l2.288,2.148,5.77-5.77L12.088,5.018a.963.963,0,0,0-.62-.3l-6.36-.71a.983.983,0,0,0-1.1,1.1l.71,6.36A.963.963,0,0,0,5.018,12.088Z"></path><path d="M43.967,39.8a2.479,2.479,0,0,0-1.36-1.84l-.36-.17a3.423,3.423,0,0,1-.8-.58l-4.5-4.5-4.24,4.24,4.49,4.49a3.249,3.249,0,0,1,.57.78l.2.4a2.456,2.456,0,0,0,1.83,1.35,2.693,2.693,0,0,0,.4.03,2.505,2.505,0,0,0,1.77-.73l1.3-1.3A2.5,2.5,0,0,0,43.967,39.8Z"></path><path d="M36.244,26.344a1,1,0,0,0-1.415,0l-8.485,8.485a1,1,0,0,0,0,1.415,3,3,0,0,0,4.243,0l5.657-5.657A3,3,0,0,0,36.244,26.344Z"></path><path d="M42.982,12.088a.963.963,0,0,0,.3-.62l.71-6.36a.983.983,0,0,0-1.1-1.1l-6.36.71a.963.963,0,0,0-.62.3L25.372,16.244l6.176,6.579Z"></path><path d="M6.553,37.21a3.423,3.423,0,0,1-.8.58l-.36.17a2.5,2.5,0,0,0-.66,4.01l1.3,1.3A2.505,2.505,0,0,0,7.8,44a2.693,2.693,0,0,0,.4-.03,2.456,2.456,0,0,0,1.83-1.35l.2-.4a3.249,3.249,0,0,1,.57-.78l4.49-4.49-4.24-4.24Z"></path><path d="M13.171,26.344a1,1,0,0,0-1.415,0,3,3,0,0,0,0,4.243l5.657,5.657a3,3,0,0,0,4.243,0,1,1,0,0,0,0-1.415Z"></path>
			</svg>
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fa" id="leaderboard">
				<title>Leaderboard</title>
				<path class="cls-1" d="M32,30h10c1.105,0,2,.895,2,2v14c0,1.105-.895,2-2,2h-10v-18Z"></path><path class="cls-1" d="M6,24h10v24H6c-1.105,0-2-.895-2-2v-20c0-1.105.895-2,2-2Z"></path><path class="cls-1" d="M20,18h8c1.105,0,2,.895,2,2v28h-12v-28c0-1.105.895-2,2-2Z"></path><path class="cls-1" d="M27.977,9h.023c2.481,0,4.5-2.019,4.5-4.5,0-1.379-1.122-2.5-2.5-2.5h-1V.9c0-.497-.403-.9-.9-.9h-8.2c-.497,0-.9.403-.9.9v1.1h-1c-1.378,0-2.5,1.121-2.5,2.5,0,2.481,2.019,4.5,4.5,4.5h.023c.619.819,1.481,1.439,2.477,1.758v1.242c0,.552-.448,1-1,1h-.5c-1.377,0-2.493,1.112-2.5,2.487-.001.279.22.513.5.513h10c.28,0,.501-.233.5-.513-.007-1.375-1.123-2.487-2.5-2.487h-.5c-.552,0-1-.448-1-1v-1.242c.997-.319,1.859-.94,2.477-1.758ZM29,6v-2h1c.276,0,.5.225.5.5,0,1.054-.658,1.953-1.583,2.32.045-.268.083-.539.083-.82ZM17.5,4.5c0-.275.224-.5.5-.5h1v2c0,.281.038.552.083.82-.925-.367-1.583-1.266-1.583-2.32Z"></path><rect class="cls-1" x="36" y="7" width="4" height="2" rx="1" ry="1"></rect><rect class="cls-1" x="8" y="7" width="4" height="2" rx="1" ry="1"></rect><rect class="cls-1" x="36.156" y="10.788" width="2" height="4" rx="1" ry="1" transform="translate(12.431 43.329) rotate(-70)"></rect><rect class="cls-1" x="9.844" y="1.212" width="2" height="4" rx="1" ry="1" transform="translate(4.117 12.304) rotate(-70)"></rect><rect class="cls-1" x="35.156" y="2.212" width="4" height="2" rx="1" ry="1" transform="translate(1.142 12.902) rotate(-20)"></rect><rect class="cls-1" x="8.844" y="11.788" width="4" height="2" rx="1" ry="1" transform="translate(-3.72 4.48) rotate(-20)"></rect>
			</svg>
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fa" id="logout">
				<title>Log out</title>
				<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M25.229,14.5l-16.003,0c-0.828,-0 -1.5,0.672 -1.5,1.5c-0,0.828 0.672,1.5 1.5,1.5l16.038,0l-3.114,3.114c-0.585,0.585 -0.585,1.536 0,2.121c0.586,0.586 1.536,0.586 2.122,0c-0,0 2.567,-2.567 4.242,-4.242c1.367,-1.367 1.367,-3.583 0,-4.95l-4.242,-4.243c-0.586,-0.585 -1.536,-0.585 -2.122,0c-0.585,0.586 -0.585,1.536 0,2.122l3.079,3.078Z"></path><path d="M20,24l-0,-4.5l-10.774,0c-1.932,-0 -3.5,-1.568 -3.5,-3.5c-0,-1.932 1.568,-3.5 3.5,-3.5l10.774,0l-0,-4.5c-0,-2.761 -2.239,-5 -5,-5c-2.166,-0 -4.834,0 -7,-0c-1.326,-0 -2.598,0.527 -3.536,1.464c-0.937,0.938 -1.464,2.21 -1.464,3.536c-0,4.439 -0,11.561 0,16c-0,1.326 0.527,2.598 1.464,3.536c0.938,0.937 2.21,1.464 3.536,1.464c2.166,0 4.834,0 7,0c1.326,0 2.598,-0.527 3.536,-1.464c0.937,-0.938 1.464,-2.21 1.464,-3.536Z"></path></g></svg>
			</svg>
        `;
		shadow.appendChild(style);
        div.className = 'nav_bar';
		shadow.appendChild(div);
        this.attachListeners();
	}

    attachListeners() {
		this.profile = this.shadowRoot.getElementById('profile');
        this.profile.addEventListener('click', () => {
            navigateTo("/profile");
        });
        this.play = this.shadowRoot.getElementById('play');
        this.play.addEventListener('click', () => {
            navigateTo('/play');
        });
        this.leaderboard = this.shadowRoot.getElementById('leaderboard');
        this.leaderboard.addEventListener('click', () => {
            navigateTo("/leaderboard");
        });
        this.home = this.shadowRoot.getElementById('home');
        this.home.addEventListener('click', () => {
            navigateTo('/home');
        });
		this.logout = this.shadowRoot.getElementById('logout');
        this.logout.addEventListener('click', () => {
            this.logout();
        });
	}

	async logout(){
		let resp = fetch('api/logout', {method: 'GET'});
		console.log(resp);
	}
	
	disconnectedCallback() {
        this.profile.removeEventListener('click', this);
        this.play.removeEventListener('click', this);
        this.leaderboard.removeEventListener('click', this);
        this.home.removeEventListener('click', this);
        this.logout.removeEventListener('click', this);
	}
}

window.customElements.define('navbar-component', NavbarComponent);