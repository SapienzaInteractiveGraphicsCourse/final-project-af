function Enemy(scene,environment,player) {

    this.scene = scene;
    this.player = player.mesh
    this.player_position = this.player.position.clone(); 

    this.environment = environment;

    this.STEP_LENGTH = 0.1;

    this.enemies = [];

    this.loadEnemy = async function() {
            return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/skull-babylon/", "skull.babylon", this.scene).then(
                (result) =>{
                    this.enemyAssets = result.meshes[0];
                    this.enemyAssets.isVisible = false; // i want to instance it

                    this.floatingAnimation = new BABYLON.Animation("e_float","position.y",100,
                    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLING);
                    this.floatingAnimation.setKeys([
                        { frame: 0,   value: 1.0},
                        { frame: 50,  value: 1.5},
                        { frame: 100, value: 1.0}
                    ]);
                    var easing = new BABYLON.CubicEase();
                    easing.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT)

                    this.floatingAnimation.setEasingFunction(easing);
                    this.enemyAssets.animations.push(this.floatingAnimation)
                });
    }
    this.instanceEnemy = function(where) {
        var index = "enemy";
        var base = new BABYLON.TransformNode(index+"base",this.scene)

        var newInstance = this.enemyAssets.createInstance(index);
        newInstance.checkCollisions = true;
        newInstance.rotationQuaternion = null;
        this.scene.beginAnimation(newInstance, 0, 100, true,0.5);
        //newInstance.scaling = new BABYLON.Vector3(0.1,0.1,0.1);

        // "where" has to be on the sphere
        var R = this.environment.planet.radius;
        if (Math.abs(where.length()-R) > 0.01) {
            
            where = where.normalize().scale(R);
        }

        //base.position = where;
        base.parent = this.environment.planet;

        newInstance.position._y += 1.0;
        newInstance.rotation._y += Math.PI;
        newInstance.parent = base;

        base.position = where;
        base.rotationQuaternion = new BABYLON.Quaternion();

        this.enemies.push(base);
    }

        

    this.scene.onBeforeRenderObservable.add(() => {
        var m = this.environment.planet.computeWorldMatrix(true)
        var player_position_planet = BABYLON.Vector3.TransformCoordinates(this.player_position,BABYLON.Matrix.Invert(m));
        this.enemies.forEach(enemy => {
            // face the player

            var m = OrientEnemy(enemy.position,player_position_planet);
            
            m.decompose(null,enemy.rotationQuaternion,null,null);
            //enemy.rotation = rotation.toEulerAngles();

            // and take a step
            
            // DOES NOT WORK IN THE UNDERWORLD;
            //enemy.rotateAround(BABYLON.Vector3.Zero(), enemy.right,STEP_LENGTH); 

            if (enemy.position.subtract(player_position_planet).length() > 0.5)
            enemy.locallyTranslate(new BABYLON.Vector3(0,0,this.STEP_LENGTH));
            enemy.position = enemy.position.normalize().scale(this.environment.planet.radius);

            // bullet collision
            var bullets = this.scene.getMeshesById("bulletInstance")
            bullets.forEach(b =>{ 
            if (b != null && enemy.getChildren()[0].intersectsMesh(b,false)) {
                console.log("collision with bulletInstance!!")
            }});

        });
    });
}


function OrientEnemy(position, player_position) {

    var y = BABYLON.Vector3.Normalize(position);
    var z_pointing = player_position.subtract(position); z_pointing.normalize();
    var x = (z_pointing.cross(y)).normalize();
    var z = y.cross(x).normalize(); 

    var m = new BABYLON.Matrix();
        m.setRow(0,new BABYLON.Vector4(-x._x,-x._y,-x._z,0))
        m.setRow(1,new BABYLON.Vector4(-y._x,-y._y,-y._z,0))
        m.setRow(2,new BABYLON.Vector4(z._x,z._y,z._z,0))

    return m;
}

