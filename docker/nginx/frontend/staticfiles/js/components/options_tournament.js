import { navigateTo } from '../app.js';

export default class OptionsTournament extends HTMLElement {
	constructor() {
        super();
        
        const my_username = localStorage.getItem("username");
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
                font-size: 15px;
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
                font-size: 25px;
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
                height: 40px;
                font-size: 15px;
                letter-spacing: 2px;
                text-decoration: none;
                text-transform: uppercase;
                text-align: center;
                color: var(--color-white);
                transition: var(--speed-normal);
            }

            #a1 {
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

            #a2 {
                height: 40px;
                font-size: 15px;
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

            #a3 {
                align-self: center;
                width: 70%;
                height: 50px;
                font-size: 20px;
                border: 1px solid var(--color-red);
            }
            #a3:hover {
                border: 1px solid transparent;
                background: var(--color-red) url(https://i.postimg.cc/wBXGXbWN/pixel.png);
                transition-delay: 0.8s;
                background-size: 180px;
                animation: animate var(--speed-fast) steps(8) forwards;
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

            @keyframes animate {
                0% {
                background-position-y: 0;
                }
                100% {
                    background-position-y: -480px;
                }
            }



            body {
            box-sizing: border-box;
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
            padding: 30px 50px;
            width: 600px;
            max-width: 100%;
            text-align: center;
            }

            .modal-content h1 {
            font-size: 20px;
            margin: 0;
            margin-bottom: 10px;
            }

            .modal-content p {
            font-size: 14px;
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
                        <p class="pixel-font title">TOURNAMENT OPTIONS</p>
                    </div>
                    <div class="d-flex flex-column justify-content-between align-content-center">
                        <div class="d-flex flex-column justify-content-around align-content-center m-4">
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_1:</p>
                                    <form autocomplete="off">
                                        <div style="visibility: hidden;" class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal1" disabled>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="${my_username}" id="radioNoUser1" checked disabled>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">${my_username}</label>
                                        </div>
                                        <div style="visibility: hidden;" class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI1" disabled>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_2:</p>
                                    <form autocomplete="off">
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal2" checked>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radioUser2">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">User</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI2">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_3:</p>
                                    <form autocomplete="off">
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal3" checked>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radioUser3">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">User</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI3">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_4:</p>
                                    <form autocomplete="off">
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal4" checked>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radioUser4">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">User</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI4">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_5:</p>
                                    <form autocomplete="off">
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal5" checked>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radioUser5">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">User</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI5">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_6:</p>
                                    <form autocomplete="off">
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal6" checked>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radioUser6">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">User</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI6">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="d-flex justify-content-around align-content-center mb-4">
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_7:</p>
                                    <form autocomplete="off">
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal7" checked>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radioUser7">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">User</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI7">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-content-center">
                                    <p class="pixel-font">PLAYER_8:</p>
                                    <form autocomplete="off">
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="local" id="radiolocal8" checked>
                                            <label class="form-check-label pixel-font" for="inlineRadio1">local</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-1">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radioUser8">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">User</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" value="AI" id="radioAI8">
                                            <label class="form-check-label pixel-font" for="inlineRadio1">AI</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a id="a3" href="javascript:void(0);" class="pixel-font mt-2">READY!</a>
                </div>
                <div class="screw-container">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                </div>
            </div>

            <div class="modal-container" id="modal_container">
				<div id="modal-content" class="modal-content"></div>
			</div>
		`;

		this.appendChild(style);
        div.className = 'bg';
		this.appendChild(div);

		this.attachListeners();
	}

	attachListeners()
    {
        document.querySelectorAll("input").forEach(element => {
            
            element.addEventListener('click', async function showLogin(e) {
                if (e.target.id.substr(0, e.target.id.length - 1) != "radioUser")
                    return;
                const playerNum = Number(e.target.id[e.target.id.length - 1]);
                document.getElementById("modal_container").classList.add("show");
                document.getElementById("modal-content").innerHTML = `
                    <div class="screw-container">
                        <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                        <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <h1 class="pixel-font title">PLAYER_${playerNum}</h1>
                    </div>
                    <form id="form-confirm">
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
                        <div id="succes" style="display: none; height: 15px;" class="alert alert-success mt-1 justify-content-center align-items-center" role="alert">
                            User confirmed succesfully.
                        </div>
                        <a id="a2" href="javascript:void(0);" type="submit" class="pixel-font">CONFIRM</a>
                    </form>
                    <a id="a1" href="javascript:void(0);" class="pixel-font mt-2 mb-3">Cancel</a>
                    <div class="screw-container">
                        <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                        <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                    </div>
                `;
            
                document.getElementById("modal_container").addEventListener("click", async function activate(e) {
                    if (e.target.id === "a1") {
                        document.getElementById("modal_container").classList.remove("show");
                        document.getElementById(`radiolocal${playerNum}`).checked = true;
                        document.getElementById(`radioUser${playerNum}`).checked = false;
                        document.getElementById("modal_container").removeEventListener('click', activate);
                    }
                    else if (e.target.id == "a2")
                    {
                        const alertMsg = document.getElementById("alert");
                        alertMsg.style.display = "none";
                        
                        const succesMsg = document.getElementById("succes");
                        succesMsg.style.display = "none";
                
                        const username = document.getElementById('name').value;
                        const password = document.getElementById('password').value;
                
                        const form = document.getElementById("form-confirm");
                    
                        if (form.checkValidity())
                        {
            
                            try {
                        
                                const response = await fetch('/api/verify_credentials', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ username, password })
                                });
                
                                const data = await response.json();
                
                                if (response.ok) {
                                    succesMsg.style.display = "flex";
                                    document.getElementById("radioUser" + playerNum).value = response.username;
                                    setTimeout(() => document.getElementById("modal_container").classList.remove("show"), 800);
                                    document.getElementById("modal_container").removeEventListener('click', activate);
                                } else {
                                    console.log(data.error);
                                    alertMsg.style.display = "flex";
                                }
                            }
                            catch (err) {
                                console.log("Error: Problem sending the petition");
                            }
                        }
                        else {
                            form.reportValidity();
                        }
                    }
                });
            });
        }); 
        
        document.getElementById("a3").addEventListener('click', () => {

            let userInfo = {};
            document.querySelectorAll("form").forEach((e, i) => {
                
                const radioValue = e.querySelector('input[type="radio"]:checked').value;
                userInfo["player" + (i + 1)]  = {
                    username: radioValue,
                };
            });
            localStorage.setItem('user_info', JSON.stringify(userInfo));

            // CREATE TOURNAMENT
            // SAVE ID

            navigateTo('/options_alias');
        });
	}

	disconnectedCallback() {
		this.querySelector("form").removeEventListener('submit', this);
        this.querySelector("a").removeEventListener('click', this);
        this.querySelector("input").removeEventListener('click', this);
	}
}

window.customElements.define('options_tournament-component', OptionsTournament);