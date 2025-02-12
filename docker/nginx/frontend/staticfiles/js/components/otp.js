import { navigateTo } from '../app.js';

export default class OTPComponent extends HTMLElement {
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

            .subtitle {
                text-align: center;
                font-size: 10px;
                opacity: 0.7;
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
                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <p class="pixel-font title">OTP VERIFY</p>
                        <p class="pixel-font subtitle">Please enter the code sended to you email to verify your identity.</p>
                    </div>
                    <form class="d-flex justify-content-center align-items-center">
                        <input type="number" class="form-control" style="text-align: center;" id="otp_code" name="otp_code" required max="999999">
                    </form>
                    <div id="alert" style="display: none; height: 15px;" class="alert alert-danger mt-1 justify-content-center align-items-center" role="alert">
                        OTP code is incorrect. Please try again.
                    </div>
                    <a id="a1" href="javascript:void(0);" class="pixel-font mt-3">Verify</a>
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
						localStorage.setItem('access_token', data.access_token);
						localStorage.setItem('refresh_token', data.refresh_token);
                        // document.cookie = `access_token=${data.token}; path=/`;
                        // document.cookie = `refresh_token=${data.refresh}; path=/`;
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

window.customElements.define('otp-component', OTPComponent);