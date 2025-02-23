import { navigateTo } from "../app.js";

export default class ProfileComponent extends HTMLElement {
	constructor() {
		super();

        const shadow = this.attachShadow({ mode: 'open' });

		const jsonResponse = {
			"user": {
				"name": "Albert Caballero",
				"username": "alcaball",
				"bio": "Best Pong Player",
				"wins": 2,
				"losses": 1
			},
			"friends": [
				{
					"name": "Pedrito Juanito",
					"username": "pjuanito"
				},
				{
					"name": "Juan Pablito",
					"username": "jpablito"
				}
			],
			"history": [
				{
					"p2": "pjuanito",
					"p1score": 10,
					"p2score": 2,
					"duration": "0:55",
					"date": "2025-01-15"
				},
				{
					"p2": "pjuanito",
					"p1score": 10,
					"p2score": 20,
					"duration": "7:27",
					"date": "2025-01-12"
				},
				{
					"p2": "pjuanito",
					"p1score": 1000,
					"p2score": 20,
					"duration": "12:42",
					"date": "2025-01-03"
				}
			]
		}

		const style = document.createElement('style');
        style.textContent = `
		.bg {
            background-color: rgb(127, 172, 255);
            }	
		body{
			background-color: rgb(208, 127, 255);
			font-family: "Press Start 2P", arial;
			/* font-size: x-small; */
			font-family: arial;
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
			width: 170px;
			height: 170px;
			border-radius: 50%;
			/* background-color: rgb(23, 206, 93); */
		}

		.name{
			position: absolute;
			left: calc(12% + 200px);
			right: 580px;
			white-space: nowrap;
			padding-left: 18px;
			padding-bottom: 18px;
		}
		.history{
			width: 55%;
			background-color: rgba(217, 217, 217, 0.548);
			border-radius: 3px;
			padding: 1%;
			float: left;
			border: 4px solid #31353C;
		}
		.stats{
			float: right; 
			text-align: center;
			border-radius: 3px;
			background-color: rgba(217, 217, 217, 0.548);
			padding: 10px;
			width: 150px;
		}
		.match{
			display: flex;
			padding: 10px;
			justify-content: space-evenly;
			/* background-color: rgba(129, 71, 71, 0.877); */
			border-top: 1px solid black;
			margin-top: 10px;
			align-items: center;
			height: 90px;
		}

		.friends{
			width: 35%;
			background-color: rgba(217, 217, 217, 0.548);
			border-radius: 3px;
			padding: 1%;
			float: right;
			border: 4px solid #31353C;
		}
		.friend{
			display: flex;
			padding: 10px;
			border-top: 1px solid black;
			justify-content: space-between;
			/* background-color: rgba(129, 71, 71, 0.877); */
			margin-top: 10px;
			align-items: center;
			height: 70px;
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
        `;

		let match_history = "";
		jsonResponse['history'].forEach(match => {
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

		let friends = "";
		jsonResponse['friends'].forEach(friend => {
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

        const div = document.createElement('div');
        div.innerHTML = `
	<div style="width: 80%; margin: 3% auto; min-height: 200px;">
		<div style="float: left; margin-right: 20px;">
			<img src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" class="pfp" id="usr_img">
		</div>
		<div class="name">
			<h1 style="font-size: 40px;">${jsonResponse['user']['name']}</h1>
			<h3 style="font-size: larger;">${jsonResponse['user']['bio']}</h3>
		</div>
		<div class="stats">
			<h1 title="Wins/Losses">${jsonResponse['user']['wins']} / ${jsonResponse['user']['losses']}</h1>
			<h1 title="Score Ratio">37.0</h1>
		</div>
		<button style="float: right; margin-right: 20px;" id="editProfile">Edit Profile</button>
	</div>
	<div style="width: 80%; text-align: center; margin: 3% auto;">
		<div class="history">
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			<h1>MATCH HISTORY</h1>
			<table style="width: 90%; margin: auto;" id="match_history">
				${match_history}
			</table>
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
		</div>
		<div class="friends">
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			<h1>FRIENDS</h1>
				${friends}
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
		</div>
	</div>
        `;
		shadow.appendChild(style);
        div.className = 'bg';
		shadow.appendChild(div);

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
}

window.customElements.define('profile-component', ProfileComponent);