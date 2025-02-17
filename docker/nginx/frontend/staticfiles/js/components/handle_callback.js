import { navigateTo } from '../app.js';
import { handleCallback } from '../utils/auth.js';

export default class HandleCallbackComponent extends HTMLElement {
	constructor() {
		super();

		const style = document.createElement('style');

		const div = document.createElement('div');
		div.innerHTML = `
		`;

		this.appendChild(style);
        div.className = 'bg';
		this.appendChild(div);

		handleCallback();
	}
	
}

window.customElements.define('handlecallback-component', HandleCallbackComponent);