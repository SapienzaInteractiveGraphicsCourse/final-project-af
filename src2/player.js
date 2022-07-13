function vec4to3(vec4) {return new BABYLON.Vector3(vec4.x,vec4.y,vec4.z);}
function getAxes(m) { // returns the columns of the rotation matrix m
    var x = vec4to3(m.getRow(0));
    var y = vec4to3(m.getRow(1));
    var z = vec4to3(m.getRow(2));
    return [x,y,z];
}

function Player(assets,scene,input,planet) {
    const FWD_SPEED = 0.2;
    const STRAFE_SPEED = 0.2;

    this.scene = scene;
    // this.mesh = assets.mesh;
    this.mesh = scene.getMeshById(assets);
    this.mesh.rotationQuaternion = null;
    this.planet = scene.getMeshById(planet);
    this.heading = 0;
    //this.mesh.parent = this.planet
    this.mesh.position.y = this.planet.radius;

    this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0.8, 10, new BABYLON.Vector3(0,this.planet.radius+2,0));
    this.camera.inputs.attached.pointers.buttons = [0,1] // disable right click panning


    this.input = input;

    this.anims = loadPlayerAnimations(this);
    this.isMoving = false;

    this.mesh.rotationQuaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y,-this.camera.alpha + 1.57);

    this.anims["rest"].start(true,0.4,0,100);
    this.anims["walk"].start(true,1,0,100);
    this.rest_weight = 1;
    this.move_weight = 0;
    this.anims["rest"].setWeightForAllAnimatables(this.rest_weight);
    this.anims["walk"].setWeightForAllAnimatables(this.move_weight);

    this.cm = scene.getMeshById("p_characterMedium")
    this.cm.checkCollisions = true;

    this.bullet = new Bullet(this);

    this.scene.onBeforeRenderObservable.add(() => {
        this.camera.upVector = this.mesh.up;
        this.input.updateFromKeyboard();
        // get delta time
        this.deltaTime = this.scene.getEngine().getDeltaTime() / 1000.0;
        var straight = FWD_SPEED*this.input.straight; // contains straight desired input
        var strafe =   STRAFE_SPEED*this.input.strafe; // contains strafe desired input

        if (Math.abs(straight) > 0.001 || Math.abs(strafe) > 0.001) {
            movDir = Math.atan2(strafe,straight);
            this.mesh.rotate(BABYLON.Axis.Y,-this.camera.alpha + movDir - this.heading);
            this.heading =-this.camera.alpha + movDir;
            // compute the rotation angle
            var rotAngle = (new BABYLON.Vector2(straight,strafe)).length() * this.deltaTime;
            
            this.planet.rotateAround(BABYLON.Vector3.Zero(), this.mesh.right,rotAngle);


            this.isMoving = true;
        } else this.isMoving = false;

        // update animations
        if (this.isMoving) {
            this.move_weight = BABYLON.Scalar.Lerp(this.move_weight,1,0.2);
            this.rest_weight = BABYLON.Scalar.Lerp(this.rest_weight,0,0.2);
        } else {
            this.move_weight = BABYLON.Scalar.Lerp(this.move_weight,0,0.2);
            this.rest_weight = BABYLON.Scalar.Lerp(this.rest_weight,1,0.2);
        }
        this.anims["rest"].setWeightForAllAnimatables(this.rest_weight);
        this.anims["walk"].setWeightForAllAnimatables(this.move_weight);

        // handle collisions
        // I can also do it in the enemy loop function, I don't know if there's a difference
        var enemies = this.scene.getMeshesById("enemy")
        enemies.forEach(e =>{ 
        if (e != null && this.cm.intersectsMesh(e,true)) {
            console.log("collision with enemy!!")
            // TODO have a state variable
        }});

        // shoot bullets
        if (this.input.shoot) {
            // shoot
            this.bullet.instanceBullet(this.scene.getNodeById("gun").getAbsolutePosition(),this.mesh.rotationQuaternion);
        } // else do nothing
    }); 
    
}   

