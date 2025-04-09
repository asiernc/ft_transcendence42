import { navigateTo } from '../app.js';

export default class LoginComponent extends HTMLElement {
	constructor() {
		super();

		const style = document.createElement('style');
		style.textContent = `
			.bg {
				display: flex;
				align-items: center;
				justify-content: center; 
				height: 100vh;
				width: 100vw;
				margin: 0;
				background: linear-gradient(-45deg, #31353C, #000000, #31353C, #000000);
				background-size: 400% 400%;
				animation: gradient 10s ease infinite;
				height: 100vh;
			}
			
			@keyframes gradient {
				0% {
					background-position: 0% 50%;
				}
				50% {
				background-position: 100% 50%;
				}
				100% {
					background-position: 0% 50%;
				}
			}
			
			.sidebar {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0;
				width: 5vw;
				height: 40vh;
				z-index: 1;
				background-color: #D9D9D9;
				border: 3px solid#31353C ;
				border-left: 0;
			}

			.general-poster {
				display: flex;
				flex-direction: column;
				align-content: center;
				justify-content: space-between;
				background-color: red;
				padding: 2vw;
				width: min-content;
				height: min-content;
				margin-top: 3vh;
				margin-bottom: 3vh;
				min-width: 50vw;
				background-color: #D9D9D9;
				border: 4px solid#31353C ;
			}

			.screw-container {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-content: center;
			}

			.form-container {
				height: min-content;
				width: min-content;
				margin: 2vw;
			}

			img {
				width: 30px;
				height: 30px;
			}
			
			label {
				font-size: 13px;
			}
				
			p {
				font-size: 13px;
			}

			.pixel-font {
				color: inherit;
				text-decoration: none;
				font-family: "Press Start 2P";
			}

			.title {
				font-size: 30px;
			}

			@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

			:root {
			--color-red: #ec1840;
			--color-purple: #7a18ec;
			--speed-normal: 0.5s;
			--speed-fast: 0.8s;
			}

			#a1 {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				width: 100%;
				height: 40px;
				letter-spacing: 2px;
				text-decoration: none;
				text-transform: uppercase;
				text-align: center;
				color: var(--color-white);
				transition: var(--speed-normal);
			}
			#a2 {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				width: 100%;
				height: 40px;
				letter-spacing: 2px;
				text-decoration: none;
				text-transform: uppercase;
				text-align: center;
				color: var(--color-white);
				transition: var(--speed-normal);
				font-size: 15px;
			}

			#login42 {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 40px;
				letter-spacing: 2px;
				text-decoration: none;
				text-transform: uppercase;
				text-align: center;
				border: 1px solid black;
			}

			svg {
				max-height: 100%;
				max-width: 100%;
			}

			#a1 {
				border: 1px solid var(--color-red);
			}
			#a1:hover {
				border: 1px solid transparent;
				background: var(--color-red) url(https://i.postimg.cc/wBXGXbWN/pixel.png);
				transition-delay: 0.8s;
				background-size: 180px;
				animation: animate var(--speed-fast) steps(8) forwards;
			}

			#a2 {
				border: 1px solid var(--color-purple);
			}
			#a2:hover {
				border: 1px solid transparent;
				background: var(--color-red) url(https://i.postimg.cc/wBXGXbWN/pixel.png);
				transition-delay: 0.8s;
				background-size: 180px;
				animation: animate var(--speed-fast) steps(8) forwards;
				background: var(--color-purple) url(https://i.postimg.cc/FzBWFtKM/pixel2.png);
			}

			@keyframes animate {
				0% {
				background-position-y: 0;
				}
				100% {
					background-position-y: -480px;
				}
			}

			.separator {
				width: 100%; 
				text-align: center; 
				border-bottom: 2px solid #31353C; 
				line-height: 0.1em;
				margin: 10px 0 20px;
			} 
			
			.separator span {
				background:#D9D9D9; 
				padding:0 10px; 
			}
		`;

		const div = document.createElement('div');
		div.innerHTML = `
			<div class="general-poster">
				<div class="screw-container">
					<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
					<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				</div>
				<div class="from-container m-4">
					<div class="d-flex justify-content-center align-items-center">
						<p class="pixel-font title">LOG IN</p>
					</div>
					<form>
						<div class="mb-3">
							<label for="name" class="form-label pixel-font">Username</label>
							<input type="name" class="form-control" id="name" name="name" required>
						</div>
				
						<div class="mb-3">
							<label for="password" class="form-label pixel-font">Password</label>
							<input type="password" class="form-control" id="password" name="password" required>
						</div>
				
						<div id="alert" style="display: none; height: 15px;" class="alert alert-danger mt-1 justify-content-center align-items-center" role="alert">
							Invalid Username or Password. Please try again.
						</div>
						<a id="a2" href="javascript:void(0);" type="submit" class="pixel-font">Log In</a>
						<a id="login42" class="mt-2" href="https://localhost:3042/api/login42">
							<svg version="1.1"id="Calque_1" sodipodi:docname="42_logo.svg" inkscape:version="0.48.2 r9819" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 -200 960 960"enable-background="new 0 -200 960 960" xml:space="preserve">
								<polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1 32,279.1 "/>
								<polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 "/>
								<polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 "/>
								<polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 "/>
							</svg>
						</a>
					</form>
					<div class="mt-3 pixel-font separator">
						<span class="d-none d-xl-inline" style="font-size: 12px;">Or if you are not registered</span>
					</div>
					<a id="a1" href="javascript:void(0);" class="pixel-font">Register</a>
				</div>
				<div class="screw-container">
					<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
					<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				</div>
			</div>
		`;
		this.appendChild(style);
		div.className = 'bg';
		this.appendChild(div);

		this.attachListeners();
	}

	attachListeners() {
		document.getElementById("a2").addEventListener("click", async function (e) {
			e.preventDefault();

			const alertMsg = document.getElementById("alert");
			alertMsg.style.display = "none";

			const form = document.querySelector("form");
	
			if (form.checkValidity())
			{
				const username = document.getElementById('name').value;
				const password = document.getElementById('password').value;
	
				try {
					
					const response = await fetch('/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ username, password })
					});
	
					
					if (response.ok) {
						const data = await response.json();
						localStorage.setItem("username", data.username);
						navigateTo('/otp');
					} else {
						alertMsg.style.display = "flex";
						const err_msg = await response.json()
							.catch( () => new Error( "Login was not succesful." ) );

				  		throw Error(err_msg);
					}
				}
				catch (err) {
					console.error(err);
				}
				
			} else {
				form.reportValidity();
			}
			
		});

		document.getElementById("a1").addEventListener("click", async function () {
			navigateTo("/register");
		});
	}

	disconnectedCallback() {
		this.querySelector("form").removeEventListener('submit', this);
		this.querySelectorAll("a").forEach( (e) => {e.removeEventListener('click', this)});
	}
}

window.customElements.define('login-component', LoginComponent);