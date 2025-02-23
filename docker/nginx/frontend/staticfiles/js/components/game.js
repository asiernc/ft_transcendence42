import { navigateTo } from '../app.js';
import { pongGame } from "../utils/game/pong.js"

export default class GameComponent extends HTMLElement {
	constructor() {
		super();

		const style = document.createElement('style');
        style.textContent = `
            .bg {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            margin: 0;
            }

            #game {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
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
            
            .modal-container {
            background-color: rgba(0, 0, 0, 0.3);
            display: none;
            align-items: center;
            justify-content: center;
            position: fixed;
            opacity: 0;
            pointer-events: none;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            transition: opacity 0.3s ease;
            }

            .modal-container.show {
            display: flex;
            pointer-events: auto;
            opacity: 1;
            }

            .modal-content {
            background-color: #D9D9D9;
            border: 2px solid#31353C ;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            padding: 30px 30px;
            width: 600px;
            max-width: 100%;
            text-align: center;
            }
            
            .pixel-font {
                color: inherit;
                text-decoration: none;
                font-family: "Press Start 2P";
            }

            .winnerText {
                font-size: 35px;
                margin: 30px 0px;
            }

            .title {
                font-size: 20px;
                margin: 0;
            }
                
            :root {
            --color-red: #ec1840;
            --color-purple: #7a18ec;
            --speed-normal: 0.5s;
            --speed-fast: 0.8s;
            }

            a {
                display: flex;
                justify-content: center;
                align-self: center;
                align-items: center;
                position: relative;
                width: 80%;
                letter-spacing: 2px;
                text-decoration: none;
                text-transform: uppercase;
                text-align: center;
                color: var(--color-white);
                transition: var(--speed-normal);
                height: 40px;
                font-size: 15px;
                border: 1px solid var(--color-red);
            }
                
            a:hover {
                border: 1px solid transparent;
                background: var(--color-red) url(https://i.postimg.cc/wBXGXbWN/pixel.png);
                transition-delay: 0.8s;
                background-size: 180px;
                animation: animate var(--speed-fast) steps(8) forwards;
            }

            .modal-content p {
            font-size: 14px;
            }

            .screw-container {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-content: center;
            }
                
            img {
                width: 30px;
                height: 30px;
            }
                
            @keyframes animate {
                0% {
                background-position-y: 0;
                }
                100% {
                    background-position-y: -480px;
                }
            }
        `;

		const div = document.createElement('div');
		div.innerHTML = `
            <div id="game"></div>
            <div class="modal-container" id="modal_container">
                <div id="modal-content" class="modal-content"></div>
            </div>
            <canvas id="confetti"></canvas>
		`;

		this.appendChild(style);
        div.className = 'bg';
		this.appendChild(div);

        this.gameStarted = false;
		this.startGame();
	}

	startGame() {
        const urlParams = new URLSearchParams(window.location.search);
        const players = urlParams.get('players');
        const versus = urlParams.get('vs') == null ? "localhost" : urlParams.get('vs');
        // check if user exists maybe
        const tournament_id = urlParams.get('tournament_id');
        // check if tournament exists maybe
        const player1AI = urlParams.get('player1AI');
        const player2AI = urlParams.get('player2AI');
        const player3AI = urlParams.get('player3AI');
        const player4AI = urlParams.get('player4AI');

        if (players == null || player1AI == null || player2AI == null || player3AI == null || player4AI == null)
            navigateTo('/options_game');

        const numPlayers = Number(players);
        if (numPlayers > 2)
            pongGame(numPlayers, versus, null, (player1AI === 'true'), (player2AI === 'true'), (player3AI === 'true'), (player4AI === 'true'));
        else
            pongGame(numPlayers, versus, tournament_id, (player1AI === 'true'), (player2AI === 'true'));
    }

	disconnectedCallback() {
        if (this.gameStarted)
            document.removeEventListener("keydown", this);
	}
}

window.customElements.define('game-component', GameComponent);