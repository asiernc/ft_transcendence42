import { navigateTo } from "../app.js";

export default class LeaderboardComponent extends HTMLElement {
	constructor() {
		super();

        const shadow = this.attachShadow({ mode: 'open' });

		const users = [
			{"name": "Alcaball", "matches": 1000, "stats": "11 / 11 : 50%" },
			{"name": "User2", "matches": 381, "stats": "11 / 11 : 50%" },
			{"name": "Pedrito", "matches": 280, "stats": "11 / 11 : 50%" },
			{"name": "User33", "matches": 38, "stats": "11 / 11 : 50%" },
			{"name": "User5", "matches": 2, "stats": "11 / 11 : 50%" },
		];

		const style = document.createElement('style');
        style.textContent = `
		// .bg {
        //     background: linear-gradient(-45deg, #31353C, #000000, #31353C, #000000);
        //         background-size: 400% 400%;
        //         animation: gradient 10s ease infinite;
        //         height: 100vh;
        //     }

        //     @keyframes gradient {
        //         0% {
        //             background-position: 0% 50%;
        //         }
        //         50% {
        //             background-position: 100% 50%;
        //         }
        //         100% {
        //             background-position: 0% 50%;
        //         }
        //     }
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
	}
	tr{
		border-bottom: 1px solid black;
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
		font-family:  Arial;
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
        `;

		let users_table = "";
		let i = 1;
		users.forEach(user => {
			users_table += `
				<tr class="history_scores">
					<td># ${i}</td>
					<td><img src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" width="70px"></td>
					<td>${user['name']}</td>
					<td>${user['matches']}</td>
					<td>${user['stats']}</td>
					<td><img class="clickable-img" src="https://cdn-icons-png.flaticon.com/512/842/842184.png" onclick="alert('Retado a Match')"></td>
				</tr>
			`;
			++i;
		});

        const div = document.createElement('div');
        div.innerHTML = `
	<h1 style="margin-left: 10%; margin-top: 2%;">Leaderboard</h1>
	<div style="display: flex; justify-content: space-between; width: 80%; margin-left: auto; margin-right: auto; margin-bottom: 40px;">
		<input type="text" id="search" size="50" placeholder="Search..." />
	</div>
	<table style="width: 40%; margin-left: auto; margin-right: auto; margin-bottom: 100px;" id="user">
		<tbody>
			<td># 1</td>
			<td><img src="https://i.pinimg.com/236x/f4/b5/af/f4b5af3da6f9e4b90bb11d0afcf0470d.jpg" width="70px"></td>
			<td>Alcaball</td>
			<td>1000</td>
			<td>11 / 11 : 50%</td>
		</tbody>
	</table>
	<table style="width: 60%; margin-left: auto; margin-right: auto;" id="leaderboard">
		<thead>
		<tr>
			<th style="width: 40px;"></th>
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
		shadow.appendChild(style);
        div.className = 'bg';
		shadow.appendChild(div);

        // this.attachListeners();
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
}

window.customElements.define('leaderboard-component', LeaderboardComponent);