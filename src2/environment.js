// this class is used to define the game scene except player and zombies

function Environment(scene) {
    //this.game = game;
    this.scene = scene;

    this.treeAssets = null;
    this.houseAssets = null;
    this.intensity = 1;


    this.load = async function(game) { // Here you load the world assets
        var skybox = createSkyBox(scene);
        skybox.setTime(0);

        var upperworldMat = new BABYLON.StandardMaterial("mat1", scene);
        upperworldMat.ambientTexture = new BABYLON.Texture("./res/textures/ground2.jpg",scene);
        upperworldMat.specularColor = new BABYLON.Color3(0,0,0);

        var underworldMat = new BABYLON.StandardMaterial("mat2", scene);
        underworldMat.ambientTexture = new BABYLON.Texture("./res/textures/vulcan.jpg",scene);
        underworldMat.specularColor = new BABYLON.Color3(0,0,0);

        var barrierMat = new BABYLON.StandardMaterial("barrierMat", scene);
        barrierMat.specularColor = new BABYLON.Color3(221,160,221);
        //barrierMat.diffuseTexture = new BABYLON.Texture(".res/textures/fuxya.png", scene);
        barrierMat.alpha = 0.3;
        var purple = new BABYLON.Color4(221/255,160/255,221/255,1);

            
        const R = 30.0;
        this.planet = BABYLON.MeshBuilder.CreateSphere("planet", {diameter:R*2}, scene);
        this.planet.radius = R;
        this.planet.isVisible = false;

        var upperworld_rotation =  new BABYLON.Vector3( Math.PI , Math.PI/2, -Math.PI/2);
        this.upperworld = BABYLON.MeshBuilder.CreateSphere("upperworld", {diameter:R*2});
        this.upperworld.rotation = upperworld_rotation;
        this.upperworld.material = upperworldMat;
        this.upperworld.parent = this.planet;


        var underworld_rotation =  new BABYLON.Vector3(  0 , 0, Math.PI);
        this.underworld = BABYLON.MeshBuilder.CreateSphere("underworld", {diameter:R*2+0.1, slice: 0.5});
        this.underworld.rotation = underworld_rotation;
        this.underworld.material = underworldMat;
        this.underworld.parent = this.planet;

        var barrier_rotation =  new BABYLON.Vector3( 0, 0, 0);
        this.barrier = BABYLON.MeshBuilder.CreateCylinder("barrier", {height :0.02, diameter:R*2 + 10, tessellation:48}, scene);
        this.barrier.faceColors = [purple,purple,purple];
        this.barrier.rotation =  barrier_rotation;
        this.barrier.material =  barrierMat;
        this.barrier.parent = this.planet;


        // debugging camera 
        this.camera = new BABYLON.ArcRotateCamera("camera", 4, 2, 3*R, BABYLON.Vector3.Zero());
        this.camera.parent = this.planet;

        // TODO look at Promise.all() to see if it's faster
        await this.loadTreeAssets(this.scene);
        //await this.loadDeadTreeAssets(this.scene);
        this.instanceTrees(20);
        //this.instanceDeadTrees(10);
        
        await this.loadHouseAssets(this.scene);
        this.houseAssets.position = new BABYLON.Vector3( R-1.3, 0, 5.5);
        this.houseAssets.rotation = new BABYLON.Vector3(0,-Math.PI/15, -Math.PI/2);
        this.houseAssets.scaling = new BABYLON.Vector3(1.3,1.3, 1.3);
        this.houseAssets.parent = this.upperworld;

        await this.loadTractorAssets(this.scene);
        this.tractorAssets.position = new BABYLON.Vector3( R-2.4, -10, 5.5);
        this.tractorAssets.rotation = new BABYLON.Vector3(0,-Math.PI/17, -Math.PI/2 -Math.PI/9);
        this.tractorAssets.scaling = new BABYLON.Vector3(0.7,0.7,0.7);
        this.tractorAssets.parent = this.upperworld;

        await this.loadStoneAssets(this.scene);
        this.stoneAssets.position = new BABYLON.Vector3( R-2.5, 10, 5.5);
        this.stoneAssets.rotation = new BABYLON.Vector3(0,-Math.PI/17, -Math.PI/2 + Math.PI/9);
        this.stoneAssets.scaling = new BABYLON.Vector3(0.02,0.02,0.02);
        this.stoneAssets.parent = this.upperworld;

        await this.loadPCrystalAssets(this.scene);
        this.pcrystalAssets.position = new BABYLON.Vector3( 0, R+3.5,0);
        this.pcrystalAssets.rotation = new BABYLON.Vector3(0,0,0);
        this.pcrystalAssets.scaling = new BABYLON.Vector3(0.1,0.1,0.1);
        this.pcrystalAssets.parent = this.upperworld;

        await this.loadSmallCrystalAssets(this.scene);
        this.smallcrystalAssets.position = new BABYLON.Vector3( 5.7, -R-1,-4);
        this.smallcrystalAssets.rotation = new BABYLON.Vector3(0,Math.PI/2,Math.PI);
        this.smallcrystalAssets.scaling = new BABYLON.Vector3(30,30,30);
        this.smallcrystalAssets.parent = this.upperworld;

        await this.loadRubyAssets(this.scene);
        this.rubyAssets.position = new BABYLON.Vector3( 0, R-1.2 ,0);
        this.rubyAssets.rotation = new BABYLON.Vector3(0,0,0);
        this.rubyAssets.scaling = new BABYLON.Vector3(4,4,4);
        this.rubyAssets.parent = this.underworld;

        await this.loadGraveCrystalAssets(this.scene);
        this.gravecrystalAssets.position = new BABYLON.Vector3( -10, R-1.2 ,8);
        this.gravecrystalAssets.rotation = new BABYLON.Vector3(0,0,0);
        this.gravecrystalAssets.scaling = new BABYLON.Vector3(17,17,17);
        this.gravecrystalAssets.parent = this.underworld;

        await this.loadGraveAssets(this.scene);
        this.graveAssets.position = new BABYLON.Vector3( -15, R-2 ,0);
        this.graveAssets.rotation = new BABYLON.Vector3(- Math.PI/6,Math.PI/2 ,Math.PI/12);
        this.graveAssets.scaling = new BABYLON.Vector3(9,9,9);
        this.graveAssets.parent = this.underworld;


        var redMat = new BABYLON.StandardMaterial("redMat", scene);
        redMat.diffuseTexture = new BABYLON.Texture("./res/textures/terradisiena.jpg", scene);
        
        var greenMat = new BABYLON.StandardMaterial("greenMat", scene);
        greenMat.diffuseTexture = new BABYLON.Texture("./res/textures/ground.jpg", scene);

        var sandMat = new BABYLON.StandardMaterial("sandMat", scene);
        sandMat.diffuseTexture = new BABYLON.Texture("./res/textures/sand.jpg", scene);
        
        var terraMat = new BABYLON.StandardMaterial("terraMat", scene);
        terraMat.diffuseTexture = new BABYLON.Texture("./res/textures/terracotta.jpeg", scene);

        this.redPlanet = BABYLON.MeshBuilder.CreateSphere("red", {diameter:50}, scene);
        this.redPlanet.material = redMat;
        this.redPlanet.position  = new BABYLON.Vector3(100,10,100);
        this.redPlanet.rotation.y = -Math.PI/2;

        this.greenPlanet = BABYLON.MeshBuilder.CreateSphere("green", {diameter:60}, scene);
        this.greenPlanet.material = greenMat;
        this.greenPlanet.position = new BABYLON.Vector3(-150,-80,100);
        this.greenPlanet.rotation.y = Math.PI;

        this.brownPlanet = BABYLON.MeshBuilder.CreateSphere("brown", {diameter:60}, scene);
        this.brownPlanet.material = terraMat;
        this.brownPlanet.position = new BABYLON.Vector3(-100,-30,-100);
        this.brownPlanet.rotation.y = Math.PI/2

        this.ring = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 10, diameter: 100, tessellation:32});
        this.ring.material = sandMat;
        this.ring.position = new BABYLON.Vector3(-100,-30,-100);
        this.ring.rotation.x = -Math.PI/6;

    
    
        var fogTexture = new BABYLON.Texture("./res/textures/smoke.png", this.scene);


        this.smokeFountain = BABYLON.Mesh.CreateBox("foutain", .01, this.scene);
        this.smokeFountain.position = new BABYLON.Vector3(0.0, R, 0);
        this.smokeFountain.visibility = 0;
        this.smokeFountain.parent = this.underworld;

        this.smoke = new BABYLON.ParticleSystem("particles", 2500 , this.scene);
        this.smoke.manualEmitCount = this.smoke.getCapacity();
        this.smoke.isLocal = true;
        this.smoke.minEmitBox = new BABYLON.Vector3(-5, 1, -5); // Starting all from
        this.smoke.maxEmitBox = new BABYLON.Vector3(5, 1, 5); // To...
        this.smoke.particleTexture = fogTexture.clone();
        this.smoke.emitter = this.smokeFountain;
        this.smoke.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1);
        this.smoke.color2 = new BABYLON.Color4(.95, .95, .95, 0.15);
        this.smoke.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
        this.smoke.minSize = 7.0;
        this.smoke.maxSize = 10.0;
        this.smoke.minLifeTime = Number.MAX_SAFE_INTEGER;
        this.smoke.emitRate = 50000;
        this.smoke.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        this.smoke.gravity = new BABYLON.Vector3(0, 0, 0);
        this.smoke.direction1 = new BABYLON.Vector3(0, 0, 0);
        this.smoke.direction2 = new BABYLON.Vector3(0, 0, 0);
        this.smoke.minAngularSpeed = -2;
        this.smoke.maxAngularSpeed = 2;
        this.smoke.minEmitPower = .5;
        this.smoke.maxEmitPower = 1;
        this.smoke.updateSpeed = 0.005;
        this.smoke.parent = this.smokeFountain;
        this.smoke.start();


        this.sounds(this.scene);

        this.GUI_environment(game, this.scene);
        
    }

    this.shooting = async function(scene){
        
        var gunshot_sound  = new BABYLON.Sound("gunshot", "./res/sounds/gunshot.wav", scene);

        window.addEventListener("keydown", function () {
            window.addEventListener("keydown", function (evt) {
                // Press space key to fire
                if (evt.keyCode === 32) {
                    gunshot_sound.play();
                    var bullet = BABYLON.Mesh.CreateSphere('bullet', 3, 0.3, scene);
                    var gunMesh = scene.getNodeById("gun");
                    var startPos = gunMesh.position;

                    bullet.position = new BABYLON.Vector3(startPos.x, startPos.y, startPos.z);
                    //bullet.material = new BABYLON.StandardMaterial('texture1', this.scene);
                    //bullet.material.diffuseColor = new BABYLON.Color3(2, 0, 0);

                    var invView = new BABYLON.Matrix();
                    this.camera.getViewMatrix().invertToRef(invView);
                    var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, -1), invView);
                    direction.normalize();

                    scene.registerBeforeRender(function () {
                        bullet.position.addInPlace(direction);
                });
                }
            });
            

        });
    }
    // TODO save all path in a file where you put all const variables
    this.loadTreeAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/tree-05-babylon/", "tree-05.babylon", scene).then(
            (result) =>{
                this.treeAssets = result.meshes[0];
                this.treeAssets.isVisible = false; // i want to instance it
            });
    }

    this.loadDeadTreeAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/", "low-poly-dead-tree.babylon", scene).then(
            (result) =>{
                this.deadtreeAssets = result.meshes[0];
                this.deadtreeAssets.isVisible = false; // i want to instance it
            });
    }

    this.loadHouseAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/old-house-babylon/", "old-house.babylon", scene).then(
            (result) =>{this.houseAssets = result.meshes[0];});
    }

    this.loadTractorAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/tractor-babylon/", "tractor.babylon", scene).then(
            (result) =>{this.tractorAssets = result.meshes[0];});
    } 

    this.loadStoneAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/stones-babylon/", "stones.babylon", scene).then(
            (result) =>{this.stoneAssets = result.meshes[0];});
    } 

    this.loadPCrystalAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/three-crystals-babylon/", "three-crystals.babylon", scene).then(
            (result) =>{this.pcrystalAssets = result.meshes[0];});
    } 
    
    this.loadSmallCrystalAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/blue-crystal-babylon/", "blue-crystal.babylon", scene).then(
            (result) =>{this.smallcrystalAssets = result.meshes[0];});
    } 

    this.loadRubyAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/ruby-babylon/", "ruby.babylon", scene).then(
            (result) =>{this.rubyAssets = result.meshes[0];});
    } 

    this.loadGraveCrystalAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/crystals-babylon/", "crystals.babylon", scene).then(
            (result) =>{this.gravecrystalAssets = result.meshes[0];});
    } 

    this.loadGraveAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/grave-babylon/", "grave.babylon", scene).then(
            (result) =>{this.graveAssets = result.meshes[0];});
    } 

    this.instanceTrees = function(n) {
        for (var index = 0; index < n; index++) {
            var newInstance = this.treeAssets.createInstance("i" + index);
            newInstance.parent = this.upperworld;
            newInstance.scaling = new BABYLON.Vector3(0.1,0.1,0.1);
            var randomPosition = getRandomLoc(this.planet.radius);
            var rotation = getRotation(randomPosition);

            newInstance.position = randomPosition;

            rotation.decompose(null,newInstance.rotationQuaternion,null,null);

        }
    }

    this.instanceDeadTrees = function(n) {
        for (var index = 0; index < n; index++) {
            var newInstance = this.deadtreeAssets.createInstance("i" + index);
            newInstance.parent = this.planet;
            newInstance.scaling = new BABYLON.Vector3(0.1,0.1,0.1);
            var randomPosition = getRandomLoc2(this.planet.radius);
            var rotation = getRotation(randomPosition);

            newInstance.position = randomPosition;

            rotation.decompose(null,newInstance.rotationQuaternion,null,null);

        }
    }

    

    this.sounds = function(scene){
        var music = new BABYLON.Sound("Music", "./res/sounds/game-song.wav", scene, null, {
            loop: true,
            autoplay: true,
            volume:1
        });

        var hammer_sound  = new BABYLON.Sound("click", "./res/sounds/hammer.wav", scene);
        var walking_sound = new BABYLON.Sound("gunshot", "./res/sounds/walking.wav", scene);


        window.addEventListener("mousedown", function(evt) {
            if (evt.button === 0) {
                hammer_sound.play();
            }
        });

        window.addEventListener("keydown", function (evt) {
            // Press space key to fire
            if (evt.keyCode === 87 || evt.keyCode === 83 || evt.keyCode === 65|| evt.keyCode === 68 ) {
                if(!walking_sound.isPlaying){
                    walking_sound.play(); 
                }
 
            }
        });
    }


    this.GUI_environment = function(game,scene){
        var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("game UI");

        var buttonQuit = BABYLON.GUI.Button.CreateSimpleButton("Quit_button", "Menu");
        buttonQuit.alpha = 0.7;
        buttonQuit.thickness = 4;
        buttonQuit.width = 0.1;
        buttonQuit.height = 0.1;
        buttonQuit.cornerRadius = 540;
        buttonQuit.children[0].color = "white";
        buttonQuit.children[0].fontSize = 30;
        buttonQuit.color = "#303233";
        buttonQuit.background = "red";
        buttonQuit.horizontalAlignment = 1;
        buttonQuit.verticalAlignment = 0;
        advancedTexture2.addControl(buttonQuit); 
        buttonQuit.onPointerClickObservable.add(function () {SecondaryMenu(advancedTexture2,game);});
    }
}



