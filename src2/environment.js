// this class is used to define the game scene except player and zombies

function Environment(scene) {
    this.scene = scene;

    this.treeAssets = null;
    this.houseAssets = null;


    this.load = async function() { // Here you load the world assets


        var skybox = createSkyBox(scene);
        skybox.setTime(0);

        var planetMat = new BABYLON.StandardMaterial("mat1", scene);
        planetMat.ambientTexture = new BABYLON.Texture("./res/textures/mars.jpg",scene);
        planetMat.specularColor = new BABYLON.Color3(0,0,0);
            
        const R = 30.0;
        const planet_rotation =  new BABYLON.Vector3(Math.PI/2 , Math.PI/2, Math.PI/2);
        var planet = BABYLON.MeshBuilder.CreateSphere("planet", {diameter:R*2}, scene);
        planet.radius = R;
        this.planet = planet.id;
        planet.rotation = planet_rotation;
    
        planet.material = planetMat;

        // debugging camera 
        this.camera = new BABYLON.ArcRotateCamera("camera", 4, 2, 3*R, BABYLON.Vector3.Zero());
        this.camera.parent = planet;

        // TODO look at Promise.all() to see if it's faster
        await this.loadTreeAssets(this.scene);
        await this.loadHouseAssets(this.scene);
        this.houseAssets.parent = planet

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



}