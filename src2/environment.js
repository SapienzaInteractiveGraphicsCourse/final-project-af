// this class is used to define the game scene except player and zombies

function Environment(scene) {
    this.scene = scene;

    this.treeAssets = null;
    this.houseAssets = null;


    this.load = async function() { // Here you load the world assets
        var skybox = createSkyBox(scene);
        skybox.setTime(0);

        var worldMat = new BABYLON.StandardMaterial("mat1", scene);
        worldMat.ambientTexture = new BABYLON.Texture("./res/textures/mars.jpg",scene);
        worldMat.specularColor = new BABYLON.Color3(0,0,0);
            
        const R = 30.0;
        const world_position = new BABYLON.Vector3(0.0, -R, 10.0);
        const world_rotation =  new BABYLON.Vector3(Math.PI/2 , Math.PI/2, Math.PI/2);
        const world = BABYLON.MeshBuilder.CreateSphere("world", {diameter:R*2}, scene);
        world.position = world_position;
        world.rotation = world_rotation;
    
        world.material = worldMat;


        // TODO look at Promise.all() to see if it's faster
        //await this.loadTreeAssets(this.scene);
        //await this.loadHouseAssets(this.scene);
    }


    // TODO save all path in a file where you put all const variables
    this.loadTreeAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/tree-05-babylon/", "tree-05.babylon", scene).then(
            (result) =>{this.treeAssets = result.meshes[0];});
    }
    this.loadHouseAssets =  async function(scene) {
        return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/old-house-babylon/", "old-house.babylon", scene).then(
            (result) =>{this.houseAssets = result.meshes[0];});
    }



}