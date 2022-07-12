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
    this.mesh.parent = this.planet
    this.mesh.position.y = this.planet.radius;

    this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0.8, 10, this.mesh.position);
    //this.camera.parent = this.mesh;
    this.camera.parent = this.planet;   

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
            
            this.mesh.rotateAround(BABYLON.Vector3.Zero(), this.mesh.right,-rotAngle);


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
        }});
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
    }

}