function getRandomLoc(R){
    var phi = Math.random()*Math.PI;
    var theta = Math.random()*Math.PI - Math.PI/2;
    var x = R*Math.sin(phi)*Math.cos(theta);
    var y = R*Math.sin(phi)*Math.sin(theta);
    var z = R*Math.cos(phi)                ;
    return new BABYLON.Vector3(x,y,z);
}

function getRotation(position){

    var z = BABYLON.Vector3.Normalize(position);
    var random_vector =  new BABYLON.Vector3(Math.random(),Math.random(),Math.random()).normalize();

    var x = (z.cross(random_vector)).normalize();
    var y = x.cross(z).normalize(); 

    var m = new BABYLON.Matrix();
    m.setRow(0,new BABYLON.Vector4(x._x,x._y,x._z,0))
    m.setRow(2,new BABYLON.Vector4(y._x,y._y,y._z,0))
    m.setRow(1,new BABYLON.Vector4(-z._x,-z._y,-z._z,0))

    return m;
}

function getRandomLoc2(R){
    var phi = Math.random()*Math.PI;
    var theta = Math.random()*Math.PI + Math.PI/2;
    var x = R*Math.sin(phi)*Math.cos(theta);
    var y = R*Math.sin(phi)*Math.sin(theta);
    var z = R*Math.cos(phi)                ;
    return new BABYLON.Vector3(x,y,z);
}