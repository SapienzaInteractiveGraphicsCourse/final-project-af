function loadPlayerAnimations(player) {
    var frame_rate = 100;

    // 1) Define an animation group
    var p_rest_anim = new BABYLON.AnimationGroup("p_rest_anim"); 

    // 2) Define an animation for each joint
    
    var p_rest_left_shoulder = new BABYLON.Animation("p_rest_left_shoulder","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_rest_left_arm = new BABYLON.Animation("p_rest_left_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_rest_left_forearm = new BABYLON.Animation("p_rest_left_forearm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);                                               
    var p_rest_left_hand = new BABYLON.Animation("p_rest_left_hand","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var p_rest_right_shoulder = new BABYLON.Animation("p_rest_right_shoulder","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_rest_right_arm = new BABYLON.Animation("p_rest_right_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_rest_right_forearm = new BABYLON.Animation("p_rest_right_forearm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);                                               
    var p_rest_right_handthumb = new BABYLON.Animation("p_rest_right_handthumb","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var p_rest_hips_ctrl = new BABYLON.Animation("p_rest_hips_ctrl","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_hips =      new BABYLON.Animation("p_rest_hips","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_up_left_leg =    new BABYLON.Animation("p_rest_up_left_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_left_leg =       new BABYLON.Animation("p_rest_left_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_up_right_leg =    new BABYLON.Animation("p_rest_up_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_right_leg =       new BABYLON.Animation("p_rest_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_left_foot =      new BABYLON.Animation("p_rest_left_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_right_foot =      new BABYLON.Animation("p_rest_right_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_toes =      new BABYLON.Animation("p_rest_toes","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_spine =      new BABYLON.Animation("p_rest_spine","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_rest_neck =      new BABYLON.Animation("p_rest_neck","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

                                            

    //    And set the keys with the help of inspector (Shift+Ctrl+Alt+I)
    p_rest_spine.setKeys([
        { frame: 0, value: DegToRad(7.6,0,0)},
        { frame: 50, value:  DegToRad(11,0,0)},
        { frame: 100, value: DegToRad(7.6,0,0)},
    ]);

    p_rest_neck.setKeys([{ frame: 0, value: DegToRad(-15,-34,11.4)}]);

    p_rest_left_shoulder.setKeys([
        { frame: 0, value: DegToRad(-70,123.87,175)},
        { frame: 50, value: DegToRad(-70,123.87,175)},
        { frame: 100, value: DegToRad(-70,123.87,175)},
    ]);
    p_rest_left_arm.setKeys([
        { frame: 0, value: DegToRad(42.3,131.4,-24)},
        { frame: 50, value: DegToRad(23.4,140,-20)},
        { frame: 100, value:  DegToRad(42.3,131.4,-24)},
    ]);
    p_rest_left_forearm.setKeys([
        { frame: 0, value: DegToRad(44.14,7.7,16.5)},
        { frame: 50, value:  DegToRad(44.14,7.7,16.5)},
        { frame: 100, value:  DegToRad(44.14,7.7,16.5)},
    ]);
    p_rest_left_hand.setKeys([
        { frame: 0, value: DegToRad(11, 82.5,11.4)},
        { frame: 50, value:  DegToRad(11, 82.5,11.4)},
        { frame: 100, value:  DegToRad(11, 82.5,11.4)},
    ]);


    p_rest_right_shoulder.setKeys([{ frame: 0, value:   DegToRad(61.2,155.5, -101.7)},]);

    p_rest_right_arm.setKeys([{ frame: 0, value:   DegToRad(-3.6, -172, 12)}]);

    p_rest_right_forearm.setKeys([
        { frame: 0, value:   DegToRad(-6.4, 36.9, 64.2)},
        { frame: 50, value:   DegToRad(-6.4, 36.9, 64.2)},
        { frame: 100, value:  DegToRad(-6.4, 36.9, 64.2)},
    ]);

    p_rest_right_handthumb.setKeys([
        { frame: 0, value:   DegToRad(-53.5, -2, 3.6)},
        { frame: 50, value:  DegToRad(-53.5, -2, 3.6)},
        { frame: 100, value:  DegToRad(-53.5, -2, 3.6)},
    ]);


    p_rest_hips_ctrl.setKeys([{ frame: 0, value: DegToRad(-2, -180, -180)}]);
    p_rest_hips.setKeys([{ frame: 0, value: DegToRad(0, 154, -180)}]);
    p_rest_up_left_leg.setKeys([{ frame: 0, value:   DegToRad(10.9, 163.4, 166.2)},]);
    p_rest_left_leg.setKeys([{ frame: 0, value:   DegToRad(23.7, 11.3, 18.4)},]);
    p_rest_left_foot.setKeys([{ frame: 0, value:   DegToRad(-63.4, -21.5, -9.1)},]);
    p_rest_up_right_leg.setKeys([{ frame: 0, value:   DegToRad(18.5, 140.8, -178.7)}, ]);
    p_rest_right_leg.setKeys([{ frame: 0, value:   DegToRad(24.7, 1.6, -4.5)}]);
    p_rest_right_foot.setKeys([{ frame: 0, value:   DegToRad(-53.1, 0.4, 0)},]);
    p_rest_toes.setKeys([{ frame: 0, value: new BABYLON.Vector3(0.43,3,0)}]);


    // 3) Link the animation to the joint
    p_rest_anim.addTargetedAnimation(p_rest_spine,player.scene.getNodeById("p_Spine"));
    p_rest_anim.addTargetedAnimation(p_rest_neck,player.scene.getNodeById("p_Neck"));
    p_rest_anim.addTargetedAnimation(p_rest_left_shoulder,player.scene.getNodeById("p_LeftShoulder"));
    p_rest_anim.addTargetedAnimation(p_rest_left_arm,player.scene.getNodeById("p_LeftArm"));
    p_rest_anim.addTargetedAnimation(p_rest_left_forearm,player.scene.getNodeById("p_LeftForeArm"));
    p_rest_anim.addTargetedAnimation(p_rest_left_hand,player.scene.getNodeById("p_LeftHand"));
    p_rest_anim.addTargetedAnimation(p_rest_right_shoulder,player.scene.getNodeById("p_RightShoulder"));
    p_rest_anim.addTargetedAnimation(p_rest_right_arm,player.scene.getNodeById("p_RightArm"));
    p_rest_anim.addTargetedAnimation(p_rest_right_forearm,player.scene.getNodeById("p_RightForeArm"));
    p_rest_anim.addTargetedAnimation(p_rest_right_handthumb,player.scene.getNodeById("p_RightHandThumb1"));

    p_rest_anim.addTargetedAnimation(p_rest_up_left_leg,   player.scene.getNodeById("p_LeftUpLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_up_right_leg,   player.scene.getNodeById("p_RightUpLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_hips_ctrl,player.scene.getNodeById("p_HipsCtrl"));
    p_rest_anim.addTargetedAnimation(p_rest_hips,     player.scene.getNodeById("p_Hips"));
    p_rest_anim.addTargetedAnimation(p_rest_left_leg,      player.scene.getNodeById("p_LeftLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_right_leg,      player.scene.getNodeById("p_RightLeg"));
    p_rest_anim.addTargetedAnimation(p_rest_left_foot,     player.scene.getNodeById("p_LeftFoot"));
    p_rest_anim.addTargetedAnimation(p_rest_right_foot,     player.scene.getNodeById("p_RightFoot"));
    p_rest_anim.addTargetedAnimation(p_rest_toes,     player.scene.getNodeById("p_LeftToes"));
    p_rest_anim.addTargetedAnimation(p_rest_toes,     player.scene.getNodeById("p_RightToes"));
    


    // the animation was too fast so I slowed it down
    p_rest_anim.speedRatio = 0.25;
    
    // do the same for forward motion




    // 1) Define an animation group
    var p_walk_anim = new BABYLON.AnimationGroup("p_walk_anim"); 
    
    // 2) Define an animation for each joint
    var p_walk_left_shoulder = new BABYLON.Animation("p_walk_left_shoulder","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_left_arm = new BABYLON.Animation("p_walk_left_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_left_forearm = new BABYLON.Animation("p_walk_left_forearm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);                                               
    var p_walk_left_hand = new BABYLON.Animation("p_walk_left_hand","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var p_walk_right_shoulder = new BABYLON.Animation("p_walk_right_shoulder","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_right_arm = new BABYLON.Animation("p_walk_right_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_right_forearm = new BABYLON.Animation("p_walk_right_forearm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);                                               
    var p_walk_right_handthumb = new BABYLON.Animation("p_walk_right_handthumb","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var p_walk_hips_ctrl = new BABYLON.Animation("p_walk_hips_ctrl","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_hips =      new BABYLON.Animation("p_walk_hips","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_up_left_leg =    new BABYLON.Animation("p_walk_up_left_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_left_leg =       new BABYLON.Animation("p_walk_left_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_up_right_leg =    new BABYLON.Animation("p_walk_up_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_right_leg =       new BABYLON.Animation("p_walk_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_right_foot =      new BABYLON.Animation("p_walk_right_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_left_foot =      new BABYLON.Animation("p_walk_right_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_toes =      new BABYLON.Animation("p_walk_toes","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    var p_walk_spine =      new BABYLON.Animation("p_walk_spine","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var p_walk_neck =      new BABYLON.Animation("p_walk_neck","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

                                                
    //    And set the keys with the help of inspector (Shift+Ctrl+Alt+I)
    p_walk_spine.setKeys([
        { frame: 0, value: DegToRad(22,0,0)},
        { frame: 50, value:  DegToRad(11,0,0)},
        { frame: 100, value: DegToRad(22,0,0)},
    ]);

    p_walk_neck.setKeys([
        { frame: 0, value: DegToRad(0,-31.4,11)},
        { frame: 50, value: DegToRad(-15,-34,11.4)},
        { frame: 100, value: DegToRad(0,-31.4,11)}
    ]);
    p_walk_left_shoulder.setKeys([
        { frame: 0, value: DegToRad(-70,123.87,175)},
        { frame: 50, value: DegToRad(-70,123.87,175)},
        { frame: 100, value: DegToRad(-70,123.87,175)},
    ]);
    p_walk_left_arm.setKeys([
        { frame: 0, value: DegToRad(42.3,131.4,-24)},
        { frame: 50, value:DegToRad(16.1,142.8,-18.8)},
        { frame: 100, value:  DegToRad(42.3,131.4,-24)},
    ]);
    p_walk_left_forearm.setKeys([
        { frame: 0, value: DegToRad(44.14,7.7,16.5)},
        { frame: 50, value:  DegToRad(38.6,5.1,14.4)},
        { frame: 100, value:  DegToRad(44.14,7.7,16.5)},
    ]);
    p_walk_left_hand.setKeys([
        { frame: 0, value: DegToRad(11, 82.5,11.4)},
        { frame: 50, value:  DegToRad(11, 82.5,11.4)},
        { frame: 100, value:  DegToRad(11, 82.5,11.4)},
    ]);


    p_walk_right_shoulder.setKeys([
        { frame: 0, value:   DegToRad(52.0, 128, -148.7)},
        { frame: 50, value:   DegToRad(52.0, 128, -148.7)},
        { frame: 100, value:  DegToRad(52.0, 128, -148.7)},
    ]);

    p_walk_right_arm.setKeys([{ frame: 0, value:   DegToRad(6, -148, 2)}]);

    p_walk_right_forearm.setKeys([
        { frame: 0, value:   DegToRad(-6.4, 36.9, 64.2)},
        { frame: 50, value:   DegToRad(-6.4, 36.9, 64.2)},
        { frame: 100, value:  DegToRad(-6.4, 36.9, 64.2)},
    ]);

    p_walk_right_handthumb.setKeys([
        { frame: 0, value:   DegToRad(-53.5, -2, 3.6)},
        { frame: 50, value:  DegToRad(-53.5, -2, 3.6)},
        { frame: 100, value:  DegToRad(-53.5, -2, 3.6)},
    ]);



    p_walk_hips_ctrl.setKeys([{ frame: 0, value: DegToRad(-2, -180, -180)}]);
    p_walk_hips.setKeys([{ frame: 0, value: DegToRad(0, 154, -180)}]);
    p_walk_up_left_leg.setKeys([
        { frame: 0, value:   DegToRad(-31.7, 157.4, 170)},
        { frame: 50, value:  DegToRad(63.57, 162.9, -175.1)},
        { frame: 100, value:  DegToRad(-31.7, 157.4, 170)},
    ]);
    p_walk_left_leg.setKeys([
        { frame: 0, value:   DegToRad(84, -146.7, -160.5)},
        { frame: 50, value:  DegToRad(30, 12.7, -2.3)},
        { frame: 100, value: DegToRad(84, -146.7, -160.5)},
    ]);
    p_walk_left_foot.setKeys([
        { frame: 0, value:   DegToRad(-86.7, 35.8, -26.7)},
        { frame: 50, value:  DegToRad(-10.8, -12.9, 18.6)},
        { frame: 100, value:  DegToRad(-86.7, 35.8, -26.7)},
    ]);
    p_walk_up_right_leg.setKeys([
        { frame: 0, value:   DegToRad(48.5, 164.1, -161.5)},
        { frame: 50, value:  DegToRad(-29.1, 143.2, 155.9)},
        { frame: 100, value:  DegToRad(48.5, 164.1, -161.5)},
    ]);
    p_walk_right_leg.setKeys([ 
        { frame: 0, value:   DegToRad(40.2, 0, -5.4)},
        { frame: 50, value:  DegToRad(71.35, -55.7, -58.5)},
        { frame: 100, value:  DegToRad(40.2, 0, -5.4)},
    ]);
    p_walk_right_foot.setKeys([
        { frame: 0, value:   DegToRad(-35.1, 21.0, -8.24)},
        { frame: 50, value:  DegToRad(-39.1, 21.8, -8.7)},
        { frame: 100, value:  DegToRad(-35.1, 21.0, -8.24)},
    ]);

    
    p_walk_toes.setKeys([{ frame: 0, value: DegToRad(24.6, 172, 0)}]);

    // 3) Link the animation to the joint
    p_walk_anim.addTargetedAnimation(p_walk_left_shoulder,player.scene.getNodeById("p_LeftShoulder"));
    p_walk_anim.addTargetedAnimation(p_walk_left_arm,player.scene.getNodeById("p_LeftArm"));
    p_walk_anim.addTargetedAnimation(p_walk_left_forearm,player.scene.getNodeById("p_LeftForeArm"));
    p_walk_anim.addTargetedAnimation(p_walk_left_hand,player.scene.getNodeById("p_LeftHand"));
    p_walk_anim.addTargetedAnimation(p_walk_right_shoulder,player.scene.getNodeById("p_RightShoulder"));
    p_walk_anim.addTargetedAnimation(p_walk_right_arm,player.scene.getNodeById("p_RightArm"));
    p_walk_anim.addTargetedAnimation(p_walk_right_forearm,player.scene.getNodeById("p_RightForeArm"));
    p_walk_anim.addTargetedAnimation(p_walk_right_handthumb,player.scene.getNodeById("p_RightHandThumb1"));
    p_walk_anim.addTargetedAnimation(p_walk_up_left_leg,   player.scene.getNodeById("p_LeftUpLeg"));
    p_walk_anim.addTargetedAnimation(p_walk_up_right_leg,   player.scene.getNodeById("p_RightUpLeg"));
    p_walk_anim.addTargetedAnimation(p_walk_hips_ctrl,player.scene.getNodeById("p_HipsCtrl"));
    p_walk_anim.addTargetedAnimation(p_walk_hips,     player.scene.getNodeById("p_Hips"));
    p_walk_anim.addTargetedAnimation(p_walk_left_leg,      player.scene.getNodeById("p_LeftLeg"));
    p_walk_anim.addTargetedAnimation(p_walk_right_leg,      player.scene.getNodeById("p_RightLeg"));
    p_walk_anim.addTargetedAnimation(p_walk_left_foot,     player.scene.getNodeById("p_LeftFoot"));
    p_walk_anim.addTargetedAnimation(p_walk_right_foot,     player.scene.getNodeById("p_RightFoot"));
    p_walk_anim.addTargetedAnimation(p_walk_toes,     player.scene.getNodeById("p_LeftToes"));
    p_walk_anim.addTargetedAnimation(p_walk_toes,     player.scene.getNodeById("p_RightToes"));
    p_walk_anim.addTargetedAnimation(p_walk_neck,     player.scene.getNodeById("p_Neck"));
    p_walk_anim.addTargetedAnimation(p_walk_spine,     player.scene.getNodeById("p_Spine"));


    // return a dictionary with all the animation groups
    return {"rest": p_rest_anim};
}

function DegToRad(x,y,z){
    return new BABYLON.Vector3((x/180)*Math.PI, (y/180)*Math.PI, (z/180)*Math.PI);

}