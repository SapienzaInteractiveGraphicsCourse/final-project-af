var player = null;
var player_prefix = "p"

function createPlayer(scene) {
    BABYLON.SceneLoader.Append("./res/models/player/","player.gltf", scene,function(scene) {
        player =  scene.getMeshById("__root__") 
        // player and zombies have equal hierarchical trees and mesh names, 
        // they can only be distinguished by their unique id
        // this is why I rename all nodes and meshes with a prefix
        rename_with_prefix(player,player_prefix);
    });

    // use "characterMedium" to orient the player in world frame

}


function rename_with_prefix(x,prefix) {
    x.id = prefix + x.id; // add a prefix
    let children = x.getChildren()
    if (children == []) {return;} // no children left here
    // else
    children.forEach(child => rename_with_prefix(child,prefix));

    return;
}