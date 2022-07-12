// this class is used to define the game scene except player and zombies

function Environment(scene) {
    //this.game = game;
    this.scene = scene;

    this.treeAssets = null;
    this.houseAssets = null;


    this.load = async function(game) { // Here you load the world assets
        var skybox = createSkyBox(scene);
        skybox.setTime(0);

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("game UI");

        var buttonQuit = BABYLON.GUI.Button.CreateSimpleButton("Quit_button", "QUIT");
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
        advancedTexture.addControl(buttonQuit); 
        console.log(game);
        buttonQuit.onPointerClickObservable.add(function () {

        SecondaryMenu(advancedTexture,game);
        });

        var planetMat = new BABYLON.StandardMaterial("mat1", scene);
        planetMat.ambientTexture = new BABYLON.Texture("./res/textures/mars.jpg",scene);
        planetMat.specularColor = new BABYLON.Color3(0,0,0);
            
        const R = 30.0;
        var planet_rotation =  new BABYLON.Vector3(Math.PI/2 , Math.PI/2, Math.PI/2);
        this.planet = BABYLON.MeshBuilder.CreateSphere("planet", {diameter:R*2}, scene);
        this.planet.radius = R;
        this.planet.rotation = planet_rotation;
    
        this.planet.material = planetMat;

        // debugging camera 
        this.camera = new BABYLON.ArcRotateCamera("camera", 4, 2, 3*R, BABYLON.Vector3.Zero());
        this.camera.parent = this.planet;

        // TODO look at Promise.all() to see if it's faster
        await this.loadTreeAssets(this.scene);

        this.instanceTrees(50);
        //await this.loadHouseAssets(this.scene);
        //this.houseAssets.parent = planet

        // every object has the planet as its parent
    }


    // TODO save all path in a file where you put all const variables
    this.loadTreeAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/tree-05-babylon/", "tree-05.babylon", scene).then(
            (result) =>{
                this.treeAssets = result.meshes[0];
                this.treeAssets.isVisible = false; // i want to instance it
            });
    }
    this.loadHouseAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/old-house-babylon/", "old-house.babylon", scene).then(
            (result) =>{this.houseAssets = result.meshes[0];});
    }

    this.instanceTrees = function(n) {
        for (var index = 0; index < n; index++) {
            var newInstance = this.treeAssets.createInstance("i" + index);
            newInstance.parent = this.planet;
            newInstance.scaling = new BABYLON.Vector3(0.1,0.1,0.1);
            var randomPosition = getRandomLoc(this.planet.radius);
            var rotation = getRotation(randomPosition);

            newInstance.position = randomPosition;

            rotation.decompose(null,newInstance.rotationQuaternion,null,null);

        }
    }
}


function getRandomLoc(R){
    var phi = Math.random()*Math.PI;
    var theta = Math.random()*2*Math.PI;
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