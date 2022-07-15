function vec4to3(vec4) {return new BABYLON.Vector3(vec4.x,vec4.y,vec4.z);}
function getAxes(m) { // returns the columns of the rotation matrix m
    var x = vec4to3(m.getRow(0));
    var y = vec4to3(m.getRow(1));
    var z = vec4to3(m.getRow(2));
    return [x,y,z];
}

function Player(assets,scene,input,planet,game) {
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

    this.life = new playerLife(game);
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
    this.hittable = true;
    this.UNHITTABLE_TIME = 1500; // ms
    this.canShoot = true;
    this.RELOAD_TIME = 500; // ms

    this.bullet = new Bullet(this);

    this.sound_pain = new BABYLON.Sound("pain", "./res/sounds/player_pain.wav", scene);
    
    this.sound_death = new BABYLON.Sound("death", "./res/sounds/critical_hit.wav", scene);


    this.scene.onBeforeRenderObservable.add(() => {

        // backup old position + quaternion in case of collision
        var pOld = this.planet.position.clone();
        var qOld = this.planet.rotationQuaternion.clone();

        this.input.updateFromKeyboard();       
        // get delta time
        this.deltaTime = this.scene.getEngine().getDeltaTime() / 1000.0;
        var straight = FWD_SPEED*this.input.straight; // contains straight desired input
        var strafe =   STRAFE_SPEED*this.input.strafe; // contains strafe desired input
        var movDir = 0;
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
        var enemies = this.scene.getMeshesById("enemy");
         
        if (this.hittable && enemies != []) for(var i=0;i<enemies.length; i+=1){ 
            var e = enemies[i];
            if (this.cm.intersectsMesh(e,true)) {
                // collision with enemy
                e.parent.setToRemove = 1; // always remove the enemy

                if (this.hittable) {
                    

                    if(this.life.numberLife == 1){
                        this.sound_death.play();
                        
                    }
                    else {
                        this.sound_pain.play();
                       
                    }
                    this.life.lostLife();
                    
                    this.hittable = false;
        
                    setTimeout(function() {g.player.hittable = true},this.UNHITTABLE_TIME);
                    // play animation
                    this.anims["pain"].start(false,5,0,100);
                    this.anims["pain"].setWeightForAllAnimatables(100);
                    break;
                }
            }
        };

        var obstacles = this.scene.getMeshesById("collidable");
        if (obstacles != [] ) obstacles.forEach(obstacle => {
            //console.log(obstacle.name);
            if (this.cm.intersectsMesh(obstacle,true)) {

                // sometimes the player can get stuck in collisions
                // in principle, to get you you must roll back te movement
                // but in practice the player is stuck and it does not move anymore
                // so I roll back a lot more in order to keep it out of the obstacle bounding box

                this.planet.rotateAround(BABYLON.Vector3.Zero(), this.mesh.right,-5*rotAngle);
                // there may be better solutions like only allowing movements that do not decrease
                // the distance btw player and object.
            }   
        });

        
        // shoot bullets
        if (this.input.shoot) {
            if (this.canShoot) {
                // shoot
                this.bullet.instanceBullet(this.scene.getNodeById("gun").getAbsolutePosition(),this.mesh.rotationQuaternion);
                this.canShoot = false;
                setTimeout(function() {g.player.canShoot = true},this.RELOAD_TIME);
            }   
        }
    }); 
    
}   

function Bullet(player) {
    this.player = player
    this.scene = player.scene;
    this.planet = player.planet;
    this.mesh = new BABYLON.Mesh.CreateSphere('bullet', 2, 0.3, this.scene);
    
    // set bullet material ... 
    
    var bulletMat = new BABYLON.StandardMaterial("mat", this.scene);
    bulletMat.ambientTexture = new BABYLON.Texture("./res/textures/metal.jpg",this.scene);
    bulletMat.specularColor = new BABYLON.Color3(0,0,0);

    this.mesh.material = bulletMat;
    this.mesh.visible = false;

    this.bullets = [];

    this.sound = new BABYLON.Sound("click", "./res/sounds/gunshot.wav", this.scene);

    this.BULLET_LIFETIME = 50;
    this.STEP_LENGTH = 2.5;

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
        this.sound.play();
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
        
        this.bullets.forEach((bullet,idx) =>{   
            bullet.rotationQuaternion = this.orientBullet(bullet,world_to_planet);

            bullet.lifetime -= 1;


            bullet.locallyTranslate(new BABYLON.Vector3(0,0,this.STEP_LENGTH));
            bullet.position = bullet.position.normalize().scale(this.height);



            if (bullet.lifetime <= 0) {
                bullet.dispose();
                this.bullets.splice(idx,1);
            }
        });
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
    this.click = false;
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