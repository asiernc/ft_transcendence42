import { navigateTo } from "../app.js";

export default class LeaderboardComponent extends HTMLElement {
	constructor() {
		super();

        this.attachShadow({ mode: 'open' });

		this.render();

        // this.attachListeners();
	}

	async render(){
		// const users = [
		// 	{"name": "alcaball2", "matches": 1000, "stats": "11 / 11 : 50%" },
		// 	{"name": "User2", "matches": 381, "stats": "11 / 11 : 50%" },
		// 	{"name": "Pedrito", "matches": 280, "stats": "11 / 11 : 50%" },
		// 	{"name": "User33", "matches": 38, "stats": "11 / 11 : 50%" },
		// 	{"name": "User5", "matches": 2, "stats": "11 / 11 : 50%" },
		// ];
		const users = await this.getUsers();

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
	.pixel-font {
            font-family: "Press Start 2P", Arial;
		}
	table{
		border-collapse: collapse;
	}
	td{
		overflow: hidden;
		background-color: rgba(217, 217, 217, 0.548);
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
		border-bottom: 1px solid black;
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
        `;

		let users_table = "";
		let i = 1;
		users['friends'].forEach(user => {
			users_table += `
			<tr class="history_scores">
				<td>#${i}</td>
				<td><img src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" width="70px"></td>
				<td onclick="alert('to profile')" class="tbname">${user['username']}</td>
				<td>${user['matches']}</td>
				<td>${user['stats']}</td>
				<td><img class="clickable-img" src="https://cdn-icons-png.flaticon.com/512/842/842184.png" onclick="alert('Retado a Match')"></td>
			</tr>
			`;
			++i;
		});
        const div = document.createElement('div');
        div.innerHTML = `
		<div style="width: 80%; margin-left: auto; margin-bottom: 40px;">
			<h1 class="pixel-font" style="color: white;">Leaderboard</h1>
			<!-- <input type="text" id="search" size="50" placeholder="Search..." /> -->
		</div>
		<table style="width: 50%; margin-left: auto; margin-right: auto; margin-bottom: 60px;" id="user">
			<tbody>
				<td>#${i}</td>
				<td><img src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" width="70px"></td>
				<td>${users['user']['username']}</td>
				<td>${users['user']['matches']}</td>
				<td>${users['user']['stats']}</td>
			</tbody>
		</table>
		<table style="width: 60%; margin-left: auto; margin-right: auto;" id="leaderboard">
			<thead>
			<tr>
				<th style="width: 50px;"></th>
				<th style="width: 100px;"></th>
				<th>Name </th>
				<th>Matches</th>
				<th>Stats</th>
				<th style="width: 50px;"></th>
			</tr>
			</thead>
			<tbody>
				${users_table}
			</tbody>
		</table>
        `;
		this.shadowRoot.appendChild(style);
        div.className = 'bg';
		this.shadowRoot.appendChild(div);
	}

    // attachListeners() {
	// 	this.versus = this.shadowRoot.getElementById('versus');
    //     this.versus.addEventListener('click', () => {
    //         navigateTo('/options_game');
    //     });
    //     this.tournament = this.shadowRoot.getElementById('tournament');
    //     this.tournament.addEventListener('click', () => {
    //         console.log("TOURNAMENT");
    //     });
	// }

	// disconnectedCallback() {
    //     this.versus.removeEventListener('click', this);
    //     this.tournament.removeEventListener('click', this);
	// }

	async getUsers(){
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

window.customElements.define('leaderboard-component', LeaderboardComponent);