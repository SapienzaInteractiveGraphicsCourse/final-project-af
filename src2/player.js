function vec3to4(vec3,fourth=0) {return new BABYLON.Vector4(vec3._x,vec3._y,vec3._z,fourth);}
function vec4to3(vec4) {return new BABYLON.Vector3(vec4.x,vec4.y,vec4.z);}

function getAxes(m) { // returns the columns of the rotation matrix m
    var x = vec4to3(m.getRow(0));
    var y = vec4to3(m.getRow(1));
    var z = vec4to3(m.getRow(2));
    return [x,y,z];
}

function closestOrthogonal(still,moving) {return still.cross(moving).cross(still);}


function Player(assets,scene,input,planet) {

    const FWD_SPEED = 0.2;
    const STRAFE_SPEED = 0.1;
    this.scene = scene;
    // this.mesh = assets.mesh;
    this.mesh = scene.getMeshById(assets);
    this.mesh.rotationQuaternion = null;
    this.planet = scene.getMeshById(planet);
    this.mesh.position.y = this.planet.radius;

    this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0.8, 10, this.mesh.position);
    //this.camera.parent = this.mesh;
    this.camera.alpha = 0;
    this.input = input;


    // control keypresses everytime you render the frame
    // maybe add the callback directly in the player update function
    this.scene.onBeforeRenderObservable.add(() => {
        this.input.updateFromKeyboard();
        // get delta time
        this.deltaTime = this.scene.getEngine().getDeltaTime() / 1000.0;
        var straight = FWD_SPEED*this.input.straight; // contains straight desired input
        var strafe =   STRAFE_SPEED*this.input.strafe; // contains strafe desired input

        if (Math.abs(straight) > 0.001 || Math.abs(strafe) > 0.001) {
            // first rotate mesh in straight direction
            this.mesh.rotation.y = -this.camera.alpha + 1.57;

            // then rotate it in the movement direction
            var movDir = Math.atan2(strafe,straight);

            this.mesh.rotation.y += movDir;

            var rotAngle = (new BABYLON.Vector2(straight,strafe)).length() * this.deltaTime;
            var rotAxis = getAxes(this.mesh.computeWorldMatrix())[0] 
            this.planet.rotateAround(BABYLON.Vector3.Zero(),rotAxis,rotAngle)

        }


        


        // update animations
        // handle collisions
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
            this.straightAxis = 1;
        } else if (this.inputMap["s"]) {
            this.straight = BABYLON.Scalar.Lerp(this.straight, -1, 0.4);
            this.straightAxis = -1;
        } else {
            this.straight = BABYLON.Scalar.Lerp(this.straight, 0, 0.4);
            this.straightAxis = 0;
        }
        if (this.inputMap["a"]) {
            this.strafe = BABYLON.Scalar.Lerp(this.strafe, -1, 0.4);
            this.strafeAxis = -1;
    
        } else if (this.inputMap["d"]) {
            this.strafe = BABYLON.Scalar.Lerp(this.strafe, 1, 0.4);
            this.strafeAxis = 1;
        }
        else {
            this.strafe = BABYLON.Scalar.Lerp(this.strafe, 0, 0.4);
            this.strafeAxis = 0;
        }
    }

}


/*      OLD ATTEMPT NOT WORKING
        // approximation of moving in a sphere:
        // 1) increment z (fwd)
        // 2) increment x (strafe)
        // 3) normalize position length to radius to get back on the sphere
        
        var dz = this.deltaTime*FWD_SPEED*straight;
        var dx = this.deltaTime*STRAFE_SPEED*strafe;

        // TODO clamp dx and dz so that you don't move faster diagonally

        this.mesh.position.z += dz;
        this.mesh.position.x += dx;
        this.mesh.position = this.mesh.position.normalize().scale(30); // looks OK
    
        // update orientation
        
        // always be normal to the sphere (y points to player.position if world is at [0,0,0])
        // z points to the direction of movement
        // x follows from cross product
        // TODO maybe add linear interpolation to smooth the turning

        var m = this.mesh.computeWorldMatrix().clone();
        var axesOld = getAxes(m);
        // 1) reorient the mesh in the direction of movement
        
        var z_o = axesOld[2];
        if (strafe != 0 || straight != 0) 
            var z_o = axesOld[2].scale(straight).add(axesOld[0].scale(strafe));
        z_o.normalize();

        //console.log(z_o._x+" "+z_o._y+" "+z_o._z)
        console.log(this.mesh.position)


        var y_new = BABYLON.Vector3.Normalize(this.mesh.position);
        var z_new = closestOrthogonal(y_new,z_o); z_new.normalize();
        var x_new = z_new.cross(y_new); x_new.normalize();

        this.mesh.rotation = BABYLON.Vector3.RotationFromAxis(x_new,y_new,z_new);
        */