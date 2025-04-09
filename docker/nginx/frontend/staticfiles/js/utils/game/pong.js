import { Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, MeshBasicMaterial, Mesh, Clock } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import Scoreboard from './scoreboard.js';
import { navigateTo } from '../../app.js';
import { uploadToBlockchain } from '../blockchain/blockchain.js';

export function pongGame(numPlayers, p1username, versus, tournament_id, p1AI, p2AI, p3AI, p4AI)
{
	// check requirements
	if (p1username != "AI" && p1username != "local" && p1username == versus)
	{
		navigateTo('/options_game');
		return (1);
	}
	// set scene
	const scene = new Scene();
	const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
	const mapSizes = {
		width: 0,
		height: 0
	};
	const renderer = new WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animate);
	document.getElementById('game').appendChild( renderer.domElement );
	const winScore = 3;

	// FOR TESTING (camera movment)
	const controls = new OrbitControls(camera, renderer.domElement);
	
	// set capsules (paddles) && do first prediction if they are AI (for the first random ball direction)
	let paddle3;
	let paddle4;
	
	if (numPlayers == 2)
	{
		mapSizes.width = 20;
		mapSizes.height = 12;
		
		camera.position.z = 12;
		camera.position.y = 9;
		camera.lookAt(0, 0, 0);
	}
	else if (numPlayers == 4)
	{
		mapSizes.width = 30;
		mapSizes.height = 18;
		
		camera.position.z = 18;
		camera.position.y = 13;
		camera.lookAt(0, 0, 0);
		
		paddle3 = new Paddle(scene, mapSizes, 0x00ff00, (-(mapSizes.width / 2) * 0.66), p3AI);
		paddle4 = new Paddle(scene, mapSizes, 0xff00ff, (mapSizes.width / 2 * 0.66), p4AI);
	}
	else
	{
		navigateTo('/options_game');
		return (1);
	}	
	const paddle1 = new Paddle(scene, mapSizes, 0x0000ff, -(mapSizes.width / 2), p1AI);
	const paddle2 = new Paddle(scene, mapSizes, 0xff0000, mapSizes.width / 2, p2AI);
	
	// set plane (floor)
	const planeGeo = new PlaneGeometry(mapSizes.width, mapSizes.height, mapSizes.width, mapSizes.height);
	planeGeo.rotateX(-Math.PI / 2);
	const planeMaterial = new MeshBasicMaterial({
		color: 0xffffff,
	});
	const plane = new Mesh(planeGeo, planeMaterial);
	plane.position.y -= 1;
	scene.add(plane);

	// set movment functions
	document.addEventListener("keydown", event => {
		if (!paddle1.isAi)
		{
			if (event.key == "w")
				paddle1.setNewPos(true);
			else if (event.key == "s")
				paddle1.setNewPos(false);
		}
		if (!paddle2.isAi)
		{
			if (event.key == "ArrowUp")
				paddle2.setNewPos(true);
			else if (event.key == "ArrowDown")
				paddle2.setNewPos(false);
		}
		if (paddle3 != undefined && !paddle3.isAi)
		{
			if (event.key == "i")
				paddle3.setNewPos(true);
			else if (event.key == "k")
				paddle3.setNewPos(false);
		}
		if (paddle4 != undefined && !paddle4.isAi)
		{
			if (event.code == "Numpad8")
				paddle4.setNewPos(true);
			else if (event.code == "Numpad5")
				paddle4.setNewPos(false);
		}
	});
			
	// set Scordeboard
	const scoreboard = new Scoreboard(scene, 4, 0.5, paddle1, paddle2, paddle3, paddle4);
			
	// set sphere (ball)
	let ball = new Ball(scene, mapSizes, scoreboard, paddle1, paddle2, paddle3, paddle4);
			
	//delta TIME
	const clock = new Clock();

	function animate() {

		const deltaTime = clock.getDelta();

		controls.update();
		paddle1.update();
		paddle2.update();
		if (paddle3 != undefined && paddle4 != undefined)
		{
			paddle3.update();
			paddle4.update();
		}
		if (ball.update(deltaTime))
		{
			if (scoreboard.p1Score >= winScore || scoreboard.p2Score >= winScore )
			{
				const results = {};
				if (scoreboard.p1Score >= winScore )
					results.winner = p1username;
				else
					results.winner = versus;

				results.score_player1 = scoreboard.p1Score;
				results.score_player2 = scoreboard.p2Score;
				// wait a little bit if you want
				setTimeout(() => {
					renderer.setAnimationLoop(null);
					endGame(versus, tournament_id, results);
				}, 100);
			}
			ball.mesh.removeFromParent();
			ball = new Ball(scene, mapSizes, scoreboard, paddle1, paddle2, paddle3, paddle4);
		}
		renderer.render(scene, camera);

		if (window.location.pathname != '/game')
			renderer.setAnimationLoop(null);
	}

	async function endGame(versus, tournament_id, results)
	{
		// show winner to user
		document.getElementById("modal_container").classList.add("show");
		document.getElementById("modal-content").innerHTML = `
		<div class="screw-container">
		<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
		<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
		</div>
		<div class="d-flex flex-column justify-content-center align-items-center">
		<h1 class="pixel-font title">
		<span>AND THE WINNER</span><span>${numPlayers == 2 ? " IS" : "S ARE"}</span>
		</h1>
		<h1 class="pixel-font winnerText">
		<span style="color: ${results.winner == p1username ? "#0000FF" : "#FF0000"};">${results.winner == p1username ? p1username : (versus == "localhost" ? "player_2" : versus)}</span>
		<span class="${numPlayers == 2 ? "d-none" : "d-block"}"><span> & </span><span style="color: ${results.winner == p1username ? "#00FF00" : "#FF00FF"};">${results.winner == p1username ? "player_3" : "player_4"}</span>
		</span>
		</h1>
			</div>
			<a id="a1" href="javascript:void(0);" style="height: 50px; font-size: 20px;" class="pixel-font mt-1 mb-3">NEXT!</a>
			<div class="screw-container">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				<img src="./staticfiles/js/utils/images/screw_head.png" alt="screw">
				</div>
				
				<div class="modal-container" id="modal_container">
				<div id="modal-content" class="modal-content"></div>
				</div>
				`;
				
				// get game on z-index -1 for confetti
				document.getElementById("game").style.zIndex = "-1";
				
				//confetti
		do_confetti();
		
		// petition to server 4 match

		document.getElementById("modal_container").addEventListener("click", async function activate(e) {
			if (e.target.id === "a1") {
				const token = localStorage.getItem('access_token');
				document.getElementById("modal_container").classList.remove("show");
				document.getElementById("modal_container").removeEventListener('click', activate);
				
				try {
					const response = await fetch('/api/create-match', {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							"player1_username": p1username,
							"player2_username": versus,
							"winner_username": results.winner,
							"score_player1": results.score_player1,
							"score_player2": results.score_player2,
							"tournament_id": tournament_id
						}),
					});
					
					if (!response.ok) {
						const err_msg = await response.json().catch(() => new Error("The match could not be stored correctly."));
						throw Error(err_msg);
					}
				} catch (err) {
					console.error(err);
				}
				if (numPlayers > 2) {
					const players = {
						'player1' : p1username,
						'player2' : p2AI === true ? "AI" : "local",
						'player3' : p3AI === true ? "AI" : "local",
						'player4' : p4AI === true ? "AI" : "local",
					}			
					uploadToBlockchain(p1username, versus, results, null, players);
				} else {
					uploadToBlockchain(p1username, versus, results, tournament_id, null);
				}
				if (tournament_id != null) {
					try {
						const response = await fetch('/api-tournament/handle-tournament', {
							method: 'PUT',
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								"tournament_id": tournament_id,
								"winner": results.winner == p1username ? 1 : 2,
							}),
						});
						
						if (!response.ok) {
							const err_msg = await response.json().catch(() => new Error("The match could not be stored correctly."));
							throw Error(err_msg);
						}
					} catch (err) {
						console.error(err);
					}
				}
				
				if (tournament_id != null)
					navigateTo('/tournament');
				else
					navigateTo('/home');
			}
		});
	}

	return (0);
}

