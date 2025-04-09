import { navigateTo } from "../app.js";
import { displayAlert } from "../utils/alert.js";

export default class LeaderboardComponent extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.render();

		// this.attachListeners();
	}

	async render() {
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
	.pixel-font {
            font-family: "Press Start 2P", Arial;
		}
	table{
		border-collapse: separate;
		border-spacing: 0;
	}
	td{
		overflow: hidden;
		padding: 5px;
		padding-left: 15px;
		border-bottom: 2px solid rgb(34, 32, 24);
	}
	th{
		text-align: left;
		padding-left: 15px;
		font-size: larger;
		font-family: "Press Start 2P", Arial;
		color: white;
	}
	tr{
		font-family: "Press Start 2P", Arial;
	}

	input{
		background: none;
		border-width: 0 0 1px;
		height: 35px;
		border-color: rgb(0, 0, 0);
		/* transition: all 0.5s; */
	}
	input::placeholder{
		font-size: larger;
		font-family: "Press Start 2P", Arial;
		color: white;
	}
		input:focus{
			border-color: rgb(97, 3, 3);
			border-width: 0 0 2px;
			border-radius: 5px 5px 0 0;
			outline: none;
		}
		input:focus::placeholder{
			color: rgb(97, 3, 3);
		}

	.clickable-img{
		cursor: pointer;
		width: 30px;
	}
		.clickable-img:hover{
			transform: translateY(-2px);
		}
		.tbname:hover{
			text-decoration: underline;
			cursor: pointer;
		}
	.pane{
		color: white;
		padding: 2%;
		cursor: pointer;
		margin-bottom: 0;
	}
	.selected{
		background-color: #97ED93;
		border: 5px solid #1E6C1A;
		border-bottom: 0;
		color: #1E6C1A;
		fill: #1E6C1A;
	}
	.screw-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		height: 30px;
	}
	.box{
		background-color: rgba(217, 217, 217, 0.548);
		border-radius: 3px;
		border: 4px solid #31353C;
		padding: 1%;
		width: 70%;
	}
	.pfp-container {
		width: 70px;
		height: 70px;
		overflow: hidden;
	}
	.pfp-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
        `;

		const users = await this.getUsersGlobal();
		this.assignStats(users);

		users["user"]["avatar_field"] = this.cleanProfilePictures(users["user"]["avatar_42_url"],users["user"]["avatar_field"]);
		const div = document.createElement("div");
		div.innerHTML = /*ht ml*/ `
			<table style="width: 50%; margin-left: auto; margin-right: auto;" id="user">
				<tbody>
				<tr style="border: none; background-color: rgba(217, 217, 217, 0.548);">
					<td>
						<div class="pfp-container">
							<img src="${users["user"]["avatar_field"]}">
						</div>
					</td>
					<td>${users["user"]["username"]}</td>
					<td>${users["user"]["matches"]}</td>
					<td>${(users["user"]["ratio"])}</td>
				</tr>
				</tbody>
			</table>
			<div style="display: flex; flex-direction:column; gap: 0; width: 100vw;">
				<div style="display: flex; justify-content: center; gap: 5rem;">
					<h1 class="pixel-font pane" id="globallb">Global</h1>
					<h1 class="pixel-font pane selected" id="friendslb">Friends</h1>
					<!-- <input type="text" id="search" size="50" placeholder="Search..." /> -->
				</div>
				<hr style="margin-top: 0; width: 90%; border: 2px solid #1E6C1A;">
			</div>
			<div class="box">
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			<table style="width: 90%; margin-left: auto; margin-right: auto;" id="global_leaderboard">
				${this.generateTable()}
			</table>
			<table style="width: 90%; margin-left: auto; margin-right: auto;" id="friends_leaderboard">
				${this.generateTable()}
			</table>
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			</div>
        `;
		this.shadowRoot.appendChild(style);
		div.className = "bg";
		this.shadowRoot.appendChild(div);
		await this.tableUsers(users, false);

		this.attachListeners();
		this.shadowRoot.getElementById("globallb").click();
	}

	attachListeners() {
		this.globallb = this.shadowRoot.getElementById("globallb");
		this.friendslb = this.shadowRoot.getElementById("friendslb");
		this.globallb.addEventListener("click", () => {
			if (this.globallb.classList.contains("selected")){
				return;
			}
			this.globallb.classList.toggle("selected");
			this.friendslb.classList.toggle("selected");
			this.shadowRoot.getElementById("friends_leaderboard").style.display ="none";
			this.shadowRoot.getElementById("global_leaderboard").style.display ="table";
		});
		this.friendslb.addEventListener("click", () => {
			if (this.friendslb.classList.contains("selected")){
				return;
			}
			this.globallb.classList.toggle("selected");
			this.friendslb.classList.toggle("selected");
			this.shadowRoot.getElementById("friends_leaderboard").style.display = "table";
			this.shadowRoot.getElementById("global_leaderboard").style.display = "none";
		});
		this.shadowRoot.querySelectorAll(".tbname").forEach((button) => {
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
				path += `&player1AI=false&player2AI=${userId === 'AI' ? 'true' : 'false'}&player3AI=false&player4AI=false`;
				
				navigateTo(path);
			});
        });
		this.shadowRoot.querySelectorAll(".friend-btn").forEach((button) => {
			button.addEventListener("click", async () => {
				const userId = button.dataset.username;
				
				const token = localStorage.getItem("access_token");
				try {
					const response = await fetch("/api/add-friend", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ friend_username: userId }),
					});
					if (response.ok) {
						displayAlert("Friend added successfully!!", "good");
						button.style.display='none';
						await this.tableUsers(null, true);
					} else {
						throw new Error("Error adding friend :(");
					}
				} catch (error) {
					displayAlert(error.message, "bad");
				}
			});
		});
	}

	disconnectedCallback() {
		this.friendslb.removeEventListener("click", this);
		this.globallb.removeEventListener("click", this);
	}

	assignStats(users){
		function compare(u1, u2){
			if (u1['ratio'] < u2['ratio']){
				return 1;
			}
			if (u1['ratio'] > u2['ratio']){
				return -1;
			}
			if (u1['matches'] < u2['matches']){
				return 1;
			}
			if (u1['matches'] > u2['matches']){
				return -1;
			}
			return 0;
		}

		for (let user of users['all_users']){
			user['matches'] = user['wins'] + user['losses'];
			if (user['matches'] != 0){
				user['ratio'] = user['wins'] / (user['wins'] + user['losses']) * 100;
			}else{
				user['ratio'] = 0;
			}
			if (user['username'] === localStorage.getItem("username")){
				users["user"]["matches"] = user["matches"];
				// let value = user["ratio"];
				// 
				users["user"]["ratio"] = user["ratio"].toFixed(2) + "%";
			}
		}
		users['all_users'].sort(compare);
		for (let user of users['all_users']){
			user['ratio'] = user['ratio'].toFixed(1) + "%";
		}
	}

	generateColors(i = 4) {
		const BGcolors = ["EE7C7C", "7AA3EA", "97ED93", "D6CA73"];
		const BRcolors = ["701717", "163977", "1E6C1A", "60560E"];
		switch (i) {
			case 1:
				return `background-color: #FFD700; color:rgb(99, 85, 5); border-bottom: 2px solid rgb(99, 85, 5);`;
			case 2:
				return `background-color:rgb(212, 204, 204); color:rgb(78, 78, 78); border-bottom: 2px solid rgb(78, 78, 78);`;
			case 3:
				return `background-color: #CD7F32; color:rgb(83, 53, 22); border: 0px; border-bottom: 2px solid rgb(83, 53, 22);`;
		}

		const num = Math.floor(Math.random() * BGcolors.length);
		return `background-color: #${BGcolors[num]}; color: #${BRcolors[num]};`; // border-bottom: 2px solid #${BRcolors[num]};`;
	}

	async tableUsers(users, refetch=false){
		const friendsTable = this.shadowRoot.getElementById("friends_leaderboard");
		const globalTable = this.shadowRoot.getElementById("global_leaderboard");
		if (!users || refetch){
			users = await this.getUsersGlobal();
			this.assignStats(users);
			friendsTable.innerHTML = this.generateTable();
		}
		let fi = 1;
		let gi = 1;
		users['all_users'].forEach((user) => {
			user["avatar_field"] = this.cleanProfilePictures(user["avatar_42_url"],user["avatar_field"]);
			if (user["username"] == "local" || user["username"] == "AI") {
				return;
			}
			const row = document.createElement('tr');
			row.style = this.generateColors(gi);
			row.id = 'tb'+user["username"];
			row.innerHTML = `
				<td id="position">#${gi}</td>
				<td>
					<div class="pfp-container">
						<img src="${user["avatar_field"]}">
					</div>
				</td>
				<td class="tbname" data-username="${user["username"]}">${user["username"]}</td>
				<td>${user['matches']}</td>
				<td>${user['ratio']}</td>
				<td>
					${user['username'] == localStorage.getItem("username") ? "" : `<img class="clickable-img match-btn versus" data-username="${user["username"]}" src="https://cdn-icons-png.flaticon.com/512/842/842184.png">`}
					${this.checkAlreadyFriend(users["friends"], user["username"]) ? "" : `<img class="clickable-img friend-btn" data-username="${user["username"]}" src="https://cdn-icons-png.flaticon.com/512/4458/4458537.png">`}
				</td>
			`;
			if (!refetch){
				globalTable.appendChild(row);
			}
			if (this.checkAlreadyFriend(users["friends"], user["username"])){
				const clone = row.cloneNode(true);
				clone.style = this.generateColors(fi);
				clone.querySelector("#position").innerHTML = '#'+ fi;
				friendsTable.appendChild(clone);
				++fi;
			}
			++gi;
		});

	}

	generateTable() {
		return `<thead>
				<tr style="border-bottom: 1px solid black;">
					<th style="width: 50px;"></th>
					<th style="width: 100px;"></th>
					<th>Name </th>
					<th>Matches</th>
					<th>Win Rate</th>
					<th style="width: 50px;"></th>
				</tr>
				</thead>
				<tbody>
				</tbody>`;
	}

	checkAlreadyFriend(friends, name) {
		return (
			name === localStorage.getItem("username") ||
			friends.some((friend) => friend["username"] === name)
		);
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

	async getUsersGlobal() {
		const username = localStorage.getItem("username");
		if (!username) {
			//haz algoooo!
		}
		const token = localStorage.getItem("access_token");
		try {
			const response = await fetch(`/api/leaderboard`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			
			return data;
		} catch (err) {
			console.error("Error: Problem sending the petition");
		}
	}
}

window.customElements.define("leaderboard-component", LeaderboardComponent);
