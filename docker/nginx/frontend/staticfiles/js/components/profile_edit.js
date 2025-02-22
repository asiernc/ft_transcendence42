import { navigateTo } from "../app.js";

export default class ProfileEditComponent extends HTMLElement {
	constructor() {
		super();

        const shadow = this.attachShadow({ mode: 'open' });
		// const user = this.getUserInfo(localStorage.getItem('username'));
		const user = {"name": "Albert Caballero", "username": "alcaball", "bio": "best pong player", "email": "alcaball@student.42.fr" };

		const style = document.createElement('style');
        style.textContent = `	
		.input{
			display: block;
			font-family: Arial;
			margin-top: 15px;
			padding-left: 8px;
			padding-top: 15px;
			padding-bottom: 15px;
			width: 70%;
			font-size: larger;
		}
		.userImg{
			cursor: pointer;
		}
			.userImg:hover{
				filter: brightness(40%);
			}
		.submit-btn{
			background-color: rgb(185, 235, 196);
			font-family: Arial;
			padding: 1%;
			margin-top: 1.5%;
			font-size: x-large;
			cursor: pointer;
			border: solid 2px black;
			width: 30%;
			transition: all 0.2s;
		}
			.submit-btn:hover{
				transform: translateY(-2px);
				background-color: rgb(135, 255, 167);
			}
			.submit-btn:active{
				transform: translateY(4px);
			}
			form{
				padding: 30px;
				background-color: rgba(217, 217, 217, 0.548);
				border: 4px solid #31353C;
				margin: 40px
			}
        `;

        const div = document.createElement('div');
        div.innerHTML = `
	<form id="contactForm" method="POST" enctype="multipart/form-data" action="">
		<img id="id_image" src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" class="userImg">
		<div style="left: 350px; position: absolute; top: 80px; width: 50%">
			<input id="id_name" type="text" name="name" maxlength="50" placeholder="Name" required="" value="${user['name']}" class="input"></input>
			<input id="id_username" type="text" name="username" maxlength="50" placeholder="Username" required="" value="${user['username']}" class="input"></input>
			<input id="id_email" type="text" name="email" maxlength="50" placeholder="Email" value="${user['email']}" class="input"></input>
		</div>
		<textarea id="id_body" name="body" required="" placeholder="Bio" cols="15" rows="5" class="input">${user['bio']}</textarea>
		<input id="submitBtn" type="submit" value="Submit" class="submit-btn">
	</form>
        `;
		shadow.appendChild(style);
        div.className = 'bg';
		shadow.appendChild(div);

        this.attachListeners();
	}

    attachListeners() {
		this.pfp = this.shadowRoot.getElementById('id_image');
        this.pfp.addEventListener('click', () => {
            alert('changes image');
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
							'name': document.getElementById("id_name").value,
							'username': document.getElementById("id_username").value,
							'email': document.getElementById("id_email").value,
							// 'password': document.getElementById("id_name").value,
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

	async getUserInfo(username) {
		//alomejor ya lo podemos sacar del localstorage
		if (!username){
			//do something about it!!
		}
		const response = await fetch(`/api/profile/${username}`, {method: 'GET'});
		const data = await response.json();
		return data;
	}
}

window.customElements.define('profile_edit-component', ProfileEditComponent);
