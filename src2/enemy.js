function Enemy(scene,environment,player) {

    this.scene = scene;
    this.player = player;
    this.environment = environment;

    this.enemies = [];

    this.loadEnemy = async function() {
            return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/skull-babylon/", "skull.babylon", this.scene).then(
                (result) =>{
                    this.enemyAssets = result.meshes[0];
                    this.enemyAssets.isVisible = false; // i want to instance it
                });
    }
    this.instanceEnemy = function(where) {
        var index = "e" + this.enemies.length;
        var base = new BABYLON.TransformNode(index+"base",this.scene)

        var newInstance = this.enemyAssets.createInstance(index);
        newInstance.rotationQuaternion = null;
            //newInstance.scaling = new BABYLON.Vector3(0.1,0.1,0.1);

            // "where has to be on the sphere
            var R = this.environment.planet.radius;
            console.log(R);
            console.log(where.length())
            if (Math.abs(where.length()-R) > 0.01) {
                
                where = where.normalize().scale(R);
            }

            base.position = where;
            base.parent = this.environment.planet;

            newInstance.position._y += 1.0;
            newInstance.rotation._y += Math.PI;
            newInstance.parent = base;

            base.rotation = new BABYLON.Vector3(0,Math.PI/2,-Math.PI/2);

            this.enemies.push(newInstance);
    }

    this.scene.onBeforeRenderObservable.add(() => {
        // here add enemy behavior
    });
}