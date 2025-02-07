import { navigateTo } from '../app.js';
import { pongGame } from "../utils/game/pong.js"

export default class GameComponent extends HTMLElement {
	constructor() {
		super();

		const style = document.createElement('style');
        style.textContent = `
            .bg {
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
        `;

		const div = document.createElement('div');
		div.innerHTML = `
            <div class="sidebar"></div>
            <div id="game"></div>
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
        const player1AI = urlParams.get('player1AI');
        const player2AI = urlParams.get('player2AI');
        const player3AI = urlParams.get('player3AI');
        const player4AI = urlParams.get('player4AI');

        if (players == null || player1AI == null || player2AI == null || player3AI == null || player4AI == null)
            navigateTo('/options_game');

        const numPlayers = Number(players);
        if (numPlayers > 2)
            pongGame(numPlayers, (player1AI === 'true'), (player2AI === 'true'), (player3AI === 'true'), (player4AI === 'true'));
        else
            pongGame(numPlayers, (player1AI === 'true'), (player2AI === 'true'));
	}

	disconnectedCallback() {
        if (this.gameStarted)
            document.removeEventListener("keydown", this);
	}
}

window.customElements.define('game-component', GameComponent);