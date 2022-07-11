function loadPlayerAnimations(player) {
    var frame_rate = 100;

    // 1) Define an animation group
    var p_rest_anim = new BABYLON.AnimationGroup("p_rest_anim"); 

    // 2) Define an animation for each joint
    var p_rest_left_arm = new BABYLON.Animation("p_rest_left_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_rest_right_arm = new BABYLON.Animation("p_rest_right_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                                                
    //    And set the keys with the help of inspector (Shift+Ctrl+Alt+I)
    p_rest_left_arm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.17,1.57,-1)},
        { frame: 50, value: new BABYLON.Vector3(0.11,1.57,-1)},
        { frame: 100, value: new BABYLON.Vector3(-0.17,1.57,-1)},
    ]);
    p_rest_right_arm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-1.0,-2.68,-0.12)},
        { frame: 50, value: new BABYLON.Vector3(-1.0,-2.68,0)},
        { frame: 100, value: new BABYLON.Vector3(-1.0,-2.68,-0.12)},
    ]);


    // 3) Link the animation to the joint
    p_rest_anim.addTargetedAnimation(p_rest_left_arm,player.scene.getNodeById("p_LeftArm"));
    p_rest_anim.addTargetedAnimation(p_rest_right_arm,player.scene.getNodeById("p_RightArm"));

    // the animation was too fast so I slowed it down
    p_rest_anim.speedRatio = 0.25;
    
    // do the same for forward motion

    // 1) Define an animation group
    var p_walk_anim = new BABYLON.AnimationGroup("p_walk_anim"); 

    // 2) Define an animation for each joint

                                                
    //    And set the keys with the help of inspector (Shift+Ctrl+Alt+I)


    // 3) Link the animation to the joint



    // return a dictionary with all the animation groups
    return {"rest": p_rest_anim};
}