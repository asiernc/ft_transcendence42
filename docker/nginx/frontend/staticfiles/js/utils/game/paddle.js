import { CapsuleGeometry, ShaderMaterial, Mesh, Color } from 'three'; 

export default class Paddle
{
    constructor(scene, mapSizes, hexColor, xPos, isAi)
    {
        // general config
        this.scene = scene;
        this.mapSizes = mapSizes;
        this.movingVel = 1;
        this.height = 3;
        this.radius = 0.3;
        this.targetZ = 0;
		this.isAi = isAi;
        this.hexColor = hexColor;
    
        // ball config
        this.geo = new CapsuleGeometry(this.radius, this.height, 8);
        this.geo.rotateX(Math.PI / 2);

        this.material = new ShaderMaterial({
            vertexShader: `
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,
            fragmentShader: `
            uniform vec3 uColor;
            uniform float uDistance;

            void main() {
                vec3 black = vec3(1.0 - uDistance);
                vec3 color = mix(uColor, black, 0.5);

                gl_FragColor = vec4(color, 1.0);
            }
            `,
            uniforms: {
              uColor: { value: new Color(hexColor) },
              uDistance: { value: 1 },
            },
        });

        this.mesh = new Mesh(this.geo, this.material);
        this.mesh.position.x = xPos;
		if (this.mesh.position.x < 0)
			this.mesh.position.x -= this.radius;
		else
			this.mesh.position.x += this.radius;
        scene.add(this.mesh);

		//adding extra 15% HitBox of the Paddle to make it feel good
		this.height *= 1.15;
    }

    setNewPos(isUp)
    {
        if (isUp)
        {
            if (-(this.mesh.position.z - this.movingVel - this.height / 2) > (this.mapSizes.height / 2))
            {
                this.targetZ = -(this.mapSizes.height / 2) + this.height / 2;
                return;
            }
            this.targetZ = this.mesh.position.z - this.movingVel;
        }
        else
        {
            if ((this.mesh.position.z + this.movingVel + this.height / 2) > (this.mapSizes.height / 2))
            {
                this.targetZ = this.mapSizes.height / 2 - this.height / 2;
                return;
            }
            this.targetZ = this.mesh.position.z + this.movingVel;
        }        
    }

    predictPos(speedVec, ballPos, radius)
    {
        let XWall = speedVec.x < 0 ? -(Math.abs(this.mesh.position.x)) : Math.abs(this.mesh.position.x);
		let zWall = speedVec.z < 0 ? -(this.mapSizes.height / 2) + radius : this.mapSizes.height / 2 - radius;

        while ((XWall - ballPos.x) / speedVec.x > (zWall - ballPos.z) / speedVec.z)
        {
            //rebound && recalc
			ballPos.addScaledVector(speedVec, (zWall - ballPos.z) / speedVec.z);
			speedVec.z *= -1;
			speedVec.normalize();

            XWall = speedVec.x < 0 ? -(Math.abs(this.mesh.position.x)) : Math.abs(this.mesh.position.x);
            zWall = speedVec.z < 0 ? -(this.mapSizes.height / 2) + radius : this.mapSizes.height / 2 - radius;
        }
        this.targetZ = ballPos.addScaledVector(speedVec, (XWall - ballPos.x) / speedVec.x).z;
            
        //Dont overflow the limits of the field
        if (Math.abs(this.targetZ) > this.mapSizes.height / 2 - this.height / 2)
            this.targetZ = this.targetZ < 0 ? -(this.mapSizes.height / 2) + this.height / 2 : this.mapSizes.height / 2 - this.height / 2;
    }

    update()
    {
        this.material.uniforms.uDistance.value = this.ball?.mesh.position.distanceTo(this.mesh.position) / this.mapSizes.width;
        
        if (Math.abs(this.mesh.position.z - this.targetZ) > 0.1)
		{
			if (this.mesh.position.z < this.targetZ)
				this.mesh.position.z += this.isAi ? 0.08 : 0.15;
			else if (this.mesh.position.z > this.targetZ)
				this.mesh.position.z -= this.isAi ? 0.08 : 0.15;
		}
	}
}