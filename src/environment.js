// this class is used to define the game scene except player and zombies

function Environment(scene) {
    //this.game = game;
    this.scene = scene;

    this.treeAssets = null;
    this.houseAssets = null;
    

    this.load = async function(game) { // Here you load the world assets
        this.skybox = createSkyBox(scene);
        this.skybox.setTime(0);
        if (game.flag_light != undefined) {
            this.skybox.sunlight_direct.intensity *= game.flag_light;
            this.skybox.sunlight.intensity *= game.flag_light;
        }

        var upperworldMat = new BABYLON.StandardMaterial("mat1", scene);
        upperworldMat.ambientTexture = new BABYLON.Texture("./res/textures/ground2.jpg",scene);
        upperworldMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        upperworldMat.specularPower = 64;
        upperworldMat.bumpTexture3 = new BABYLON.Texture(".res/textures/grassn.png", scene);

        var underworldMat = new BABYLON.StandardMaterial("mat2", scene);
        underworldMat.ambientTexture = new BABYLON.Texture("./res/textures/vulcan.jpg",scene);
        underworldMat.specularColor = new BABYLON.Color3(0.1,0.1,0.1);
        underworldMat.bumpTexture2 = new BABYLON.Texture(".res/textures/rockn.png", scene);
        underworldMat.specularPower = 64;

        var barrierMat = new BABYLON.StandardMaterial("barrierMat", scene);
        barrierMat.specularColor = new BABYLON.Color3(221,160,221);
        barrierMat.alpha = 0.3;
        var purple = new BABYLON.Color4(221/255,160/255,221/255,1);

            
        const R = 30.0;
        this.planet = BABYLON.MeshBuilder.CreateSphere("planet", {diameter:R*2}, scene);
        this.planet.radius = R;
        this.planet.isVisible = false;
        this.planet.rotationQuaternion = new BABYLON.Quaternion();

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
        await this.loadSkullAssets(this.scene);
        this.instanceTrees(20);
        this.instanceSkull(R);

        await this.loadHouseAssets(this.scene);
        this.houseAssets.position = new BABYLON.Vector3(-7.5 , R-1.9, 0);
        this.houseAssets.rotation = new BABYLON.Vector3(Math.PI/11.5,-Math.PI/2,0); //-Math.PI/11.5
        var min = new BABYLON.Vector3(-2.5,0,-2.5);
        var max = new BABYLON.Vector3(2.5,4,2.5);
        this.houseAssets.getChildren()[0].setBoundingInfo(new BABYLON.BoundingInfo(min,max))
        
        this.houseAssets.scaling = new BABYLON.Vector3(1.3,1.3, 1.3);
        this.houseAssets.getChildren().forEach(c=>c.id = "collidable");
        
        this.houseAssets.parent = this.planet;
        this.houseAssets.checkCollisions = true;


        await this.loadTractorAssets(this.scene);
        this.tractorAssets.position = new BABYLON.Vector3(R/2, -R*0.7, R/2);
        this.tractorAssets.rotation = new BABYLON.Vector3(3*Math.PI/4, Math.PI/4, 0);
        this.tractorAssets.scaling = new BABYLON.Vector3(0.7,0.7,0.7);
        this.tractorAssets.parent = this.upperworld;
        this.tractorAssets.checkCollisions = true;
        this.tractorAssets.getChildren().forEach(c=>c.id = "collidable");

        await this.loadStoneAssets(this.scene);
        this.stoneAssets.position = new BABYLON.Vector3(R/2, R*0.7, R/2);
        this.stoneAssets.rotation = new BABYLON.Vector3(Math.PI/4, Math.PI/4, 0);
        this.stoneAssets.scaling = new BABYLON.Vector3(0.02,0.02,0.02);
        this.stoneAssets.parent = this.upperworld;
        this.stoneAssets.checkCollisions = true;
        this.stoneAssets.getChildren().forEach(c=>c.id = "collidable");

        await this.loadPCrystalAssets(this.scene);
        this.pcrystalAssets.position = new BABYLON.Vector3( 0, R+3.5,0);
        this.pcrystalAssets.rotation = new BABYLON.Vector3(0,0,0);
        this.pcrystalAssets.scaling = new BABYLON.Vector3(0.1,0.1,0.1);
        this.pcrystalAssets.parent = this.upperworld;
        this.pcrystalAssets.checkCollisions = true;
        this.pcrystalAssets.getChildren().forEach(c=>c.id = "collidable");

        await this.loadSmallCrystalAssets(this.scene);
        this.smallcrystalAssets.position = new BABYLON.Vector3( 5.7, -R-1,-4);
        this.smallcrystalAssets.rotation = new BABYLON.Vector3(0,Math.PI/2,Math.PI);
        this.smallcrystalAssets.scaling = new BABYLON.Vector3(30,30,30);
        this.smallcrystalAssets.parent = this.upperworld;
        this.smallcrystalAssets.checkCollisions = true;
        this.smallcrystalAssets.getChildren().forEach(c=>c.id = "collidable");

        await this.loadRubyAssets(this.scene);
        this.rubyAssets.position = new BABYLON.Vector3( 0, R-1.2 ,0);
        this.rubyAssets.rotation = new BABYLON.Vector3(0,0,0);
        this.rubyAssets.scaling = new BABYLON.Vector3(4,4,4);
        this.rubyAssets.parent = this.underworld;
        this.rubyAssets.checkCollisions = true;
        this.rubyAssets.getChildren().forEach(c=>c.id = "collidable");


        await this.loadGraveCrystalAssets(this.scene);
        this.gravecrystalAssets.position = new BABYLON.Vector3( -10, R-1.2 ,8);
        this.gravecrystalAssets.rotation = new BABYLON.Vector3(0, 0, 0);
        this.gravecrystalAssets.scaling = new BABYLON.Vector3(17,17,17);
        this.gravecrystalAssets.parent = this.underworld;
        this.gravecrystalAssets.checkCollisions = true;
        this.gravecrystalAssets.getChildren().forEach(c=>c.id = "collidable");


        await this.loadGraveAssets(this.scene);
        this.graveAssets.position = new BABYLON.Vector3( -15, R-2 ,0);
        this.graveAssets.rotation = new BABYLON.Vector3(- Math.PI/6,Math.PI/2 ,Math.PI/12);
        this.graveAssets.scaling = new BABYLON.Vector3(9,9,9);
        this.graveAssets.parent = this.underworld;
        this.graveAssets.checkCollisions = true;
        this.graveAssets.id = "collidable";


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
        this.redPlanet.parent = this.planet;

        this.greenPlanet = BABYLON.MeshBuilder.CreateSphere("green", {diameter:60}, scene);
        this.greenPlanet.material = greenMat;
        this.greenPlanet.position = new BABYLON.Vector3(-150,-80,100);
        this.greenPlanet.rotation.y = Math.PI;
        this.greenPlanet.parent = this.planet;

        this.brownPlanet = BABYLON.MeshBuilder.CreateSphere("brown", {diameter:60}, scene);
        this.brownPlanet.material = terraMat;
        this.brownPlanet.position = new BABYLON.Vector3(-100,-30,-100);
        this.brownPlanet.rotation.y = Math.PI/2;
        this.brownPlanet.parent = this.planet;

        this.ring = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 10, diameter: 100, tessellation:32});
        this.ring.material = sandMat;
        this.ring.rotation.x = -Math.PI/6;
        this.ring.parent = this.brownPlanet;


    
    
        var fogTexture = new BABYLON.Texture("./res/textures/smoke.png", this.scene);


        this.smokeFountain = BABYLON.Mesh.CreateBox("foutain", .01, this.scene);
        this.smokeFountain.position = new BABYLON.Vector3(0.0, R, 0);
        this.smokeFountain.visibility = 0;
        this.smokeFountain.parent = this.underworld;

        this.smoke = new BABYLON.ParticleSystem("particles", 2500 , this.scene);
        this.smoke.manualEmitCount = this.smoke.getCapacity();
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
        this.smoke.parent = this.underworld;
        this.smoke.isLocal = true;
        this.smoke.start();
        //this.playerStatus = new playerLife(3,10,true);
        //console.log(playerLife);
        
    }

    // TODO save all path in a file where you put all const variables
    this.loadTreeAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/tree-05-babylon/", "tree-05.babylon", scene).then(
            (result) =>{
                this.treeAssets = result.meshes[0];
                this.treeAssets.isVisible = false; // i want to instance it
                this.treeAssets.checkCollisions = true;
            });
    }

    this.loadSkullAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/skull-babylon/", "skull.babylon", scene).then(
            (result) =>{
                this.skullAssets = result.meshes[0];
                this.skullAssets.isVisible = false; // i want to instance it
                this.skullAssets.checkCollisions = true;
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
            newInstance.checkCollisions = true;
            newInstance.position = randomPosition;
            newInstance.id = "collidable";
            // set the bounding box to contain just the center of the tree
            var min = new BABYLON.Vector3(-4,0,-7);
            var max = new BABYLON.Vector3(-2,20,-5);
            newInstance.setBoundingInfo(new BABYLON.BoundingInfo(min,max));
            rotation.decompose(null,newInstance.rotationQuaternion,null,null);

        }
    }

    this.instanceSkull = function(R) {
        var position = [new BABYLON.Vector3( R-3.0,R/2 ,0),
        new BABYLON.Vector3( -R+3.0,R/2 ,0)];
        for (var index = 0; index < 2; index++) {
            var newInstance = this.skullAssets.createInstance("i" + index);
            newInstance.parent = this.underworld;
            newInstance.scaling = new BABYLON.Vector3(2,2,2);
            var rotation = getRotation(position[index]);
            newInstance.checkCollisions = true;
            newInstance.position = position[index];
            newInstance.id = "collidable";
            rotation.decompose(null,newInstance.rotationQuaternion,null,null);

        }
    }

    

    this.sounds = function(scene){
        var music = new BABYLON.Sound("Music", "./res/sounds/game-song.wav", scene, null, {
            loop: true,
            autoplay: true,
            volume:0.5
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

        game.environment.sounds(scene);
        //var buttonLost = BABYLON.GUI.Button.CreateSimpleButton("New_button", "New ghost");
        //buttonLost.thickness = 4;
        //buttonLost.width = 0.2;
        //buttonLost.height = 0.1;
        //buttonLost.cornerRadius = 540;
        //buttonLost.children[0].color = "white";
        //buttonLost.children[0].fontSize = 30;
        //buttonLost.color = "#303233";
        //buttonLost.background = "red";
        //buttonLost.horizontalAlignment = 1;
        //buttonLost.verticalAlignment = 1;
        //buttonLost.alpha = 0.8;
        //advancedTexture2.addControl(buttonLost); 
        //buttonLost.onPointerClickObservable.add(function () {game.enemy.callEnemies()});

        var buttonQuit = BABYLON.GUI.Button.CreateSimpleButton("Quit_button", "Menu");
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
        buttonQuit.alpha = 0.8;
        advancedTexture2.addControl(buttonQuit); 
        buttonQuit.onPointerClickObservable.add(function () {SecondaryMenu(advancedTexture2,game);});

        var rect = new BABYLON.GUI.Rectangle();
        rect.width = "180px";
        rect.height = "60px";
        rect.cornerRadius = 20;
        rect.color = "red";
        rect.thickness = 3;
        rect.background = "white";
        rect.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        rect.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP; 
        advancedTexture2.addControl(rect);

        var grid = new BABYLON.GUI.Grid();   
        grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTRE;
        grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTRE; 
        grid.width = 1;
        grid.height = 1;
        grid.addColumnDefinition(0.5);
        grid.addColumnDefinition(0.5);
        grid.addColumnDefinition(0.5);
        rect.addControl(grid);

        var life1 = new BABYLON.GUI.Image("but", "res/textures/life.jpg");
        life1.width = 1;
        life1.height = 1;
        grid.addControl(life1,0,0); this.life1 = life1;

        var life2 = new BABYLON.GUI.Image("but", "res/textures/life.jpg");
        life2.width = 1;
        life2.height = 1;
        grid.addControl(life2,0,1); this.life2 = life2;

        var life3 = new BABYLON.GUI.Image("but", "res/textures/life.jpg");
        life3.width = 1;
        life3.height = 1;
        grid.addControl(life3,0,2); this.life3 = life3;

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
    var theta = Math.random()*Math.PI;
    var x = (R+1)*Math.sin(phi)*Math.cos(theta);
    var y = (R+1)*Math.sin(phi)*Math.sin(theta);
    var z = (R+1)*Math.cos(phi)                ;
    return new BABYLON.Vector3(x,y,z);
}

