function loadPlayerAnimations(player) {
    var frame_rate = 100;

    // 1) Define an animation group
    var p_rest_anim = new BABYLON.AnimationGroup("p_rest_anim"); 

    // 2) Define an animation for each joint
    var p_rest_hips_ctrl = new BABYLON.Animation("p_rest_hips_ctrl","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_hips =      new BABYLON.Animation("p_rest_hips","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_up_leg =    new BABYLON.Animation("p_rest_up_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_leg =       new BABYLON.Animation("p_rest_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_foot =      new BABYLON.Animation("p_rest_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_toes =      new BABYLON.Animation("p_rest_toes","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    p_rest_hips_ctrl.setKeys([{ frame: 0, value: new BABYLON.Vector3(0,Math.PI,Math.PI)}]);
         p_rest_hips.setKeys([{ frame: 0, value: new BABYLON.Vector3(0,Math.PI,Math.PI)}]);
       p_rest_up_leg.setKeys([{ frame: 0, value: new BABYLON.Vector3(0.25,Math.PI,3.096)}]);
          p_rest_leg.setKeys([{ frame: 0, value: new BABYLON.Vector3(0.38,0,0)}]);
         p_rest_foot.setKeys([{ frame: 0, value: new BABYLON.Vector3(-1.11,0,0)}]);
         p_rest_toes.setKeys([{ frame: 0, value: new BABYLON.Vector3(0.43,3,0)}]);
    

    // 3) Link the animation to the joint
    p_rest_anim.addTargetedAnimation(p_rest_up_leg,   player.scene.getNodeById("p_LeftUpLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_up_leg,   player.scene.getNodeById("p_RightUpLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_hips_ctrl,player.scene.getNodeById("p_HipsCtrl"));
    p_rest_anim.addTargetedAnimation(p_rest_hips,     player.scene.getNodeById("p_Hips"));
    p_rest_anim.addTargetedAnimation(p_rest_leg,      player.scene.getNodeById("p_LeftLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_leg,      player.scene.getNodeById("p_RightLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_foot,     player.scene.getNodeById("p_LeftFoot"));
    p_rest_anim.addTargetedAnimation(p_rest_foot,     player.scene.getNodeById("p_RightFoot"));
    p_rest_anim.addTargetedAnimation(p_rest_toes,     player.scene.getNodeById("p_LeftToes"));
    p_rest_anim.addTargetedAnimation(p_rest_toes,     player.scene.getNodeById("p_RightToes"));

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