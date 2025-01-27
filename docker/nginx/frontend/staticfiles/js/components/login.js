export default class LoginComponent extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });

		//const style = document.createElement('style');
		// i need to add the style.css here or only css directly in the html

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
		shadow.appendChild(div);

		this.attachListeners();
	}

	attachListeners() {
		this.shadowRoot.getElementById('loginForm').addEventListener('submit', async (e) => {
			e.preventDefault();
			
			const username = this.shadowRoot.getElementById('username').value;
			const password = this.shadowRoot.getElementById('password').value;

			try {
				const response = await fetch('/api/login/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ username, password })
				});

				const data = await response.json();

				if (response.ok) {
					// Store token in localStorage
					localStorage.setItem('token', data.token);
					localStorage.setItem('refresh', data.refresh);
					// Redirect to dashboard or home
					window.location.href = '/dashboard';
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
