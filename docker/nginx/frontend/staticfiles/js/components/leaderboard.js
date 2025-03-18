import { navigateTo } from "../app.js";

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
		border-collapse: collapse;
	}
	td{
		overflow: hidden;
		padding: 5px;
		padding-left: 15px;
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

		const users = await this.getUsers();
		const globalUsers = await this.getUsersGlobal();

		let friends_table = "";
		let i = 1;
		users["friends"].forEach((user) => {
			user["avatar_field"] = this.cleanProfilePictures(
				user["avatar_42_url"],
				user["avatar_field"],
			);
			friends_table += `
			<tr style="${this.generateColors()}">
				<td>#${i}</td>
				<td><img src="${user["avatar_field"]}" width="70px"></td>
				<td onclick="alert('to profile')" class="tbname">${user["username"]}</td>
				<td>${user["matches"]}</td>
				<td>${user["stats"]}</td>
				<td>
					<img class="clickable-img match-btn" data-username="${user["username"]}" src="https://cdn-icons-png.flaticon.com/512/842/842184.png" onclick="alert('Retado a Match')">
				</td>
			</tr>
			`;
			++i;
		});
		if (friends_table == "") {
			friends_table = `<tr><td></td><td colspan=5>YOU HAVE NO FRIENDS :( SO SAD</td></tr>`;
		}

		let global_table = "";
		i = 1;
		globalUsers.forEach((user) => {
			user["avatar_field"] = this.cleanProfilePictures(
				user["avatar_42_url"],
				user["avatar_field"],
			);
			if (
				user["username"] == "localhost" ||
				user["username"] == "IA" ||
				user["username"] == "ia"
			) {
				return;
			}
			global_table += `
			<tr style="${this.generateColors()}" class="global">
				<td>#${i}</td>
				<td><img src="${user["avatar_field"]}" width="70px"></td>
				<td onclick="alert('to profile')" class="tbname">${user["username"]}</td>
				<td>${user["matches"]}</td>
				<td>${user["stats"]}</td>
				<td>
					<img class="clickable-img match-btn" data-username="${user["username"]}" src="https://cdn-icons-png.flaticon.com/512/842/842184.png" onclick="alert('Retado a Match')">
					${this.checkAlreadyFriend(users["friends"], user["username"]) ? "" : `<img class="clickable-img friend-btn" data-username="${user["username"]}" src="https://cdn-icons-png.flaticon.com/512/4458/4458537.png">`}
				</td>
			</tr>
			`;
			++i;
		});

		users["user"]["avatar_field"] = this.cleanProfilePictures(
			users["user"]["avatar_42_url"],
			users["user"]["avatar_field"],
		);
		const div = document.createElement("div");
		div.innerHTML = /*ht ml*/ `
			<table style="width: 50%; margin-left: auto; margin-right: auto;" id="user">
				<tbody>
				<tr style="border: none; background-color: rgba(217, 217, 217, 0.548);">
					<td><img src="${users["user"]["avatar_field"]}" width="70px"></td>
					<td>${users["user"]["username"]}</td>
					<td>${users["user"]["matches"]}</td>
					<td>${users["user"]["stats"]}</td>
				</tr>
				</tbody>
			</table>
			<div style="display: flex; flex-direction:column; gap: 0; width: 100vw;">
				<div style="display: flex; justify-content: center; gap: 5rem;">
					<h1 class="pixel-font pane" id="globallb">Global</h1>
					<h1 class="pixel-font pane" id="friendslb">Friends</h1>
					<!-- <input type="text" id="search" size="50" placeholder="Search..." /> -->
				</div>
				<hr style="margin-top: 0; width: 90%; border: 2px solid #1E6C1A;">
			</div>
			<div class="box">
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			${this.generateTable(global_table, "global_leaderboard")}
			${this.generateTable(friends_table, "friends_leaderboard")}
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
			</div>
			</div>
			<div class="alert" id="successAlert">
				Friend added successfully!!
			</div>
        `;
		this.shadowRoot.appendChild(style);
		div.className = "bg";
		this.shadowRoot.appendChild(div);
		this.attachListeners();
		// Get the element with id="defaultOpen" and click on it
		this.shadowRoot.getElementById("globallb").click();
	}

	attachListeners() {
		this.globallb = this.shadowRoot.getElementById("globallb");
		this.friendslb = this.shadowRoot.getElementById("friendslb");
		this.globallb.addEventListener("click", () => {
			this.globallb.className += " selected";
			this.friendslb.className = this.friendslb.className.replace(
				" selected",
				"",
			);
			this.shadowRoot.getElementById("friends_leaderboard").style.display =
				"none";
			this.shadowRoot.getElementById("global_leaderboard").style.display =
				"table";
		});
		this.friendslb.addEventListener("click", () => {
			this.friendslb.className += " selected";
			this.globallb.className = this.globallb.className.replace(
				" selected",
				"",
			);
			this.shadowRoot.getElementById("friends_leaderboard").style.display =
				"table";
			this.shadowRoot.getElementById("global_leaderboard").style.display =
				"none";
		});

		this.shadowRoot.querySelectorAll(".friend-btn").forEach((button) => {
			button.addEventListener("click", async () => {
				const userId = button.dataset.username;
				console.log(userId);
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
					const resultAlert = this.shadowRoot.getElementById("successAlert");
					if (response.ok) {
						resultAlert.style.display = "block";
						resultAlert.className = resultAlert.className.replace(" bad", "");
						setTimeout(() => {
							resultAlert.style.display = "none";
						}, 2000);
						button.style.display = "none";
					} else {
						throw new Error("Error adding friend :(");
					}
				} catch (error) {
					const resultAlert = this.shadowRoot.getElementById("successAlert");
					resultAlert.innerText = error.message;
					resultAlert.className += " bad";
					resultAlert.style.display = "block";
					setTimeout(() => {
						resultAlert.style.display = "none";
					}, 2000);
				}
			});
		});
	}

	disconnectedCallback() {
		this.friendslb.removeEventListener("click", this);
		this.globallb.removeEventListener("click", this);
	}

	generateColors() {
		const BGcolors = ["EE7C7C", "7AA3EA", "97ED93", "D6CA73"];
		const BRcolors = ["701717", "163977", "1E6C1A", "60560E"];

		const i = Math.floor(Math.random() * BGcolors.length);
		// return "border-bottom: 1px solid black;";
		return `background-color: #${BGcolors[i]}; color: #${BRcolors[i]}; border-bottom: 2px solid #${BRcolors[i]};`;
	}

	generateTable(table, id) {
		return `<table style="width: 90%; margin-left: auto; margin-right: auto;" id="${id}">
				<thead>
				<tr style="border-bottom: 1px solid black;">
					<th style="width: 50px;"></th>
					<th style="width: 100px;"></th>
					<th>Name </th>
					<th>Matches</th>
					<th>Stats</th>
					<th style="width: 50px;"></th>
				</tr>
				</thead>
				<tbody>
					${table}
				</tbody>
			</table>`;
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
			return "https://cdn.pixabay.com/photo/2016/10/09/17/28/confidential-1726367_1280.jpg";
		}
		return avatar;
	}

	async getUsers() {
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

	async getUsersGlobal() {
		const username = localStorage.getItem("username");
		if (!username) {
			//haz algoooo!
		}
		const token = localStorage.getItem("access_token");
		try {
			const response = await fetch(`/api/get`, {
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

window.customElements.define("leaderboard-component", LeaderboardComponent);
