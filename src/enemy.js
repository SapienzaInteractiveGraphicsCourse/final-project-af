function Enemy(scene,environment,player) {

    this.scene = scene;
    this.player = player
    this.player_position = this.player.mesh.position.clone(); 

    this.environment = environment;

    switch (g.difficulty) {
        case 1:
            this.STEP_LENGTH = 0.15; break; // lower than this is just too slow
        case 2:
            this.STEP_LENGTH = 0.15; break;
        case 3:
            this.STEP_LENGTH = 0.23; break;
        default:
            this.STEP_LENGTH = 0.15;
    }

    this.hordeC = 0;
    this.hordeN = function() {
        switch (g.difficulty) {
            case 1:
                return Math.round(this.hordeC / 10) + 1;
            case 2:
                return Math.round(this.hordeC / 7.5) + 1;
            case 3:
                return Math.round(this.hordeC / 5) + 1;
            default:
                return 1;
        }
        
    }


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
                    this.environment.houseAssets.hittable = true;
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
        //var R = this.environment.planet.radius;
        //if (Math.abs(where.length()-R) > 0.01) {
        //    
        //    where = where.normalize().scale(R);
        //  
        //}

        //base.position = where;
        base.parent = this.environment.planet;

        newInstance.position._y += 1.0;
        newInstance.rotation._y += Math.PI;
        newInstance.parent = base;

        base.position = where;
        base.rotationQuaternion = new BABYLON.Quaternion();

        base.target = Math.random() > 0.33 ? "player" : "house";
        base.setToRemove = false;
        this.enemies.push(base);
        
    }

    this.sound_pain = new BABYLON.Sound("enemy_pain", "./res/sounds/enemy_pain.wav", scene);
    this.sound_wind = new BABYLON.Sound("infested", "./res/sounds/infested.wav", scene);
    this.sound_born = new BABYLON.Sound("enemy_born", "./res/sounds/new_ghost.wav", scene);

    this.scene.onBeforeRenderObservable.add(() => {
        // remove disposed enemies
        this.enemies = this.enemies.filter(enemy => {
                if (enemy.setToRemove) enemy.dispose();
                return !enemy.setToRemove;
        });


        var m = this.environment.planet.computeWorldMatrix(true)
        var player_position_planet = BABYLON.Vector3.TransformCoordinates(this.player_position,BABYLON.Matrix.Invert(m));
        this.enemies.forEach((enemy,index) => {
            // face the player            
            
            // DOES NOT WORK IN THE UNDERWORLD;
            //enemy.rotateAround(BABYLON.Vector3.Zero(), enemy.right,STEP_LENGTH); 

            if (enemy.target == "player") {
                var m = OrientEnemy(enemy.position,player_position_planet);
            
                m.decompose(null,enemy.rotationQuaternion,null,null);
                if (enemy.position.subtract(player_position_planet).length() > 0.5)
                    enemy.locallyTranslate(new BABYLON.Vector3(0,0,this.STEP_LENGTH));
                    
            } else if (enemy.target == "house") {
                var m = OrientEnemy(enemy.position,this.environment.houseAssets.position);
                m.decompose(null,enemy.rotationQuaternion,null,null);

                if (enemy.position.subtract(this.environment.houseAssets.position).length() > 2)
                    enemy.locallyTranslate(new BABYLON.Vector3(0,0,this.STEP_LENGTH));
                else {
                    // house infested
                    console.log("infested house");
                    // play sound
                   this.sound_wind.play();
                    // dispose the enemy that hit the house
                    enemy.setToRemove = true;

                    if (this.environment.houseAssets.hittable) {
                        this.player.life.lostLife();
                        this.environment.houseAssets.hittable = false;
                        setTimeout(function() {g.environment.houseAssets.hittable = true},2000);
                    }
                
                } 
            }
            //enemy.position = enemy.position.normalize().scale(this.environment.planet.radius);

            // bullet collision
            var bullets = this.scene.getMeshesById("bulletInstance")
            bullets.forEach(b =>{ 
                if (enemy.getChildren()[0] != undefined && b != null && enemy.getChildren()[0].intersectsMesh(b,false)) {
                    console.log("bullet HIT");
                    this.sound_pain.play();
                    this.player.life.kills += 1; // increment kill counter
                    enemy.setToRemove = true;
                }
            });

        });
    });

    


    this.callEnemies = function(){
        var time = newTime(this.player.life.start);
        var R = this.environment.planet.radius;
        
        BABYLON.setAndStartTimer({
        timeout: time,
        contextObservable: scene.onBeforeRenderObservable,
        onEnded: () => {
            this.hordeC += 1;
            for(var instance = 0; instance < this.hordeN(); instance++){
                var where = getRandomLoc3(R);
                this.instanceEnemy(where); 
            }
            this.sound_born.play();
            this.callEnemies();
        },});
        
    }

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

function getRandomLoc3(R){
    var h = R*0.9;
    var r = Math.sqrt(Math.pow(R,2) - Math.pow(h,2));
    var x = Math.cos(Math.random()*Math.PI)*r;
    var sign = Math.random();
    if(sign > 0.5){sign = -1} else {sign = 1}
    var z = sign * Math.sqrt(Math.pow(r,2) - Math.pow(x,2));
    return new BABYLON.Vector3(x,-h, z);
}

function newTime(start){
    
    var time = (start - new Date().getTime())/1000;
    return Math.exp(-time/1000)*5000;

}


