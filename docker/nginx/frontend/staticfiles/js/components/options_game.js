import { navigateTo } from '../app.js';

export default class OptionsGame extends HTMLElement {
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
                padding: 2vw;
                width: 50vw;
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
                font-size: 30px;
            }

            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

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
                height: 50px;
                letter-spacing: 2px;
                text-decoration: none;
                text-transform: uppercase;
                text-align: center;
                color: var(--color-white);
                transition: var(--speed-normal);
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
            <div class="sidebar"></div>
            <div class="general-poster">
                <div class="screw-container">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                </div>
                <div class="form-container">
                    <div class="d-flex justify-content-center align-items-center">
                        <p class="pixel-font title">GAME OPTIONS</p>
                    </div>
                    <form class="d-flex flex-column justify-content-around align-items-center" autocomplete="off">
                        
                        <p class="pixel-font mt-4">How many players?</p>
                        <div class="d-flex justify-content-around align-items-center">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="2" checked>
                                <label class="form-check-label pixel-font" for="inlineRadio1">1vs1</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="4">
                                <label class="form-check-label pixel-font" for="inlineRadio2">2vs2</label>
                            </div>
                        </div>

                        <p class="pixel-font mt-5">Which players are AI?</p>
                        <div class="d-flex justify-content-around align-items-center">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                                <label class="form-check-label pixel-font" for="inlineCheckbox1">Player1</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                                <label class="form-check-label pixel-font" for="inlineCheckbox2">Player2</label>
                            </div>
                            <div class="form-check form-check-inline" style="display: none;" name="change-checkbox" id="change-checkbox">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
                                <label class="form-check-label pixel-font" for="inlineCheckbox3">Player3</label>
                            </div>
                            <div class="form-check form-check-inline" style="display: none;" name="change-checkbox" id="change-checkbox">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4">
                                <label class="form-check-label pixel-font" for="inlineCheckbox4">Player4</label>
                            </div>
                        </div>
                    </form>
                    <a id="a1" href="javascript:void(0);" class="pixel-font mt-5">READY!</a>
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
        this.radio1 = document.getElementById("inlineRadio1");
        this.radio1.addEventListener("click", function () {
            const changeCheckbox = document.querySelectorAll('div[id="change-checkbox"]');
        
            changeCheckbox.forEach(function changeVisibility(element) {
                
                if (element.style.display != "none")
                    element.style.display = "none";
            });
        });
        this.radio2 = document.getElementById("inlineRadio2");
        this.radio2.addEventListener("click", function () {
            const changeCheckbox = document.querySelectorAll('div[id="change-checkbox"]');
        
            changeCheckbox.forEach(function changeVisibility(element) {
        
                if (element.style.display == "none")
                    element.style.display = "block";
            });
        });
        
        document.getElementById("a1").addEventListener("click", function ()
        {
            const form = document.querySelector("form");
            let path = '/game?';
        
            const radioOption = Math.floor(document.querySelector('input[name="inlineRadioOptions"]:checked').value);
            path += "players=" + radioOption;

            const checkedBox = document.querySelectorAll('input[type="checkbox"]');
        
            checkedBox.forEach(function getAIs(element, index) {
                path += "&" + "player" + (index + 1) + "AI=" + element.checked;
            });
            navigateTo(path);
        });
	}

	disconnectedCallback() {
		this.querySelector("form").removeEventListener('submit', this);
        this.querySelector("a").removeEventListener('click', this);
        this.radio1.removeEventListener('click', this);
        this.radio2.removeEventListener('click', this);
	}
}

window.customElements.define('options_game-component', OptionsGame);