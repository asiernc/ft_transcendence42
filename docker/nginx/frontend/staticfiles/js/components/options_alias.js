import { navigateTo } from '../app.js';

export default class OptionsAlias extends HTMLElement {
	constructor() {
        super();
        this.matchInfo = {};
        this.userInfo = JSON.parse(localStorage.getItem("user_info"));
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

            @keyframes animate {
                0% {
                background-position-y: 0;
                }
                100% {
                    background-position-y: -480px;
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
                padding: 2vw;
                width: 80vw;
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
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                margin-left: 3vw;
                margin-right: 3vw;
                margin-top: 0;
                margin-bottom: 2vh;
            }

            p {
                align-self: flex-start;
                font-size: 13px;
                margin-bottom: 8px;
            }

            label {
                font-size: 13px;
            }

            img {
                width: 30px;
                height: 30px;
            }

            .pixel-font {
                color: inherit;
                text-decoration: none;
                font-family: "Press Start 2P";
            }

            .title {
                font-size: 20px;
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
                align-items: center;
                position: relative;
                width: 100%;
                letter-spacing: 2px;
                text-decoration: none;
                text-transform: uppercase;
                text-align: center;
                color: var(--color-white);
                transition: var(--speed-normal);
            }

            #a1 {
                align-self: center;
                width: 70%;
                height: 40px;
                font-size: 15px;
                border: 1px solid var(--color-red);
            }
            #a1:hover {
                border: 1px solid transparent;
                background: var(--color-red) url(https://i.postimg.cc/wBXGXbWN/pixel.png);
                transition-delay: 0.8s;
                background-size: 180px;
                animation: animate var(--speed-fast) steps(8) forwards;
            }
        `;

		const div = document.createElement('div');
		div.innerHTML = `
            <div class="general-poster">
                <div class="screw-container">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                </div>
                <div class="form-container">
                    <div class="d-flex justify-content-center align-items-center">
                        <p class="pixel-font title">ALIAS OPTIONS</p>
                    </div>
                    <div class="d-flex flex-column justify-content-between align-content-center">
                        <div class="d-flex flex-column justify-content-around align-content-center m-4">
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_1 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias1" value="${this.userInfo["player1"].username}" name="alias_input" required>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_2 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias2" value="${this.userInfo["player2"].username}" name="alias_input" required>
                                    </form>
                                </div>
                            </div>
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_3 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias3" value="${this.userInfo["player3"].username}" name="alias_input" required>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_4 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias4" value="${this.userInfo["player4"].username}" name="alias_input" required>
                                    </form>
                                </div>
                            </div>
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_5 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias5" value="${this.userInfo["player5"].username}" name="alias_input" required>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_6 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias6" value="${this.userInfo["player6"].username}" name="alias_input" required>
                                    </form>
                                </div>
                            </div>
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_7 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias7" value="${this.userInfo["player7"].username}" name="alias_input" required>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_8 ALIAS:</p>
                                    <form>
                                        <input type="text" class="form-control" id="alias8" value="${this.userInfo["player8"].username}" name="alias_input" required>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a id="a1" - class="pixel-font mt-2">READY!</a>
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

	attachListeners()
    {
        document.getElementById("a1").addEventListener('click', async () => {
            let badForm = false;
            document.querySelectorAll("form").forEach((e, i) => {
                if (badForm)
                    return;
                if (!e.checkValidity())
                {
                    e.reportValidity();
                    badForm = true;
                }
                else {
                    this.userInfo["player" + (i + 1)].alias =  e.querySelector("input").value;
					if (this.userInfo["player" + (i + 1)].username == "AI")
						this.userInfo["player" + (i + 1)].isAI = true;
					else
						this.userInfo["player" + (i + 1)].isAI = false;
				}
            });
            if (badForm)
                return;
			this.randomizeMatches();
           /* for (let i = 0, j = 0; i < 7; i++, j+=2)
            {
                if (i < 4)
                {
                    this.matchInfo["match" + (i + 1)] = {
                        'player1': this.userInfo["player" + (j + 1)].username,
                        'player2': this.userInfo["player" + (j + 2)].username,
                    };
                }
                else
                {
                    this.matchInfo["match" + (i + 1)] = {
                        'player1': "PLAYER 1",
                        'player2': "PLAYER 2",
                    };
                }
            }*/
            // POST CREATE_TORUNAMENT
            try
            {
                const token = localStorage.getItem("access_token");
                const response = await fetch('/api-tournament/handle-tournament', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        'name': this.userInfo['player1'].username + '_tournament',
                        'matches_json': this.matchInfo,
                        'players_alias': this.userInfo,
                    })
                });
                const data = await response.json();
                if (response.ok)
                {
					localStorage.setItem('tournament_id', data.id);
                    navigateTo('/tournament');
                }
                else
                    throw Error(data.error);
            } catch (err) {
                console.error(err);
            }
        });
    }

	disconnectedCallback() {
		this.querySelector("form").removeEventListener('submit', this);
        this.querySelector("a").removeEventListener('click', this);
        this.querySelector("input").removeEventListener('click', this);
	}
	randomizeMatches() {
		let playerID = [1, 2, 3, 4, 5, 6, 7, 8];
		let add_player1;
		let isPlayer1 = true;
		let match_number = 1;
		while (playerID.length > 0)
		{
			let num = Math.floor((Math.random() * playerID[playerID.length - 1]) + 1);
			if (playerID.indexOf(num) != -1) {
				if (isPlayer1 === false) {
					this.matchInfo["match" + match_number] = {
						player1_id : add_player1,
						player2_id : num,
						winner : 0,
					};
					match_number++;
				}
				else
					add_player1 = num;
				isPlayer1 = !isPlayer1;
				playerID.splice(playerID.indexOf(num), 1);
			}
		}
	}
}

window.customElements.define('options_alias-component', OptionsAlias);