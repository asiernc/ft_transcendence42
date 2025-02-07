import { Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, MeshBasicMaterial, Mesh, Clock } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import Scoreboard from './scoreboard.js';

export function pongGame(numPlayers, p1AI, p2AI, p3AI, p4AI)
{
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
		console.log("Error: Only available for 2 or 4 players");
		return (1);
	}
		
	const paddle1 = new Paddle(scene, mapSizes, 0x0000ff, -(mapSizes.width / 2), p1AI);
	const paddle2 = new Paddle(scene, mapSizes, 0xff0000, mapSizes.width / 2, p2AI);
	
	// set plane (floor)
	const planeGeo = new PlaneGeometry(mapSizes.width, mapSizes.height, mapSizes.width, mapSizes.height);
	planeGeo.rotateX(Math.PI / 2);
	const planeMaterial = new MeshBasicMaterial({
		color: 0xffffff,
		wireframe: true,
	});
	const plane = new Mesh(planeGeo, planeMaterial);
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
	const scoreboard = new Scoreboard(scene, 0xffffff, 4, 0.5);
			
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
			ball.mesh.removeFromParent();
			ball = new Ball(scene, mapSizes, scoreboard, paddle1, paddle2, paddle3, paddle4);
		}

		renderer.render(scene, camera);
	}

	return (0);
}