function Bullet(player) {
    this.player = player
    this.scene = player.scene;
    this.planet = player.planet;
    this.mesh = new BABYLON.Mesh.CreateSphere('bullet', 3, 0.3, this.scene);
    
    // set bullet material ... 


    //
    this.mesh.visible = false;

    this.bullets = [];

    this.sound = undefined;

    this.BULLET_LIFETIME = 1000;
    this.STEP_LENGTH = 3;

    this.orientBullet = function(bullet) {

        var y = BABYLON.Vector3.Normalize(bullet.position);
        var x = bullet.__right.clone();
        var z = y.cross(x); z.normalize();

        var m = new BABYLON.Matrix();
            m.setRow(0,new BABYLON.Vector4(x._x,x._y,x._z,0))
            m.setRow(1,new BABYLON.Vector4(y._x,y._y,y._z,0))
            m.setRow(2,new BABYLON.Vector4(z._x,z._y,z._z,0))
        var q = new BABYLON.Quaternion();
        m.decompose(null,q,null,null);
        return q
    }

    this.instanceBullet = function(where) {
        var newInstance = this.mesh.createInstance("bulletInstance");
        var m = this.planet.computeWorldMatrix(true)
        var where_planet = BABYLON.Vector3.TransformCoordinates(where,BABYLON.Matrix.Invert(m));
        
        newInstance.position = where_planet;
        this.height = where_planet.length();
        newInstance.parent = this.planet
        newInstance.checkCollisions = true;
        newInstance.lifetime = this.BULLET_LIFETIME;

        var world_to_planet = BABYLON.Matrix.Invert(this.planet.computeWorldMatrix(true));
        
        // the right direction remains always the same so I can use it to build around the new frame each time
        newInstance.__right = BABYLON.Vector3.Normalize(BABYLON.Vector3.TransformCoordinates(this.player.mesh.right,world_to_planet));
        newInstance.rotationQuaternion = this.orientBullet(newInstance);

        this.bullets.push(newInstance);
    }
        

    this.scene.onBeforeRenderObservable.add(() => {
        
        var world_to_planet = BABYLON.Matrix.Invert(this.planet.computeWorldMatrix(true));
        
        for (var i=0; i<this.bullets.length; i+=1) {
            var bullet = this.bullets[i]
            bullet.rotationQuaternion = this.orientBullet(bullet,world_to_planet);

            bullet.lifetime -= 1;


            bullet.locallyTranslate(new BABYLON.Vector3(0,0,this.STEP_LENGTH));
            bullet.position = bullet.position.normalize().scale(this.height);



            if (bullet.lifetime <= 0) {
                bullet.dispose();
                this.bullets.splice(i,1);
            }
        }
    });

}

function PlayerInput(scene) {

    this.scene = scene;
    this.inputMap = {}; // put here key presses

    // Install an action manager on the scene
    this.scene.actionManager = new BABYLON.ActionManager(this.scene);
    // Listen to keypress and keyrelease events
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; // why keydown?
    }));

    this.straight = 0;
    this.strafe = 0;

    this.prev_spacebar = false;
    this.shoot = false;

    this.updateFromKeyboard = function() {
        if (this.inputMap["w"]) {
            this.straight = BABYLON.Scalar.Lerp(this.straight, 1, 0.4);
        } else if (this.inputMap["s"]) {
            this.straight = BABYLON.Scalar.Lerp(this.straight, -1, 0.4);
        } else {
            this.straight = BABYLON.Scalar.Lerp(this.straight, 0, 0.4);
        }
        if (this.inputMap["a"]) {
            this.strafe = BABYLON.Scalar.Lerp(this.strafe, -1, 0.4);
        } else if (this.inputMap["d"]) {
            this.strafe = BABYLON.Scalar.Lerp(this.strafe, +1, 0.4);
        }
        else {
            this.strafe = BABYLON.Scalar.Lerp(this.strafe, 0, 0.4);
        }
        if (this.inputMap[" "]) {// spacebar
            if (!this.prev_spacebar)  this.shoot = true;
            else this.shoot = false;
            this.prev_spacebar = true;
        }
        else this.prev_spacebar = false;
    }

}