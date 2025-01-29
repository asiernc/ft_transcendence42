export default class HomeComponent extends HTMLElement {
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
            }
            button {
                padding: 10px 20px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
        `;

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="home-container">
                <h1>Welcome to the Home Page</h1>
                <p>You are logged in!</p>
            </div>
        `;
        shadow.appendChild(style);
        shadow.appendChild(div);
	}
}

// Preferred for modules and cross-environment code
window.customElements.define('home-component', HomeComponent);
