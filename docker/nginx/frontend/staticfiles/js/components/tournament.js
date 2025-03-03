import { navigateTo } from '../app.js';

export default class TournamentComponent extends HTMLElement {
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
			.trophy-icon {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				top: 13%;
				width: 20%;
				height: 18%;
				background-color: #d13ab7;
				border-style: solid;
				border-width: thick;
				border-color: #c900a7;
			}
			.next-match-button {
				position: absolute;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				-webkit-text-stroke: 0.08em black;
				font-weight: bold;
				color: #c900a7;
				top: 80%;
				width: 23%;
				height: 12%;
				text-align: center;
				background-color: #d13ab7;
				border-style: solid;
				border-width: thick;
				border-color: #c900a7;
			}
			.next-match-button:hover {
				background-color: aqua;
				cursor: url(https://cur.cursors-4u.net/sports/spo-1/spo15.cur), pointer;
			}
			.svg-sword {
				max-width: 30%;
				width: 100%;
				height: 100%;
			}
			.players-grid {
				position: absolute;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				align-items: center;
				width: 14%;
				height: 14%;
				background-color: gray;
				border-style: solid;
				border-width:medium;
				border-color: #31353C;
			}			
			.player-box {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				border: 1px solid black;
				width: 100%;
				height: 49%;
			}	
			.finalists-grid {
				position: absolute;
				display: flex;
				flex-direction: column;
				justify-content: center;
				overflow: hidden;
				align-items: center;
				margin-bottom: 0;
				width: 17%;
				height: 17%;
				background-color: gray;
				border-style: solid;
				border-width:medium;
				border-color: #31353C;
			}
			.button-text {
				display:flex;
				justify-content: center;
				align-items: center;
				max-width: 40%;
				margin-bottom: 0;
				font-family: "Press Start 2P";
				font-size: 1.5vw;
			}
			.players-text {
				display:flex;
				justify-content: center;
				align-items: center;
				max-width: 67%;
				margin-bottom: 0;
				font-family: "Press Start 2P";
				font-size: 1vw;
			}
    		`;

		const div = document.createElement('div');
		div.innerHTML = `
			<div class="bg">
				<div class="trophy-icon">
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="-15 -15 96 96">
						<title>Trophy</title>
						<g id="trophy">
							<rect x="21" y="53.92" width="22" height="2.16"></rect>
							<path d="M48,49H16a1,1,0,0,0-1,1V60a1,1,0,0,0,1,1H48a1,1,0,0,0,1-1V50A1,1,0,0,0,48,49Zm-3,8.08a1,1,0,0,1-1,1H20a1,1,0,0,1-1-1V52.92a1,1,0,0,1,1-1H44a1,1,0,0,1,1,1Z"></path><path d="M23,43a4.9,4.9,0,0,0-.77.07A4,4,0,0,0,19,47a3.66,3.66,0,0,0,.13,1H44.87A3.66,3.66,0,0,0,45,47a4,4,0,0,0-3.24-3.93A4.67,4.67,0,0,0,41,43H23Z"></path><path d="M32.55,35.92a1.93,1.93,0,0,1-1.1,0A29.91,29.91,0,0,1,27,34.16V35a9,9,0,0,1-1.51,5l-1.35,2H39.87l-1.36-2A8.9,8.9,0,0,1,37,35v-.81A29.91,29.91,0,0,1,32.55,35.92Z"></path><path d="M33.46,13.26l-1.48-3-1.48,3a1,1,0,0,1-.75.55l-3.31.48,2.39,2.33a1,1,0,0,1,.29.89l-.57,3.3,3-1.56a.92.92,0,0,1,.46-.11,1,1,0,0,1,.47.11l3,1.56-.57-3.3a1,1,0,0,1,.29-.89l2.4-2.33-3.31-.48A1,1,0,0,1,33.46,13.26Z"></path><path d="M27,33.05A28.7,28.7,0,0,0,31.73,35a.93.93,0,0,0,.54,0A28.7,28.7,0,0,0,37,33.05c3.63-1.82,8.24-5,9.6-10.06a11.08,11.08,0,0,0,.4-3V4a1,1,0,0,0-1-1H18a1,1,0,0,0-1,1V20a11.08,11.08,0,0,0,.4,3C18.76,28,23.37,31.23,27,33.05ZM40.37,14.31,36.9,17.69l.82,4.78a1,1,0,0,1-.39,1,1,1,0,0,1-.59.2,1,1,0,0,1-.47-.12L32,21.27l-4.29,2.25a1,1,0,0,1-1.05-.08,1,1,0,0,1-.4-1l.82-4.78-3.47-3.38a1,1,0,0,1-.25-1,1,1,0,0,1,.8-.68l4.8-.7,2.14-4.34a1,1,0,0,1,1.8,0L35,11.9l4.8.7a1,1,0,0,1,.55,1.71Z"></path><path d="M51,13V12H48v4.87A4,4,0,0,0,51,13Z"></path><path d="M56,7H48v3h4a1,1,0,0,1,1,1v2a6,6,0,0,1-5,5.91V20a12.07,12.07,0,0,1-.34,2.87A11,11,0,0,0,57,12V8A1,1,0,0,0,56,7Z"></path><path d="M16,16.87V12H13v1A4,4,0,0,0,16,16.87Z"></path><path d="M16,20V18.91A6,6,0,0,1,11,13V11a1,1,0,0,1,1-1h4V7H8A1,1,0,0,0,7,8v4a11,11,0,0,0,9.34,10.87A12.07,12.07,0,0,1,16,20Z"></path><path d="M16,45a1,1,0,0,0,.95-.68l.84-2.53L20.32,41a1,1,0,0,0,0-1.9l-2.53-.84L17,35.68a1,1,0,0,0-1.9,0l-.84,2.53-2.53.84a1,1,0,0,0,0,1.9l2.53.84.84,2.53A1,1,0,0,0,16,45Z"></path><path d="M53.32,29.05l-2.53-.84L50,25.68a1,1,0,0,0-1.9,0l-.84,2.53-2.53.84a1,1,0,0,0,0,1.9l2.53.84.84,2.53a1,1,0,0,0,1.9,0l.84-2.53L53.32,31a1,1,0,0,0,0-1.9Z"></path>
						</g>
					</svg>
				</div>
				<div class="next-match-button">
					<svg class="svg-sword" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
						<title>Play</title>
						<path d="M5.018,12.088l12.892,12.1-1.968,2.1,5.77,5.77L24,29.91l2.288,2.148,5.77-5.77L12.088,5.018a.963.963,0,0,0-.62-.3l-6.36-.71a.983.983,0,0,0-1.1,1.1l.71,6.36A.963.963,0,0,0,5.018,12.088Z"></path><path d="M43.967,39.8a2.479,2.479,0,0,0-1.36-1.84l-.36-.17a3.423,3.423,0,0,1-.8-.58l-4.5-4.5-4.24,4.24,4.49,4.49a3.249,3.249,0,0,1,.57.78l.2.4a2.456,2.456,0,0,0,1.83,1.35,2.693,2.693,0,0,0,.4.03,2.505,2.505,0,0,0,1.77-.73l1.3-1.3A2.5,2.5,0,0,0,43.967,39.8Z"></path><path d="M36.244,26.344a1,1,0,0,0-1.415,0l-8.485,8.485a1,1,0,0,0,0,1.415,3,3,0,0,0,4.243,0l5.657-5.657A3,3,0,0,0,36.244,26.344Z"></path><path d="M42.982,12.088a.963.963,0,0,0,.3-.62l.71-6.36a.983.983,0,0,0-1.1-1.1l-6.36.71a.963.963,0,0,0-.62.3L25.372,16.244l6.176,6.579Z"></path><path d="M6.553,37.21a3.423,3.423,0,0,1-.8.58l-.36.17a2.5,2.5,0,0,0-.66,4.01l1.3,1.3A2.505,2.505,0,0,0,7.8,44a2.693,2.693,0,0,0,.4-.03,2.456,2.456,0,0,0,1.83-1.35l.2-.4a3.249,3.249,0,0,1,.57-.78l4.49-4.49-4.24-4.24Z"></path><path d="M13.171,26.344a1,1,0,0,0-1.415,0,3,3,0,0,0,0,4.243l5.657,5.657a3,3,0,0,0,4.243,0,1,1,0,0,0,0-1.415Z"></path>
					</svg>
					<p class="button-text"> NEXT MATCH </p>
					<svg class="svg-sword" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
						<title>Play</title>
						<path d="M5.018,12.088l12.892,12.1-1.968,2.1,5.77,5.77L24,29.91l2.288,2.148,5.77-5.77L12.088,5.018a.963.963,0,0,0-.62-.3l-6.36-.71a.983.983,0,0,0-1.1,1.1l.71,6.36A.963.963,0,0,0,5.018,12.088Z"></path><path d="M43.967,39.8a2.479,2.479,0,0,0-1.36-1.84l-.36-.17a3.423,3.423,0,0,1-.8-.58l-4.5-4.5-4.24,4.24,4.49,4.49a3.249,3.249,0,0,1,.57.78l.2.4a2.456,2.456,0,0,0,1.83,1.35,2.693,2.693,0,0,0,.4.03,2.505,2.505,0,0,0,1.77-.73l1.3-1.3A2.5,2.5,0,0,0,43.967,39.8Z"></path><path d="M36.244,26.344a1,1,0,0,0-1.415,0l-8.485,8.485a1,1,0,0,0,0,1.415,3,3,0,0,0,4.243,0l5.657-5.657A3,3,0,0,0,36.244,26.344Z"></path><path d="M42.982,12.088a.963.963,0,0,0,.3-.62l.71-6.36a.983.983,0,0,0-1.1-1.1l-6.36.71a.963.963,0,0,0-.62.3L25.372,16.244l6.176,6.579Z"></path><path d="M6.553,37.21a3.423,3.423,0,0,1-.8.58l-.36.17a2.5,2.5,0,0,0-.66,4.01l1.3,1.3A2.505,2.505,0,0,0,7.8,44a2.693,2.693,0,0,0,.4-.03,2.456,2.456,0,0,0,1.83-1.35l.2-.4a3.249,3.249,0,0,1,.57-.78l4.49-4.49-4.24-4.24Z"></path><path d="M13.171,26.344a1,1,0,0,0-1.415,0,3,3,0,0,0,0,4.243l5.657,5.657a3,3,0,0,0,4.243,0,1,1,0,0,0,0-1.415Z"></path>
					</svg>
				</div>
				<div class="players-grid" style="left: 6.5%; top: 20%;"> <!-- Box left-up -->
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 1 </p>
					</div>
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 2 </p>
					</div>
				</div>
				<div class="players-grid" style="left: 6.5%; top: 70%;"> <!-- Box left-bottom -->
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 1 </p>
					</div>
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 2 </p>
					</div>
				</div>
				<div class="players-grid" style="left: 22%;"> <!-- Box left-center -->
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 1 </p>
					</div>
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 2 </p>
					</div>
				</div>
				<div class="finalists-grid"> <!-- Box finalists(center) -->
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 1 </p>
					</div>
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 2 </p>
					</div>
				</div>
				<div class="players-grid" style="right: 22%;"> <!-- Box right-center -->
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 1 </p>
					</div>
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 2 </p>
					</div>
				</div>
				<div class="players-grid" style="right: 6.5%; top: 20%;"> <!-- Box right-up -->
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 1 </p>
					</div>
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 2 </p>
					</div>
				</div>
				<div class="players-grid" style="right: 6.5%; top: 70%;"> <!-- Box right-bottom -->
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 1 </p>
					</div>
					<div class="player-box">
						<img src="./staticfiles/js/utils/images/screw_head.png" style="max-width: 33%; width: 100%; height: 100%" alt="Screw Head">
						<p class="players-text"> PLAYER 2 </p>
					</div>
				</div>
			</div>
			`;

		this.appendChild(style);
        div.className = 'bg';
		this.appendChild(div);

		this.attachListeners();
	}

	attachListeners() {
        document.getElementById("a1").addEventListener("click", async function ()
        {
            const form = document.querySelector("form");

            const otp_code = document.getElementById("otp_code");

            if (form.checkValidity())
                {
                    try
                    {
                        document.getElementById("alert").style.display = "none";

                        const response = await fetch('/api/verify-otp', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                'username': localStorage.getItem("username"),
                                'otp_code': otp_code.value,
                            })
                        });
    
                    const data = await response.json();
                    if (response.ok)
                    {
						localStorage.setItem('access_token', data.access);
						localStorage.setItem('refresh_token', data.refresh);
                        navigateTo('/home');
                    }
                    else
                    {
                        console.log(data.error);
                        document.getElementById("alert").style.display = "block";
                    }
                } catch (err) {
                   console.log("Error: Problem sending the petition");
                }
            } else {
                form.reportValidity();
            }
        });
	}

	disconnectedCallback() {
		this.querySelector("form").removeEventListener('submit', this);
        this.querySelector("a").removeEventListener('click', this);
	}
}

window.customElements.define('tournament-component', TournamentComponent);