import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { MeshBasicMaterial, Mesh, Color } from 'three';

export default class Scoreboard {
	constructor(scene, height, depth, paddle1, paddle2, paddle3, paddle4) {
		this.loader = new FontLoader();

		this.scene = scene;
		this.height = height;
		this.depth = depth;
		this.size = 3

		if (!paddle3) {
			this.p1Color = new Color(paddle1.hexColor);
			this.p2Color = new Color(paddle2.hexColor);
		}
		else {
			this.p1Color = new Color().addColors(new Color(paddle1.hexColor), new Color(paddle3.hexColor));
			this.p2Color = new Color().addColors(new Color(paddle2.hexColor), new Color(paddle4.hexColor));
		}

		this.p1Score = 0;
		this.p2Score = 0;

		this.loadStartScore();
	}

	loadP1Score() {
		this.loader.load("./staticfiles/js/utils/game/fonts/Press_Start_2P.json", (font) => {

			const geo = new TextGeometry(this.p1Score.toString(), {
				font: font,
				size: this.size,
				depth: this.depth,
				curveSegments: 12,
			});
			const material = new MeshBasicMaterial({
				color: this.p1Color,
			});
			this.p1Mesh = new Mesh(geo, material);
			this.p1Mesh.position.y = this.height;
			this.p1Mesh.position.x = -5.5;
			this.scene.add(this.p1Mesh);
		});
	}

	loadDash() {
		this.loader.load("./staticfiles/js/utils/game/fonts/Press_Start_2P.json", (font) => {

			const geo = new TextGeometry("-", {
				font: font,
				size: 2,
				depth: this.depth,
				curveSegments: 12,
			});
			const material = new MeshBasicMaterial({
				color: new Color().addColors(this.p1Color, this.p2Color),
			});
			const mesh = new Mesh(geo, material);
			mesh.position.y = this.height + 0.8;
			mesh.position.x = -1.6
			this.scene.add(mesh);
		});
	}

	loadP2Score() {
		this.loader.load("./staticfiles/js/utils/game/fonts/Press_Start_2P.json", (font) => {

			const geo = new TextGeometry(this.p2Score.toString(), {
				font: font,
				size: this.size,
				depth: this.depth,
				curveSegments: 12,
			});
			const material = new MeshBasicMaterial({
				color: this.p2Color,
			});
			this.p2Mesh = new Mesh(geo, material);
			this.p2Mesh.position.y = this.height;
			this.p2Mesh.position.x = 1.4;
			this.scene.add(this.p2Mesh);
		});
	}

	loadStartScore() {
		this.loadP1Score();
		this.loadDash();
		this.loadP2Score();
	}

	upgradeP1Score() {
		this.p1Mesh.removeFromParent();
		this.p1Score++;
		this.loadP1Score();
	}

	upgradeP2Score() {
		this.p2Mesh.removeFromParent();
		this.p2Score++;
		this.loadP2Score();
	}
}
