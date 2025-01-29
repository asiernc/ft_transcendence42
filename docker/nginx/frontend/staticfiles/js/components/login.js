import { navigateTo } from '../app.js';

export default class LoginComponent extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });

		//const style = document.createElement('style');
		// i need to add the style.css here or only css directly in the html
		const style = document.createElement('style');
        style.textContent = `
            .login-container {
                max-width: 400px;
                margin: 50px auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .form-group {
                margin-bottom: 15px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
            }
            .form-group input {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            button {
                width: 100%;
                padding: 10px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            #message {
                color: red;
                margin-top: 10px;
            }
        `;

		const div = document.createElement('div');
		div.innerHTML = `
			<div class="login-container">
				<h1>Login</h1>
				<form id="loginForm">
					<div class="form-group">
						<label for="username">Username:</label>
						<input type="text" id="username" required>
					</div>
					<div class="form-group">
						<label for="password">Password:</label>
						<input type="password" id="password" required>
					</div>
					<button type="submit">Login</button>
				</form>
				<p id="message"></p>
			</div>
		`;
		shadow.appendChild(style);
		shadow.appendChild(div);

		this.attachListeners();
	}

	attachListeners() {
		this.shadowRoot.getElementById('loginForm').addEventListener('submit', async (e) => {
			e.preventDefault();
			
			const username = this.shadowRoot.getElementById('username').value;
			const password = this.shadowRoot.getElementById('password').value;

			try {
				const response = await fetch('/api/test/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ username, password })
				});

				const data = await response.json();

				if (response.ok) {
					document.cookie = `access_token=${data.token}; path=/`;
                    document.cookie = `refresh_token=${data.refresh}; path=/`;
                    navigateTo('/home');
				} else {
					this.shadowRoot.getElementById('message').textContent = data.error;
				}
			} catch (err) {
				this.shadowRoot.getElementById('message').textContent = 'An error occurred';
			}
		});
	}

	disconnectedCallback() {
		this.shadowRoot.getElementById('loginForm').removeEventListener('submit');
	}
}

// Preferred for modules and cross-environment code
window.customElements.define('login-component', LoginComponent);
