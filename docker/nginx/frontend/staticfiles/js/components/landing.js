import { navigateTo } from '../app.js';

export default class LandingComponent extends HTMLElement {
	constructor() {
		super();

		const style = document.createElement('style');
        style.textContent = `
			body {
				overflow-y: hidden;
			}
			.bg {
				height: fit-content;
				width: 100vw;
				margin: 0;
				overflow-x: hidden;
				overflow-y: hidden;
			}

			.general-container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-content: center;
			}

			.pixel-font {
				color: inherit;
				text-decoration: none;
				font-family: "Press Start 2P";
			}


			.container_showcase {
				position: relative;
				.container-text {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: flex-start;
					width: 100vw;
					text-align: center;
					height: 100vh;
					margin-top: 7%;
				}
				.showcase{
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					width: 100%;
					h1{
						color: #fff;
						font-size: 4rem;
						margin-bottom: 0;
						font-weight: 700;
						margin-bottom: 1rem;
					}
					p{
						margin-top: 0;
						color: #fff;
						font-weight: 500;
						line-height: 1.4;
						font-size: 1.2rem;
						width: 50rem;
					}
				}
				.video-container{
					z-index: -1;
					position: absolute;
					top: 0;
					left: 0;
					height: 100vh;
					width: 100vw;
					video{
						height: 100%;
						width: 100%;
						object-fit: cover;
					}
					&::after{
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						height: 100%;
						width: 100%;
						background-color: rgba(0,0,0,0.82);
					}
				}
			}


			[class*="push"] {
				position: relative;
				display: inline-block;
				width: 240px;
				height: 240px;
				border: 0;
				margin: 1em;
				outline: none;
				background-color: hsl(10, 90%, 40%);
				border-radius: 50%;
				cursor: pointer;
				transition: box-shadow 200ms;
			}
			
			.push--flat {
				box-shadow: 
				inset 0 7.5px 0 hsl(10, 90%, 45%),
				inset 0 -7.5px 0 hsl(10, 90%, 35%),
				inset 0 0 0 7.5px hsl(10, 90%, 37%),
				inset 0 0 0 20px hsl(10, 90%, 40%),
				inset 0 0 0 24px hsl(10, 90%, 20%),
				inset 0 0 0 26px hsl(10, 90%, 10%),
				inset 0 0 0 32px rgba(252, 108, 100, 0.7),
				inset 0 0 0 43.5px hsl(10, 90%, 40%),
				inset 0 96px 32px hsl(10, 90%, 35%),
				inset 0 0 24px 40px hsl(10, 90%, 30%),
				0 12px 0 rgba(0, 0, 0, 0.3);
			}
			
			.push--flat::after {
				content: '';
				position: absolute;
				bottom: 12px;
				left: 24px;
				display: block;
				width: 192px;
				height: 192px;
				border: 16px solid rgba(0, 0, 0, 0.3);
				border-width: 0 0 16px;
				border-radius: 50%;
				transition-duration: 200ms;
			}
			
			.push--flat:active,
			.push--flat.is-pushed {
				box-shadow: 
				inset 0 7.5px 0 hsl(10, 90%, 45%),
				inset 0 -7.5px 0 hsl(10, 90%, 35%),
				inset 0 0 0 7.5px hsl(10, 90%, 37%),
				inset 0 0 0 20px hsl(10, 90%, 40%),
				inset 0 0 0 24px hsl(10, 90%, 20%),
				inset 0 0 0 28px hsl(10, 90%, 15%),
				inset 0 0 0 32px rgba(252, 108, 100, 0.2),
				inset 0 0 0 43.5px hsl(10, 90%, 37%),
				inset 0 96px 32px hsl(10, 90%, 32%),
				inset 0 0 24px 40px hsl(10, 90%, 25%),
				0 12px 0 rgba(0, 0, 0, 0.3);
				background-color: hsl(10, 90%, 38%);
			}
        `;

		const div = document.createElement('div');
		div.innerHTML = `
			<div class="container_showcase pixel-font" style="text-align: center;">
				<div class="showcase">
					<div class="container-text">
						<h1>FT_TRANSCENDENCE</h1>
						<p>
							We are the team from 42Barcelona who developed this ft_transcendence, a full-stack web application as part of our learning journey. We hope you enjoy it.
						</p>
						<p>PUSH TO PLAY!</p>
						<button id="start-btn" class="push--flat"></button>
					</div>
				</div>
				<div class="video-container">
					<video src="./staticfiles/js/utils/images/42_Barcelona.mp4" autoplay loop muted></video>
				</div>
			</div>
		`;

		this.appendChild(style);
        div.className = 'bg';
		this.appendChild(div);

		this.attachListeners();
	}

	attachListeners() {
		document.getElementById('start-btn').addEventListener('click', () => {
			navigateTo('/home');
		});
    }
}

window.customElements.define('landing-component', LandingComponent);