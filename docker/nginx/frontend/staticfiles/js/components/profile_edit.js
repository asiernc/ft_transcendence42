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
			width: 250px;
			height: 250px;
			overflow: hidden;
			display: inline-block;
		}
		.profile-pic-container img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: opacity 0.3s ease-in-out;
		}
		.edit-icon {
			position: absolute;
			bottom: 10px;
			right: 10px;
			background: rgba(0, 0, 0, 0.6);
			color: white;
			padding: 5px;
			font-size: 70px;
			opacity: 0;
			transition: opacity 0.3s;
		}
			.profile-pic-container:hover .edit-icon {
				opacity: 1;
			}

		.alert {
			position: fixed;
			padding: 40px;
			background-color: #97ED93;
            border: 5px solid #1E6C1A;
			top: 40%;
			display: none;
			font-size: larger;
			z-index = 22;
		}
        `;

		const user = await this.getUserInfo();
		if (user['user']['avatar_42_url']) {user['user']['avatar_field'] = user['user']['avatar_42_url'];}
		if (!user['user']['avatar_field']) {user['user']['avatar_field'] = "https://cdn.pixabay.com/photo/2016/10/09/17/28/confidential-1726367_1280.jpg";}

        const div = document.createElement('div');
        div.innerHTML = /*ht ml*/`
		<div class="container">
		<div class="screw-container">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
		</div>
		<form id="editProfileForm" enctype="multipart/form-data" style="padding: 20px;">
			<div style="display: flex; flex-direction: row; gap: 2%;">
				<label class="profile-pic-container">
					<input type="file" id="profile-upload" accept="image/*" hidden>
					<img id="profile-image" src="${user['user']['avatar_field']}" alt="Profile Picture">
					<div class="edit-icon">✏️</div>
				</label>
				<div style="display: flex; flex-direction: column; width: 50%; justify-content: space-around;">
					<input id="id_name" type="text" name="name" maxlength="50" placeholder="Name" required="" value="${user['user']['name']}" class="input"></input>
					<input id="id_username" type="text" name="username" maxlength="50" placeholder="Username" required="" value="${user['user']['username']}" class="input"></input>
					<input id="id_email" type="text" name="email" maxlength="50" placeholder="Email" value="${user['user']['email']}" class="input"></input>
				</div>
			</div>
			<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 30px">
				<textarea id="id_body" name="body" required="" placeholder="Bio" cols="15" rows="5" class="input" style="width: 70%">${user['user']['bio']}</textarea>
				<input id="submitBtn" value="Submit" class="submit-btn">
			</div>
		</form>
		<div class="screw-container">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
		</div>
		</div>
		<div class="alert" id="successAlert">
			Profile updated correctly!!
		</div> 
        `;
		this.shadowRoot.appendChild(style);
        div.className = 'bg';
		this.shadowRoot.appendChild(div);

        this.attachListeners();
	}

    attachListeners() {
		this.pfpupload = this.shadowRoot.getElementById("profile-upload");
		this.pfpupload.addEventListener("change", (event) => {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.shadowRoot.getElementById("profile-image").src = e.target.result;
					// this.shadowRoot.getElementById("image-data").value = e.target.result;
				};
				reader.readAsDataURL(file);
			}
		});

		this.submit = this.shadowRoot.getElementById('submitBtn');
        this.submit.addEventListener('click', async () => { //UPDATE USER
			
			const form = this.shadowRoot.getElementById("editProfileForm");
			if (form.checkValidity())
			{
				const username = localStorage.getItem('username');
				const token = localStorage.getItem("access_token");
				try{
					const response = await fetch(`/api/update/${username}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify({
							'username': this.shadowRoot.getElementById("id_username").value,
							'email': this.shadowRoot.getElementById("id_email").value,
						})
					});
					const data = await response.json();
					const resultAlert = this.shadowRoot.getElementById('successAlert');
					if (!data['error']){
						localStorage.setItem("username", data['username']);
						resultAlert.style.display = 'block';
						setTimeout(() => { resultAlert.style.display = "none"; }, 2000);
					}else{
						resultAlert.style.display = 'block';
						resultAlert.style.backgroundColor = '#EE7C7C';
						resultAlert.style.border = '5px solid #701717';
						resultAlert.style.color = 'white';
						resultAlert.innerText = 'Error updating profile :(';
						setTimeout(() => { resultAlert.style.display = "none"; }, 2000);
					}
				}catch (err) {
					console.error("Error: Problem sending the petition");
				}
			}

		
			const formData = new FormData();
			const fileInput = this.shadowRoot.getElementById("profile-upload");

			if (fileInput.files.length > 0) {
				formData.append("avatar", fileInput.files[0]); // Attach actual file
			} else {
				console.warn("No file selected.");
				return;
			}
			try{
				const token = localStorage.getItem("access_token");
				const response = await fetch(`/api/avatar`, {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${token}`,
					},
					body: formData
				});
				const data = await response.json();
				console.log(data);
			} catch (err) {
				console.error("Error: Problem changing profile picture");
				console.error(err);
			}
        });
	}

	disconnectedCallback() {
        this.pfpupload.removeEventListener('change', this);
		this.submit.removeEventListener('click', this);
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
			console.log(data);
			return data;
		} catch (err) {
			console.error("Error: Problem sending the petition");
		} 
	}
}

window.customElements.define('profile_edit-component', ProfileEditComponent);
