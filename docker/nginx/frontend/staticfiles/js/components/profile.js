import { navigateTo } from "../app.js";

export default class ProfileComponent extends HTMLElement {
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
			flex-direction: column;
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
		.box{
			background-color: rgba(217, 217, 217, 0.548);
			border-radius: 3px;
			border: 4px solid #31353C;
			padding: 1%;
		}
		button{
			border: none;
			background-color: rgba(217, 217, 217, 0.548);
			padding: 10px;
			cursor: pointer;
		}
		table{
			border-collapse: collapse;
			table-layout: fixed;
		}
		td{
			overflow: hidden;
			/* background-color: rgba(217, 217, 217, 0.548); */
		}
		.history_scores{
			padding-top: 10px;
			padding: 5px;
			font-size: 40px;
			font-weight: 700;
			border-top: 2px solid black;
            font-family: "Press Start 2P", Arial;
			
		}
		.history_dates{
			font-size: 30px;
			font-weight: 500;
			color: rgb(97, 97, 97);
		}
		.title{
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin-top: 3%;
		}

		.pfp{
			margin-left: 3px;
			width: 170px;
			height: 170px;
		}

		.name{
			white-space: nowrap;
			padding-left: 18px;
			padding-bottom: 18px;
			color: white;
		}
		.history{
			width: 55%;
		}
		.stats{
			display: flex;
			justify-content: space-around;
			width: 50%;
			padding: 0.5%
		}

		.friends{
			width: 35%;
		}
		.friend{
			display: flex;
			padding: 10px;
			border-top: 1px solid black;
			justify-content: space-between;
			margin-top: 10px;
			align-items: center;
			height: 70px;
			font-family: "Press Start 2P", Arial;
		}
			.friend:hover h2{
				text-decoration: underline;
				cursor: pointer;
			}
		.screw-container {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-content: center;
			height: 30px;
		}
		.pixel-font {
            font-family: "Press Start 2P", Arial;
		}
        `;



		const userData = await this.getUserInfo();
		console.log(userData);
		let match_history = "";
		userData['matches'].forEach(match => {
			const winner =  match['p1score'] > match['p2score'];
			match_history += `
				<tr class="history_scores">
					<td>${match['p1score']}</td>
					<td><img src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" width="80px" style="box-shadow: 3px 3px 8px 0 ${winner ? 'green':'red'};"></td>
					<td>vs</td>
					<td><img src="https://play-lh.googleusercontent.com/2zorpA9peRFcwZM5SLSAx80gLCA3YrknRXQwPW-Hz2AJyBcvBJiO9vuP6DvlX3FRZXMv=w526-h296-rw" width="80px" style="box-shadow: 3px 3px 8px 0 ${!winner ? 'green':'red'};"></td>
					<td>${match['p2score']}</td>
				</tr>
				<tr class="history_dates">
					<td colspan="2" style="text-align: left; padding-left: 50px;">${match['duration']}</td>
					<td colspan="3"  style="text-align: right; padding-right: 50px;">${match['date']}</td>
				</tr>
			`;
		});
		if (match_history === ""){
			match_history = "No matches played";
		}

		let friends = "";
		userData['friends'].forEach(friend => {
			friends += `
			<div class="friend">
				<img src="https://play-lh.googleusercontent.com/2zorpA9peRFcwZM5SLSAx80gLCA3YrknRXQwPW-Hz2AJyBcvBJiO9vuP6DvlX3FRZXMv=w526-h296-rw" width="60px">
				<h2 style="margin-left: 3%;" onclick="alert('to profile')">${friend['name']}</h2>
				<div style="margin-left: auto;">
					<img src="https://cdn-icons-png.flaticon.com/512/842/842184.png" style="width: 40px; height: 40px; cursor: pointer;" title="Match" onclick="alert('retado a match')">
					<img src="	https://cdn-icons-png.flaticon.com/512/8184/8184225.png" style="width: 40px; height: 40px; cursor: pointer;" title="Unfriend" onclick="alert('unfriended')">
				</div>
			</div>
			`;
		});
		if (friends === ""){friends = "No friends :("; }
		if (!userData['user']['avatar_field']) {
			userData['user']['avatar_field'] = "https://cdn.pixabay.com/photo/2016/10/09/17/28/confidential-1726367_1280.jpg";}

        const div = document.createElement('div');
        div.innerHTML = `
	<div style="width: 80%; display: flex; justify-content: space-between">
		<div style="display:flex;">
			<div style="margin-right: 20px;">
				<img src="${userData['user']['avatar_field']}" class="pfp" id="usr_img">
			</div>
			<div class="name">
				<h1 class="pixel-font" style="font-size: 40px">${userData['user']['username']}</h1>
				<h3 class="pixel-font" style="font-size: larger;">${userData['user']['bio']}</h3>
			</div>
		</div>
		<div style="display:flex; align-items: flex-start">
			<button style="margin-right: 20px;" id="editProfile">Edit Profile</button>
			</div>
	</div>
	<div class="box stats">
		<span class="pixel-font" style="font-size: larger;" title="Wins/Losses">W/L: ${userData['user']['wins']}/${userData['user']['losses']}</span>
		<span class="pixel-font" style="font-size: larger;" title="Score Ratio">Ratio: 37.0</span>
	</div>
	<div style="width: 80%; text-align: center; display: flex; justify-content: space-between; align-items:flex-start;">
		<div class="box history">
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			<h1 class="pixel-font">MATCH HISTORY</h1>
			<table style="width: 90%; margin: auto;" id="match_history">
				${match_history}
			</table>
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
		</div>
		<div class="box friends">
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			<h1 class="pixel-font">FRIENDS</h1>
				${friends}
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
		</div>
	</div>
        `;
		this.shadowRoot.appendChild(style);
        div.className = 'bg';
		this.shadowRoot.appendChild(div);

        this.attachListeners();
	}

    attachListeners() {
		this.editProfile = this.shadowRoot.getElementById('editProfile');
        this.editProfile.addEventListener('click', () => {
            navigateTo("/profile/edit");
        });
	}

	disconnectedCallback() {
        this.editProfile.removeEventListener('click', this);
	}

	async getUserInfo() {
		const username = localStorage.getItem('username');
		if (!username){
			//haz algoooo!
		}

		const refreshToken = localStorage.getItem('refresh_token');
		if (!refreshToken){
			console.error('no refresh token, gonna log out');
			//navigateTo('logout');
		}
		await fetch('/api/refresh-tokens', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ refresh_token: refreshToken })
		})
		.then(response => response.json())
		.then(data => {
			if (data.access_token) {
				localStorage.setItem('access_token', data.access_token);
			} else {
				console.error('Refresh token invalid, user must log in again.');
			}
		});

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

window.customElements.define('profile-component', ProfileComponent);