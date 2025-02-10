export default class Login42Component extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });

		const style = document.createElement('style');
		style.textContent = `
			.home-container {
				max-width: 600px;
				margin: 50px auto;
				padding: 20px;
				text-align: center;
				box-shadow: 0 0 10px rgba(0,0,0,0.1);
				font-family: Arial, sans-serif;
			}
			button {
				padding: 10px 20px;
				background: #007bff;
				color: white;
				border: none;
				border-radius: 4px;
				cursor: pointer;
				transition: background 0.3s;
			}
			button:hover {
				background: #0056b3;
			}
		`;

		const div = document.createElement('div');
		div.innerHTML = `
			<div class="home-container">
				<h1>Welcome to the Home Page</h1>
				<button id="login42">
                    Login with 42
                </button>
				<p>You are logged in!</p>
			</div>
		`;
		shadow.appendChild(style);
		shadow.appendChild(div);

		this.attachListeners();
	}

	attachListeners() {
		const button = this.shadowRoot.querySelector('#login42');
		if (button) {
			button.addEventListener('click', () => {
				const loginUrl = 'https://localhost:3042/api/login42/';
				window.location.href = loginUrl;
			});
		}
	}
}


// Preferred for modules and cross-environment code
window.customElements.define('login-42', Login42Component);
