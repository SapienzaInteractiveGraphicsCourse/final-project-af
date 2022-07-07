var player_path = "./res/models/player/";

function createPlayer(scene) {
    var player = null;
    BABYLON.SceneLoader.Append("./res/models/player/","player.gltf", scene,function(scene) {
        player =  scene.getMeshById("__root__");
    
        // player and zombies have equal hierarchical trees and mesh names, 
        // they can only be distinguished by their unique id
        // this is why I rename all nodes and meshes with a prefix
        rename_with_prefix(player,"p_");

        // place the model in the world
        // use "characterMedium" to orient the player in world frame
        let base = scene.getMeshById("p_characterMedium");
        base.rotation.y = Math.PI;


        loadAnimations(player);
    });
    return player;

}

function loadAnimations(player) {
    var frame_rate = 100;

    // 1) Define an animation group
    var p_rest_anim = new BABYLON.AnimationGroup("p_rest_anim"); 

    // 2) Define an animation for each joint
    var p_rest_left_arm = new BABYLON.Animation("p_rest_left_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    //    And set the keys
    p_rest_left_arm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.17,1.57,-1)},
        { frame: 50, value: new BABYLON.Vector3(0.11,1.57,-1)},
        { frame: 100, value: new BABYLON.Vector3(-0.17,1.57,-1)},

    ]);
    // 3) Link the animation to the joint
    p_rest_anim.addTargetedAnimation(p_rest_left_arm,scene.getNodeById("p_LeftArm"));


    p_rest_anim.speedRatio = 0.25;
    p_rest_anim.play(true);


    // return a dictionary with all the animation groups
    return {"rest": p_rest_anim};
}


function rename_with_prefix(x,prefix) {
    x.id = prefix + x.id; // add a prefix
    let children = x.getChildren()
    if (children == []) {return;} // no children left here
    // else
    children.forEach(child => rename_with_prefix(child,prefix));

    return;
}