import { navigateTo } from "../app.js";
import { ws } from "../app.js";
import { displayAlert } from "../utils/alert.js";


export default class ProfileComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.render();
	}

	async render() {
		while (this.shadowRoot.firstChild) {
			this.shadowRoot.removeChild(this.shadowRoot.firstChild);
		}

		const style = document.createElement("style");
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
				0% {background-position: 0% 50%;}
				50% {background-position: 100% 50%;}
				100% {background-position: 0% 50%;}
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
		/*.title{ //A LA MIERDA ESTA
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin-top: 3%;
		}*/

		.pfp{
			margin-left: 3px;
			width: 170px;
			height: 170px;
		}
			.pfp img{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

		.name{
			white-space: nowrap;
			padding-left: 18px;
			padding-bottom: 18px;
			color: white;
		}
		.stats{
			display: flex;
			justify-content: space-around;
			width: 50%;
			padding: 0.5%
		}

		.friend{
			display: flex;
			padding: 10px;
			border-top: 1px solid black;
			justify-content: space-between;
			align-items: center;
			height: 75px;
			font-family: "Press Start 2P", Arial;
		}
			.friend h2:hover{
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

		.pfp-container {
			display: inline-block;
			position: relative;
			width: 60px;
			height: 60px;
			overflow: hidden;
		}
		.pfp-container img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.online-status{
			position: absolute;
			bottom: 1px;
			right: 1px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background-color: green;
		}
		.clickable-img{
			cursor: pointer;
			width: 30px;
		}
			.clickable-img:hover{
				transform: translateY(-2px);
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
		.bad{
			background-color: #EE7C7C;
			border: 5px solid #701717;
			color: 'white';
		}
        `;

		const userData = await this.getUserInfo();
		console.log(userData);
		this.calculateStats(userData);
		let match_history = "";
		let matchCount = 0;
		userData["matches"].forEach((match) => {
			if (++matchCount > 5) {
				return;
			}
			match_history += `
				<tr class="history_scores">
					<td>${match["score_player1"]}</td>
					<td> <div class="pfp-container" style="width: 80px; height: 80px; box-shadow: 3px 3px 8px 0 ${match["winner_username_read"] == match["player1_username_read"] ? "green" : "red"};">
						<img src="${this.cleanProfilePictures(undefined, match["player1_avatar"])}" title="${match["player1_username_read"]}">
						</div>
					</td>
					<td>vs</td>
					<td> <div class="pfp-container" style="width: 80px; height: 80px; box-shadow: 3px 3px 8px 0 ${match["winner_username_read"] == match["player2_username_read"] ? "green" : "red"};">
						<img src="${this.cleanProfilePictures(undefined, match["player2_avatar"])}" title="${match["player2_username_read"]}">
						</div>
					</td>
					<td>${match["score_player2"]}</td>
				</tr>
				<tr class="history_dates">
					<td colspan="5"  style="text-align: center;">${match["played_at"].split("T")[0]}</td>
				</tr>
			`;
		});
		if (match_history === "") {
			match_history = "No matches played";
		}

		userData["user"]["avatar_field"] = this.cleanProfilePictures(userData["user"]["avatar_42_url"],userData["user"]["avatar_field"]);
		let editButton = "";
		if (localStorage.getItem("username") === userData["user"]["username"] && !userData['user']['intra_user']) {
			editButton = `<div style="display:flex; align-items: flex-start">
					<button class="pixel-font" style="margin-right: 20px;" id="editProfile">Edit Profile</button>
				</div>`;
		}
		if (!userData["user"]["first_name"]) {userData["user"]["first_name"] = '';}
		if (!userData["user"]["last_name"]) {userData["user"]["last_name"] = '';}

		const div = document.createElement("div");
		div.innerHTML = `
	<div style="width: 80%; display: flex; justify-content: space-between">
		<div style="display:flex;">
			<div class="pfp" style="margin-right: 20px;">
				<img src="${userData["user"]["avatar_field"]}" id="usr_img">
			</div>
			<div class="name">
				<h1 class="pixel-font" style="font-size: 40px">${userData["user"]["first_name"]} ${userData["user"]["last_name"]}</h1>
				<h3 class="pixel-font" style="font-size: larger;">${userData["user"]["username"]}</h3>
			</div>
		</div>
		${editButton}
	</div>
	<div class="box stats">
		<span class="pixel-font" style="font-size: larger;" title="Wins/Losses">W/L: ${userData["user"]["wins"]}/${userData["user"]["losses"]}</span>
		<span class="pixel-font" style="font-size: larger;">Win Rate: ${userData["user"]["ratio"]}</span>
	</div>
	<div style="width: 80%; text-align: center; display: flex; justify-content: space-between; align-items:flex-start;">
		<div class="box" style="width: 55%;">
			<div class="screw-container">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			<h1 class="pixel-font">MATCH HISTORY</h1>
			<table style="width: 90%; margin: auto;" id="match_history">
				${match_history}
			</table>
			<div class="screw-container">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
		</div>
		<div class="box" style="width: 35%;">
			<div class="screw-container">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			<div style="display:flex; justify-content: space-around; align-items: center;">
				<h1 class="pixel-font" style="margin-left: 20%;">FRIENDS</h1>
				<img class="clickable-img" id="reloadFriends" src="https://www.freeiconspng.com/thumbs/reload-icon/arrow-refresh-reload-icon-29.png" title="Reload status">
			</div>
			<div id="friendsContainer">
			</div>
			<div class="screw-container">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="../staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
		</div>
	</div>
        `;
		this.shadowRoot.appendChild(style);
		div.className = "bg";
		this.shadowRoot.appendChild(div);

		await this.loadFriends(userData);
		if (ws){
			ws.onmessage = (async () => {
				await this.loadFriends(null);
				this.attachFriendsListeners();
			});
		}
		this.attachListeners();
		this.attachFriendsListeners();
	}

	attachListeners() {
		this.editProfile = this.shadowRoot.getElementById("editProfile");
		if (this.editProfile){
			this.editProfile.addEventListener("click", () => {
				navigateTo("/profile_edit");
			});
		}
		this.reload = this.shadowRoot.getElementById("reloadFriends");
		this.reload.addEventListener("click", async () => {
			await this.loadFriends(null);
			this.attachFriendsListeners();
		});
	}

	attachFriendsListeners(){
		let unfriend = this.shadowRoot.querySelectorAll(".unfriend");
		unfriend.forEach((button) => {
			button.addEventListener("click", async () => {
				const userId = button.dataset.username;
				const token = localStorage.getItem("access_token");
				try {
					const response = await fetch("/api/delete-friend", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ friend_username: userId }),
					});
					if (response.ok) {
						displayAlert("Profile updated correctly!!", "good");
						this.shadowRoot.getElementById("friend" + userId).style.display = "none";
					} else {
						throw new Error("Error removing friend :(");
					}
				} catch (error) {
					displayAlert("Couldn't remove friend :(", "bad");
				}
			});
		});


		let friendNames = this.shadowRoot.querySelectorAll(".friendName");
				friendNames.forEach((button) => {
					button.addEventListener("click", () => {
						const userId = button.dataset.username;
						navigateTo("/profile/" + userId);
					});
				});
				this.shadowRoot.querySelectorAll(".versus").forEach((button) => {
					button.addEventListener("click", function (){
						const userId = button.dataset.username;
						let path = '/game?players=2';
						path += "&player1="+localStorage.getItem("username") + "&vs="+userId;
						path += "&player1AI=false&player2AI=false&player3AI=false&player4AI=false";
						console.log(path);
						navigateTo(path);
					});
        });
	}

	disconnectedCallback() {
		if (this.editProfile)
			this.editProfile.removeEventListener("click", this);
	}

	cleanProfilePictures(avatar_42, avatar) {
		if (avatar_42) {
			return avatar_42;
		}
		if (!avatar) {
			return "https://res.cloudinary.com/teepublic/image/private/s--lJJYqwRw--/c_crop,x_10,y_10/c_fit,w_1109/c_crop,g_north_west,h_1260,w_1260,x_-76,y_-135/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-76,y_-135/bo_0px_solid_white/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1606803363/production/designs/16724317_0.jpg";
		}
		return avatar;
	}

	calculateStats(user){
		let wins = 0;
		let losses = 0;
		user['matches'].reverse();
		for (let match of user['matches']){
			wins += match['winner_username_read'] == user['user']['username'];
			losses += match['winner_username_read'] != user['user']['username'];
		}
		user['user']['wins'] = wins;
		user['user']['losses'] = losses;
		user['user']['matches'] = wins+losses;
		user['user']['ratio'] = (wins / (wins+losses) * 100).toFixed(1) + "%";
		if (wins+losses == 0){
			user['user']['ratio'] = "0%";
		}
	}

	async loadFriends(usr){
		const cont = this.shadowRoot.getElementById("friendsContainer");
		cont.innerHTML = '';
		if (!usr){
			usr = await this.getUserInfo()
		}
		usr['friends'].forEach((friend) => {
			friend["avatar_field"] = this.cleanProfilePictures(friend["avatar_42_url"],friend["avatar_field"]);
			let friendBtns = '<div style="margin-left: auto;"></div>';
			if (localStorage.getItem("username") === usr["user"]["username"]) {
				friendBtns = `
				<div style="margin-left: auto; flex-shrink: 0;">
					<img src="https://cdn-icons-png.flaticon.com/512/842/842184.png" class="versus clickable-img" data-username="${friend["username"]}" style="width: 40px; height: 40px;" title="Match">
					<img src="https://cdn-icons-png.flaticon.com/512/8184/8184225.png" class="unfriend clickable-img" data-username="${friend["username"]}" style="width: 40px; height: 40px;" title="Unfriend">
				</div>`;
			}
			const row = document.createElement('div');
			row.className = 'friend';
			row.id = 'friend'+friend["username"];
			row.innerHTML += `
				<label class="pfp-container" style="flex-shrink: 0;">
					<img src="${friend["avatar_field"]}" width="60px">
					<div class="online-status" style="background-color: ${friend["online_status"] ? "green" : "orange"}"></div>
				</label>
				<h2 style="padding-left: 3%; overflow: hidden; flex-shrink: 1;" class="friendName" data-username="${friend["username"]}">${friend["username"]}</h2>
				${friendBtns}
			`;
			cont.appendChild(row);
		});
	}

	async getUserInfo() {
		const username = localStorage.getItem("username");
		const refreshToken = localStorage.getItem("refresh_token");
		if (!refreshToken || !username) {
			console.error("no refresh token or username, gonna log out");
			//navigateTo('logout');
		}

		await fetch("/api/refresh-tokens", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh_token: refreshToken }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.access_token) {
					localStorage.setItem("access_token", data.access_token);
				} else {
					console.error("Refresh token invalid, user must log in again.");
					//navigateTo('logout');
				}
			});

		let usr = window.location.pathname.substring(9);
		const token = localStorage.getItem("access_token");
		try {
			const response = await fetch(`/api/profile/${usr}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			// if (data['error']){
			// 	navigateTo('/notfound');
			// }
			return data;
		} catch (err) {
			console.error("Error: Problem sending the petition");
		}
	}
}

window.customElements.define("profile-component", ProfileComponent);
