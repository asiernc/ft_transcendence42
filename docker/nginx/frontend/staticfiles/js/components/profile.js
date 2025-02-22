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
		.nav_bar{
			position: fixed;
			display: grid;
			background-color: rgba(217, 217, 217, 0.548);
			padding: 10px;
			border-radius: 0px 3px 3px 0px;
			top: 50%;
			transform: translateY(-50%);
			left: 0px;
		}

		.bg {
            background-color: rgb(127, 172, 255);
            }	

		.fa {
			padding: 5px;
			font-size: 35px;
			width: 40px;
			margin-top: 10px;
			margin-bottom: 10px;
			text-align: center;
			line-height: 45px;
			text-decoration: none;
			vertical-align: middle;
			transition: all 0.2s;
			color: rgba(0, 0, 0, 0.402);
			cursor: pointer;
		}
			.fa:hover {
				opacity: 0.7;
				transform: scale(1.2);
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
	<div class="nav_bar">
		<svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="fa">
			<title>Profile</title>
			<path d="M7.21895,1.5621c1.5621,1.5621 1.5621,4.09476 0,5.65685c-1.5621,1.5621 -4.09476,1.5621 -5.65685,0c-1.5621,-1.5621 -1.5621,-4.09476 -8.88178e-16,-5.65685c1.5621,-1.5621 4.09476,-1.5621 5.65685,-8.88178e-16" transform="translate(3.60948, -0.390524)"></path>
			<path d="M13.1357,2.46387c-3.64648,-2.46387 -8.625,-2.46387 -12.2715,0c-0.541016,0.365234 -0.864258,0.982422 -0.864258,1.65137v3.46582h14v-3.46582c0,-0.668945 -0.323242,-1.28613 -0.864258,-1.65137Z" transform="translate(1, 8.41895)"></path>
		</svg>
		<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fa">
			<title>Play</title>
			<path d="M5.018,12.088l12.892,12.1-1.968,2.1,5.77,5.77L24,29.91l2.288,2.148,5.77-5.77L12.088,5.018a.963.963,0,0,0-.62-.3l-6.36-.71a.983.983,0,0,0-1.1,1.1l.71,6.36A.963.963,0,0,0,5.018,12.088Z"></path><path d="M43.967,39.8a2.479,2.479,0,0,0-1.36-1.84l-.36-.17a3.423,3.423,0,0,1-.8-.58l-4.5-4.5-4.24,4.24,4.49,4.49a3.249,3.249,0,0,1,.57.78l.2.4a2.456,2.456,0,0,0,1.83,1.35,2.693,2.693,0,0,0,.4.03,2.505,2.505,0,0,0,1.77-.73l1.3-1.3A2.5,2.5,0,0,0,43.967,39.8Z"></path><path d="M36.244,26.344a1,1,0,0,0-1.415,0l-8.485,8.485a1,1,0,0,0,0,1.415,3,3,0,0,0,4.243,0l5.657-5.657A3,3,0,0,0,36.244,26.344Z"></path><path d="M42.982,12.088a.963.963,0,0,0,.3-.62l.71-6.36a.983.983,0,0,0-1.1-1.1l-6.36.71a.963.963,0,0,0-.62.3L25.372,16.244l6.176,6.579Z"></path><path d="M6.553,37.21a3.423,3.423,0,0,1-.8.58l-.36.17a2.5,2.5,0,0,0-.66,4.01l1.3,1.3A2.505,2.505,0,0,0,7.8,44a2.693,2.693,0,0,0,.4-.03,2.456,2.456,0,0,0,1.83-1.35l.2-.4a3.249,3.249,0,0,1,.57-.78l4.49-4.49-4.24-4.24Z"></path><path d="M13.171,26.344a1,1,0,0,0-1.415,0,3,3,0,0,0,0,4.243l5.657,5.657a3,3,0,0,0,4.243,0,1,1,0,0,0,0-1.415Z"></path>
		</svg>
		<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="fa">
			<title>Leaderboard</title>
			<path class="cls-1" d="M32,30h10c1.105,0,2,.895,2,2v14c0,1.105-.895,2-2,2h-10v-18Z"></path><path class="cls-1" d="M6,24h10v24H6c-1.105,0-2-.895-2-2v-20c0-1.105.895-2,2-2Z"></path><path class="cls-1" d="M20,18h8c1.105,0,2,.895,2,2v28h-12v-28c0-1.105.895-2,2-2Z"></path><path class="cls-1" d="M27.977,9h.023c2.481,0,4.5-2.019,4.5-4.5,0-1.379-1.122-2.5-2.5-2.5h-1V.9c0-.497-.403-.9-.9-.9h-8.2c-.497,0-.9.403-.9.9v1.1h-1c-1.378,0-2.5,1.121-2.5,2.5,0,2.481,2.019,4.5,4.5,4.5h.023c.619.819,1.481,1.439,2.477,1.758v1.242c0,.552-.448,1-1,1h-.5c-1.377,0-2.493,1.112-2.5,2.487-.001.279.22.513.5.513h10c.28,0,.501-.233.5-.513-.007-1.375-1.123-2.487-2.5-2.487h-.5c-.552,0-1-.448-1-1v-1.242c.997-.319,1.859-.94,2.477-1.758ZM29,6v-2h1c.276,0,.5.225.5.5,0,1.054-.658,1.953-1.583,2.32.045-.268.083-.539.083-.82ZM17.5,4.5c0-.275.224-.5.5-.5h1v2c0,.281.038.552.083.82-.925-.367-1.583-1.266-1.583-2.32Z"></path><rect class="cls-1" x="36" y="7" width="4" height="2" rx="1" ry="1"></rect><rect class="cls-1" x="8" y="7" width="4" height="2" rx="1" ry="1"></rect><rect class="cls-1" x="36.156" y="10.788" width="2" height="4" rx="1" ry="1" transform="translate(12.431 43.329) rotate(-70)"></rect><rect class="cls-1" x="9.844" y="1.212" width="2" height="4" rx="1" ry="1" transform="translate(4.117 12.304) rotate(-70)"></rect><rect class="cls-1" x="35.156" y="2.212" width="4" height="2" rx="1" ry="1" transform="translate(1.142 12.902) rotate(-20)"></rect><rect class="cls-1" x="8.844" y="11.788" width="4" height="2" rx="1" ry="1" transform="translate(-3.72 4.48) rotate(-20)"></rect>
		</svg>
		<svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="fa">
			<title>Settings</title>
			<path d="M22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7   L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7   l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9   c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7   C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z" id="settings"></path>
		</svg>
	</div>
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