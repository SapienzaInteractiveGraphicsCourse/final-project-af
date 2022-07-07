var player_path = "./res/models/player/";
var player_prefix = "p"

var animations;

function createPlayer(scene) {
    var player = null;

    animations = BABYLON.Animation.ParseFromFileAsync("resting",player_path+"resting.json");

    BABYLON.SceneLoader.Append("./res/models/player/","player.gltf", scene,function(scene) {
        player =  scene.getMeshById("__root__") 
        // player and zombies have equal hierarchical trees and mesh names, 
        // they can only be distinguished by their unique id
        // this is why I rename all nodes and meshes with a prefix
        rename_with_prefix(player,player_prefix);

        // place the model in the world
        // use "characterMedium" to orient the player in world frame
        let base = scene.getMeshById(player_prefix+"characterMedium");
        base.rotation.y = Math.PI;

        // load necessary animations
    });
    return player
}

/*
        let left_shoulder = scene.getNodeById(player_prefix+"LeftShoulder");
        let right_shoulder = scene.getNodeById(player_prefix+"RightShoulder");
*/


function rename_with_prefix(x,prefix) {
    x.id = prefix + x.id; // add a prefix
    let children = x.getChildren()
    if (children == []) {return;} // no children left here
    // else
    children.forEach(child => rename_with_prefix(child,prefix));

    return;
}