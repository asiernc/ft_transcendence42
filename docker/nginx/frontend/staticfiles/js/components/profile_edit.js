import { navigateTo } from "../app.js";

export default class ProfileEditComponent extends HTMLElement {
	constructor() {
		super();

        this.attachShadow({ mode: 'open' });
		this.render();
	}

	async render(){
		const style = document.createElement('style');
        style.textContent = `
		.bg {
            display: flex;
			flex-direction:column;
            align-items: center;
            min-height: 100vh;
            width: 100vw;
			padding: 3rem 0;
			gap: 2rem;
            background: linear-gradient(-45deg, #31353C, #000000, #31353C, #000000);
                background-size: 400% 400%;
                animation: gradient 10s ease infinite;
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
		.container{
			display: flex;
			flex-direction:column;
			width: 80%;
			padding: 30px;
			background-color: rgba(217, 217, 217, 0.548);
			border: 4px solid #31353C;
		}
		.input{
			font-family: Arial;
			padding: 20px 0 20px 13px;
			font-size: larger;
		}
		.userImg{
			cursor: pointer;
			width: 300px;
			height: 300px;
		}
			.userImg:hover{
				filter: brightness(40%);
			}
		.submit-btn{
			background-color: rgb(185, 235, 196);
			font-family: Arial;
			padding: 0.7%;
			font-size: x-large;
			cursor: pointer;
			border: solid 2px black;
			width: 20%;
			transition: all 0.2s;
		}
			.submit-btn:hover{
				transform: translateY(-2px);
				background-color: rgb(135, 255, 167);
			}
			.submit-btn:active{
				transform: translateY(4px);
			}
		.screw-container {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-content: center;
			height: 30px;
		}


		.profile-pic-container {
    position: relative;
    width: 150px;
    height: 150px;
    overflow: hidden;
    cursor: pointer; /* Makes it clear it's clickable */
    display: inline-block;
}

/* Profile Image */
.profile-pic-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;
}

/* Pencil Icon (Hidden by Default) */
.edit-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 5px;
    font-size: 16px;
    opacity: 0;
    transition: opacity 0.3s;
}

/* Show Icon on Hover */
.profile-pic-container:hover .edit-icon {
    opacity: 1;
}
        `;

		// <input id="image-file" type="file">
		// 	<img id="id_image" src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" class="userImg">
		// </input>
		const user = await this.getUserInfo();
		// const user = {"name": "Albert Caballero", "username": "alcaball", "bio": "best pong player", "email": "alcaball@student.42.fr" };

        const div = document.createElement('div');
        div.innerHTML = /*html*/`
		<div class="container">
		<div class="screw-container">
			<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
		</div>
		<form id="contactForm" method="POST" enctype="multipart/form-data" action="" style="padding: 20px;">
			<div style="display: flex; flex-direction: row; gap: 2%;">
			<label class="profile-pic-container">
				<input type="file" id="profile-upload" accept="image/*" hidden>
				<img id="profile-image" src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" alt="Profile Picture">
				<div class="edit-icon">✏️</div>
			</label>
			<input type="hidden" id="image-data" name="profile_picture">
				<div style="display: flex; flex-direction: column; width: 50%; justify-content: space-around;">
					<input id="id_name" type="text" name="name" maxlength="50" placeholder="Name" required="" value="${user['user']['name']}" class="input"></input>
					<input id="id_username" type="text" name="username" maxlength="50" placeholder="Username" required="" value="${user['user']['username']}" class="input"></input>
					<input id="id_email" type="text" name="email" maxlength="50" placeholder="Email" value="${user['user']['email']}" class="input"></input>
				</div>
			</div>
			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 30px">
				<textarea id="id_body" name="body" required="" placeholder="Bio" cols="15" rows="5" class="input" style="width: 70%">${user['user']['bio']}</textarea>
				<input id="submitBtn" type="submit" value="Submit" class="submit-btn">
			</div>
		</form>
		<div class="screw-container">
			<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
		</div>
		</div>
        `;
		this.shadowRoot.appendChild(style);
        div.className = 'bg';
		this.shadowRoot.appendChild(div);

        this.attachListeners();
	}

    attachListeners() {
		this.shadowRoot.getElementById("profile-upload").addEventListener("change", (event) => {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.shadowRoot.getElementById("profile-image").src = e.target.result;
					this.shadowRoot.getElementById("image-data").value = e.target.result;
				};
				reader.readAsDataURL(file);
			}
		});

		this.submit = this.shadowRoot.getElementById('submitBtn');
        this.submit.addEventListener('click', async () => { //UPDATE USER
			
			const form = document.querySelector("form");
			if (form.checkValidity())
			{
				try{
					const response = await fetch('/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							'name': this.shadowRoot.getElementById("id_name").value,
							'username': this.shadowRoot.getElementById("id_username").value,
							'email': this.shadowRoot.getElementById("id_email").value,
							'pfp': this.shadowRoot.getElementById("image-data").value,
						})
					});
					const data = await response.json();
				}
				catch (err) {
					console.log("Error: Problem sending the petition");
				}
			}
        });
	}

	disconnectedCallback() {
        this.pfp.removeEventListener('click', this);
	}

	async getUserInfo() {
		const username = localStorage.getItem('username');
		if (!username){
			//haz algoooo!
		}

		const token = localStorage.getItem("access_token");
		try{
			const response = await fetch(`/api/profile/${username}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
				}
			);
			const data = await response.json();
			return data;
		} catch (err) {
			console.error("Error: Problem sending the petition");
		} 
	}
}

window.customElements.define('profile_edit-component', ProfileEditComponent);
