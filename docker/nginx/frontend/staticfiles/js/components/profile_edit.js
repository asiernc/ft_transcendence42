import { navigateTo } from "../app.js";
import { displayAlert } from "../utils/alert.js";


export default class ProfileEditComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.imageChanged = false;
		this.render();
	}

	async render() {
		const style = document.createElement("style");
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
			margin-top: 30px;
			text-align: center;
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
		.screw-container img{
			width: 30px;
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
        `;

		const user = await this.getUserInfo();
		if (user['user']['intra_user']){
			navigateTo('/profile/'+localStorage.getItem('username'));
		}
		if (user["user"]["avatar_42_url"]) {
			user["user"]["avatar_field"] = user["user"]["avatar_42_url"];
		}
		if (!user["user"]["avatar_field"]) {
			user["user"]["avatar_field"] =
				"https://res.cloudinary.com/teepublic/image/private/s--lJJYqwRw--/c_crop,x_10,y_10/c_fit,w_1109/c_crop,g_north_west,h_1260,w_1260,x_-76,y_-135/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-76,y_-135/bo_0px_solid_white/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1606803363/production/designs/16724317_0.jpg";
		}

		const div = document.createElement("div");
		div.innerHTML = /*ht ml*/ `
		<div class="container">
		<div class="screw-container">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
		</div>
		<form id="editProfileForm" enctype="multipart/form-data" style="padding: 20px;">
			<div style="display: flex; flex-direction: row; gap: 2%;">
				<label class="profile-pic-container">
					<input type="file" id="profile-upload" accept="image/*" hidden>
					<img id="profile-image" src="${user["user"]["avatar_field"]}" alt="Profile Picture">
					<div class="edit-icon">✏️</div>
				</label>
				<div style="display: flex; flex-direction: column; width: 50%; justify-content: space-around;">
					<input id="id_name" type="text" name="name" maxlength="50" placeholder="Name" required="" value="${user["user"]["first_name"]}" class="input"></input>
					<input id="id_surname" type="text" name="surname" maxlength="50" placeholder="Surname" required="" value="${user["user"]["last_name"]}" class="input"></input>
					<input id="id_email" type="text" name="email" maxlength="50" placeholder="Email" value="${user["user"]["email"]}" class="input"></input>
				</div>
			</div>
			<button id="submitBtn" class="submit-btn">Save</button>
			<button id="exitBtn" class="submit-btn" style="background-color: rgb(235, 185, 185);">Exit</button>
		</form>
		<div class="screw-container">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
		</div>
		</div>
        `;
		this.shadowRoot.appendChild(style);
		div.className = "bg";
		this.shadowRoot.appendChild(div);

		this.attachListeners();
	}

	attachListeners() {
		
		this.shadowRoot.getElementById("exitBtn").addEventListener("click", () => {
			navigateTo("/profile/"+localStorage.getItem("username"));
		});

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
				this.imageChanged = true;
			}
		});

		this.submit = this.shadowRoot.getElementById("submitBtn");
		this.submit.addEventListener("click", function(event){
			event.preventDefault();
		});
		this.submit.addEventListener("click", async () => {
			const form = this.shadowRoot.getElementById("editProfileForm");
			if (form.checkValidity()) {
				const username = localStorage.getItem("username");
				const token = localStorage.getItem("access_token");
				try {
					const response = await fetch(`/api/update/${username}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							first_name: this.shadowRoot.getElementById("id_name").value,
							last_name: this.shadowRoot.getElementById("id_surname").value,
							email: this.shadowRoot.getElementById("id_email").value,
						}),
					});
					const data = await response.json();
					if (!data["error"] && response.ok) {
						// this.submit.style.display = 'none';
						displayAlert("Profile updated correctly!!", "good");
					} else {
						throw new Error("Error updating profile :(");
					}
				} catch (err) {
					displayAlert(err.message, "bad");
				}
			}


			const formData = new FormData();
			const fileInput = this.shadowRoot.getElementById("profile-upload");

			if (fileInput.files.length > 0 || this.imageChanged) {
				formData.append("avatar", fileInput.files[0]); // Attach actual file
			} else {
				console.warn("No file selected.");
				return;
			}
			try {
				const token = localStorage.getItem("access_token");
				const response = await fetch(`/api/avatar`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formData,
				});
				const data = await response.json();
				if (!data["error"] && response.ok) {
					displayAlert("Profile picture updated correctly!!", "good");
				} else {
					throw new Error("Error updating profile picture :(");
				}
			} catch (err) {
				displayAlert(err.message, "bad");
				console.error(err);
			}
		});
	}

	disconnectedCallback() {
		this.pfpupload.removeEventListener("change", this);
		this.submit.removeEventListener("click", this);
	}

	async getUserInfo() {
		const username = localStorage.getItem("username");
		if (!username) {
			//haz algoooo!
		}

		const token = localStorage.getItem("access_token");
		try {
			const response = await fetch(`/api/profile/${username}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log(data);
			return data;
		} catch (err) {
			console.error("Error: Problem sending the petition");
		}
	}
}

window.customElements.define("profile_edit-component", ProfileEditComponent);
