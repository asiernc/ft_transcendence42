import { SphereGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';

export default class Ball
{
    constructor(scene, mapSizes, scoreboard, paddle1, paddle2, paddle3, paddle4)
    {
        // general config
        this.scene = scene;
        this.mapSizes = mapSizes;
        this.radius = 0.3;
		this.acc = 1.2;
		this.speed = 5;
		this.maxSpeed = 40;
		
        // ball config
        this.geo = new SphereGeometry(this.radius, 16, 8);
        this.material = new MeshBasicMaterial({
			color: 0xffc300 ,
        });
        this.mesh = new Mesh(this.geo, this.material);
        scene.add(this.mesh);
		
		// randmoize start direction
		const randomZ = Math.random() * (Math.floor(Math.random() * 2) ? 1 : -1);
		const randomX = Math.floor(Math.random() * 2) ? 1 : -1;
		this.speedVec = new Vector3(randomX, 0, randomZ).multiplyScalar(this.speed);
		
		//save collision objects
		this.p1 = paddle1;
		this.p2 = paddle2;
		paddle1.ball = this;
		paddle2.ball = this;
		
		if (paddle3)
		{
			this.p3 = paddle3;
			this.p4 = paddle4;
			paddle3.ball = this;
			paddle4.ball = this;
		}

		this.scoreboard = scoreboard;
		
		//if there is AI call AI Predict
		if (this.p1.isAi && this.speedVec.x < 0)
			this.p1.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);
		if (this.p2.isAi && this.speedVec.x > 0)
			this.p2.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);
		if (this.p3 != undefined && this.p4 != undefined)
		{
			if (this.p3.isAi && this.speedVec.x < 0)
				this.p3.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);
			if (this.p4.isAi && this.speedVec.x > 0)
				this.p4.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);
		}
    }

	#paddleHit(pd, team1)
	{
		const diff = pd.mesh.position.z - this.mesh.position.z;

		if (Math.abs(diff) < pd.height / 2)
		{
			const theta = (diff / (pd.height / 2) * (45 * (Math.PI / 180)));

			this.speed *= this.acc;
			this.speedVec.x = this.speedVec.x > 0 ? -(this.speed * Math.cos(theta)) : this.speed * Math.cos(theta);
			this.speedVec.z = -(this.speed * Math.sin(theta));
			if (this.speedVec.length() > this.maxSpeed)
				this.speedVec.normalize().multiplyScalar(this.maxSpeed);

			if (this.speedVec.x < 0)
			{
				if (this.p1.isAi)
					this.p1.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);
				if (this.p3 != undefined && this.p3.isAi)
					this.p3.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);
			}
			else
			{
				if (this.p2.isAi)
					this.p2.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);
				if (this.p4 != undefined && this.p4.isAi)
					this.p4.predictPos(this.speedVec.clone().normalize(), this.mesh.position.clone(), this.radius);				
			}

			return (1);
		}
		else
		{
			if (team1 == true)
				this.scoreboard.upgradeP2Score();
			else if (team1 == false)
				this.scoreboard.upgradeP1Score();

			return (2);
		}
	}

	#calcCollsions(targetPos)
	{
		//calc up-down wall
		if (Math.abs(targetPos.z) + this.radius > this.mapSizes.height / 2)
		{
			this.speedVec.z *= -1;
			return (1);
		}

		//check if any paddle
		if (Math.abs(targetPos.x) + this.radius >= this.mapSizes.width / 2)
		{
			//check paddle1
			if (targetPos.x < 0)
				return (this.#paddleHit(this.p1, true));
			//check paddle2
			else
				return (this.#paddleHit(this.p2, false));
		}
		else if (this.p3 != undefined && this.p4 != undefined)
		{
			const limitRadius = this.speedVec.x < 0 ? targetPos.x - this.radius : targetPos.x + this.radius;

			if (limitRadius <= this.p3.mesh.position.x + this.p3.radius && limitRadius >= this.p3.mesh.position.x - this.p3.radius)
				this.#paddleHit(this.p3);
			else if (limitRadius <= this.p4.mesh.position.x + this.p4.radius && limitRadius >= this.p4.mesh.position.x - this.p4.radius)
				this.#paddleHit(this.p4);
		}
		return (0);
	}

    update(deltaTime)
    {
        let timeSVec = this.speedVec.clone().multiplyScalar(deltaTime);
		let targetPos = this.mesh.position.clone().add(timeSVec);

		//collisions
		const stat = this.#calcCollsions(targetPos);
		if (stat)
		{
			// RETURN 2 IF GAME ENDED --> RESTART BALL
			if (stat == 2)
				return (1);
			timeSVec = this.speedVec.clone().multiplyScalar(deltaTime);
			targetPos = this.mesh.position.clone().add(timeSVec);
		}

		this.mesh.position.copy(targetPos);
		
		return (0);
    }

}