export function do_confetti() {
	const confettiCanvas = document.getElementById("confetti");
	const ctx = confettiCanvas.getContext("2d");
	
	confettiCanvas.width = window.innerWidth;
	confettiCanvas.height = window.innerHeight;
			
			
	const confettis = [];
	const colors = ["#FF007A", "#7A00FF", "#00FF7A", "#FFD700", "#00D4FF"];

	for (let i = 0; i < 200; i++) {
		createConfetti(confettis, confettiCanvas, colors);
	}
	animateConfetti(ctx, confettis, confettiCanvas);	
}

function createConfetti(confettis, confettiCanvas, colors) {
	const confetti = {
		x: Math.random() * confettiCanvas.width,
		y: Math.random() * confettiCanvas.height - confettiCanvas.height,
		size: Math.random() * 10 + 5,
		color: colors[Math.floor(Math.random() * colors.length)],
		speedX: Math.random() * 3 - 1.5,
		speedY: Math.random() * 5 + 2,
		rotation: Math.random() * 360
	};
	confettis.push(confetti);

}

function animateConfetti(ctx, confettis, confettiCanvas) {
	ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
	confettis.forEach((confetti, index) => {
		confetti.x += confetti.speedX;
		confetti.y += confetti.speedY;
		confetti.rotation += confetti.speedX;
		
		ctx.save();
		ctx.translate(confetti.x, confetti.y);
		ctx.rotate((confetti.rotation * Math.PI) / 180);
		ctx.fillStyle = confetti.color;
		ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
		ctx.restore();
		
		if (confetti.y > confettiCanvas.height) {
			confettis.splice(index, 1);
		}
	});
	
	if (confettis.length > 0) {
		requestAnimationFrame(() => animateConfetti(ctx, confettis, confettiCanvas));
	}
}