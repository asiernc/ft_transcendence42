import { navigateTo } from '../app.js';

export default class RegisterComponent extends HTMLElement {
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
                width: min-content;
                height: min-content;
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
                margin-top: 0;
                margin-left: 2vw;
                margin-right: 2vw;
                margin-bottom: 2vh;
            }

            label {
                font-size: 10px;
            }
            input {
                height: 6vh;
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
                height: 40px;
                text-decoration: none;
                text-align: center;
                color: var(--color-white);
                transition: var(--speed-normal);
                font-size: 15px;
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
            <div class="sidebar"></div>
            <div class="general-poster">
                <div class="screw-container">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                    <img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
                </div>
                <div class="form-container">
                    <div class="d-flex justify-content-center align-items-center">
                        <p class="pixel-font title">REGISTER</p>
                    </div>
                    <form>
                        <div class="mb-1">
                            <label for="name" class="form-label pixel-font mb-1">Username</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>

                        <div class="mb-1">
                            <label for="email" class="form-label pixel-font mb-1">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                
                        <div class="mb-1">
                            <label for="password" class="form-label pixel-font mb-1">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required minlength="6">
                        </div>

                        <div class="mb-1">
                            <label for="repeatPassword" class="form-label pixel-font mb-1">Repeat password</label>
                            <input type="password" class="form-control" id="repeatPassword" name="repeatPassword" required>
                        </div>
                        
                        <div id="alert" style="display: none; height: 15px;" class="alert alert-danger mt-1 justify-content-center align-items-center" role="alert">
                            This Username or Password is alredy in use. Please choose another one.
                        </div>
                        <div id="succes" style="display: none; height: 15px;" class="alert alert-success mt-1 justify-content-center align-items-center" role="alert">
                            User registered succesfully.
                        </div>
                        <a id="a1" href="javascript:void(0);" type="submit" class="pixel-font mt-4">REGISTER</a>
                    </form>
                    <div class="mt-3 pixel-font separator">
                        <span class="d-none d-xl-inline" style="font-size: 10px;">Or if you are alredy registered</span>
                    </div>
                    <a id="a2" href="javascript:void(0);" class="pixel-font">LOG IN</a>
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
            const alertMsg = document.getElementById("alert");
            alertMsg.style.display = "none";
            
            const succesMsg = document.getElementById("succes");
            succesMsg.style.display = "none";

            const form = document.querySelector("form");

            const username = document.getElementById("name");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const repeatPassword = document.getElementById("repeatPassword");
            
            if (!/[A-Z]/.test(password.value) || !/[a-z]/.test(password.value) || !/[0-9]/.test(password.value)) {
                password.setCustomValidity("lowercase, uppercase, and digit required");
            } else {
                password.setCustomValidity("");
            }

            if (password.value !== repeatPassword.value) {
                repeatPassword.setCustomValidity("Passwords don't match");
            } else {
                repeatPassword.setCustomValidity("");
            }
            
            if (form.checkValidity())
                {
                    try
                    {
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            'username': username.value,
                            'email': email.value, 
                            'password': password.value,
                            'password_check': repeatPassword.value,
                        })
                    });
    
                    const data = await response.json();
                    if (response.ok)
                        succesMsg.style.display = "flex";
                    else
                    {
                        console.log(data.error);
                        alertMsg.style.display = "flex";
                    }

                } catch (err) {
                   console.log("Error: Problem sending the petition");
                }
            } else {
                form.reportValidity();
            }
        });

        document.getElementById("a2").addEventListener("click", function () {
            navigateTo('/login');
        });
	}

	disconnectedCallback() {
		this.querySelector("form").removeEventListener('submit', this);
        this.querySelectorAll("a").forEach( (e) => {e.removeEventListener('click', this)});
	}
}

window.customElements.define('register-component', RegisterComponent);
