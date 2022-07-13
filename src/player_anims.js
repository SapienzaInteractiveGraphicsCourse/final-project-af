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

    //right shoulder  left arm   spine                          

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
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_left_leg =       new BABYLON.Animation("p_walk_left_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_up_right_leg =    new BABYLON.Animation("p_walk_up_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_right_leg =       new BABYLON.Animation("p_walk_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_right_foot =      new BABYLON.Animation("p_walk_right_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_left_foot =      new BABYLON.Animation("p_walk_left_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_toes =      new BABYLON.Animation("p_walk_toes","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var p_walk_spine =      new BABYLON.Animation("p_walk_spine","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_walk_neck =      new BABYLON.Animation("p_walk_neck","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

                                                
    //    And set the keys with the help of inspector (Shift+Ctrl+Alt+I)
    p_walk_left_shoulder.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-1.222,2.162,3.054),
    },
        { frame: 50, value: new BABYLON.Vector3(-1.222,2.162,3.054),
    },
        { frame: 100, value: new BABYLON.Vector3(-1.222,2.162,3.054),
    },
    ]);
    p_walk_left_arm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.738,2.293,-0.419),
    },
        { frame: 50, value: new BABYLON.Vector3(0.281,2.492,-0.328),
    },
        { frame: 100, value: new BABYLON.Vector3(0.738,2.293,-0.419),
    },
    ]);
    p_walk_left_forearm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.77,0.134,0.288),
    },
        { frame: 50, value: new BABYLON.Vector3(0.674,0.089,0.251),
    },
        { frame: 100, value: new BABYLON.Vector3(0.77,0.134,0.288),
    },
    ]);
    p_walk_left_hand.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.192,1.44,0.199),
    },
        { frame: 50, value: new BABYLON.Vector3(0.192,1.44,0.199),
    },
        { frame: 100, value: new BABYLON.Vector3(0.192,1.44,0.199),
    },
    ]);
    p_walk_right_shoulder.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.908,2.234,-2.595),
    },
        { frame: 50, value: new BABYLON.Vector3(0.908,2.234,-2.595),
    },
        { frame: 100, value: new BABYLON.Vector3(0.908,2.234,-2.595),
    },
    ]);
    p_walk_right_arm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.105,-2.583,0.035),
    },
    ]);
    p_walk_right_forearm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.112,0.644,1.121),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.112,0.644,1.121),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.112,0.644,1.121),
    },
    ]);
    p_walk_right_handthumb.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.934,-0.035,0.063),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.934,-0.035,0.063),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.934,-0.035,0.063),
    },
    ]);
    p_walk_up_left_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.642,3.138,3.401),
    },
        { frame: 45, value: new BABYLON.Vector3(1.11,3.142,3.307),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.64,3.14,3.4),
    },
    ]);
    p_walk_up_right_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.846,2.864,-2.819),
    },
        { frame: 52, value: new BABYLON.Vector3(-0.508,2.499,-2.868),
    },
        { frame: 100, value: new BABYLON.Vector3(0.846,2.864,-2.819),
    },
    ]);
    p_walk_hips_ctrl.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.035,-3.142,-3.142),
    },
    ]);
    p_walk_hips.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0,2.688,-3.142),
    },
    ]);
    p_walk_left_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(1.466,-2.56,-2.801),
    },
        { frame: 50, value: new BABYLON.Vector3(0.524,0.222,-0.04),
    },
        { frame: 100, value: new BABYLON.Vector3(1.466,-2.56,-2.801),
    },
    ]);
    p_walk_right_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.702,0,-0.094),
    },
        { frame: 50, value: new BABYLON.Vector3(1.245,-0.972,-1.021),
    },
        { frame: 100, value: new BABYLON.Vector3(0.702,0,-0.094),
    },
    ]);
    p_walk_right_foot.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-1.513,0.625,-0.466),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.188,-0.225,0.325),
    },
        { frame: 100, value: new BABYLON.Vector3(-1.513,0.625,-0.466),
    },
    ]);
    p_walk_left_foot.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.613,0.367,-0.144),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.682,0.38,-0.152),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.613,0.367,-0.144),
    },
    ]);
    p_walk_toes.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.429,3.002,0),
    },
    ]);
    p_walk_toes.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.429,3.002,0),
    },
    ]);
    p_walk_neck.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0,-0.548,0.192),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.262,-0.593,0.199),
    },
        { frame: 100, value: new BABYLON.Vector3(0,-0.548,0.192),
    },
    ]);
    p_walk_spine.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.384,0,0),
    },
        { frame: 50, value: new BABYLON.Vector3(0.192,0,0),
    },
        { frame: 100, value: new BABYLON.Vector3(0.384,0,0),
    },
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



    //////////// PAIN ////////////////////////////////////

    // 1) Define an animation group
    var p_pain_anim = new BABYLON.AnimationGroup("p_pain_anim"); 

    // 2) Define an animation for each joint
    
    var p_pain_left_shoulder = new BABYLON.Animation("p_pain_left_shoulder","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_left_arm = new BABYLON.Animation("p_pain_left_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_left_forearm = new BABYLON.Animation("p_pain_left_forearm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);                                               
    var p_pain_left_hand = new BABYLON.Animation("p_pain_left_hand","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var p_pain_right_shoulder = new BABYLON.Animation("p_pain_right_shoulder","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_right_arm = new BABYLON.Animation("p_pain_right_arm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_right_forearm = new BABYLON.Animation("p_pain_right_forearm","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);                                               
    var p_pain_right_handthumb = new BABYLON.Animation("p_pain_right_handthumb","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var p_pain_hips_ctrl = new BABYLON.Animation("p_pain_hips_ctrl","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_hips =      new BABYLON.Animation("p_pain_hips","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_up_left_leg =    new BABYLON.Animation("p_pain_up_left_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_left_leg =       new BABYLON.Animation("p_pain_left_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_up_right_leg =    new BABYLON.Animation("p_pain_up_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_right_leg =       new BABYLON.Animation("p_pain_right_leg","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_left_foot =      new BABYLON.Animation("p_pain_left_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_right_foot =      new BABYLON.Animation("p_pain_right_foot","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_toes =      new BABYLON.Animation("p_pain_toes","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_spine =      new BABYLON.Animation("p_pain_spine","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var p_pain_neck =      new BABYLON.Animation("p_pain_neck","rotation",frame_rate,
                                                   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                                                   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    //right shoulder  left arm   spine   left up leg     left leg    left foot         neck            

    //    And set the keys with the help of inspector (Shift+Ctrl+Alt+I)
    p_pain_spine.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.192,0,0),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.524,0,0),
    },
        { frame: 100, value: new BABYLON.Vector3(0.192,0,0),
    },
    ]);
    p_pain_neck.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.262,-0.593,0.199),
    },
        { frame: 50, value: new BABYLON.Vector3(0.048,-0.532,0.195),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.262,-0.593,0.199),
    },
    ]);
    p_pain_left_shoulder.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-1.222,2.162,3.054),
    },
        { frame: 50, value: new BABYLON.Vector3(-1.222,2.162,3.054),
    },
        { frame: 100, value: new BABYLON.Vector3(-1.222,2.162,3.054),
    },
    ]);
    p_pain_left_arm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.738,2.293,-0.419),
    },
        { frame: 43.73881341509933, value: new BABYLON.Vector3(1.646,2.345,1.194),
    },
        { frame: 100, value: new BABYLON.Vector3(0.738,2.293,-0.419),
    },
    ]);
    p_pain_left_forearm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.77,0.134,0.288),
    },
        { frame: 50, value: new BABYLON.Vector3(1.192,-0.97,-0.517),
    },
        { frame: 100, value: new BABYLON.Vector3(0.77,0.134,0.288),
    },
    ]);
    p_pain_left_hand.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.192,1.44,0.199),
    },
        { frame: 50, value: new BABYLON.Vector3(0.192,1.44,0.199),
    },
        { frame: 100, value: new BABYLON.Vector3(0.192,1.44,0.199),
    },
    ]);
    p_pain_right_shoulder.setKeys([
        { frame: 0, value: new BABYLON.Vector3(1.068,2.714,-1.775),
    },
        { frame: 47.88111104088425, value: new BABYLON.Vector3(1.414,1.955,-2.029),
    },
        { frame: 100, value: new BABYLON.Vector3(1.068,2.714,-1.775),
    },
    ]);
    p_pain_right_arm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.063,-3.002,0.209),
    },
        { frame: 50.873653942079144, value: new BABYLON.Vector3(-0.035,-2.595,-0.446),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.063,-3.002,0.209),
    },
    ]);
    p_pain_right_forearm.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.112,0.644,1.121),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.112,0.644,1.121),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.112,0.644,1.121),
    },
    ]);
    p_pain_right_handthumb.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.934,-0.035,0.063),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.934,-0.035,0.063),
    },
        { frame: 100, value: new BABYLON.Vector3(-0.934,-0.035,0.063),
    },
    ]);
    p_pain_up_left_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.19,2.852,2.901),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.412,3.002,2.883),
    },
        { frame: 100, value: new BABYLON.Vector3(0.19,2.852,2.901),
    },
    ]);
    p_pain_up_right_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.323,2.457,-3.119),
    },
    ]);
    p_pain_hips_ctrl.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.035,-3.142,-3.142),
    },
    ]);
    p_pain_hips.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0,2.688,-3.142),
    },
    ]);
    p_pain_left_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.414,0.197,0.321),
    },
        { frame: 55.096314662128464, value: new BABYLON.Vector3(0.172,0.208,0.325),
    },
        { frame: 100, value: new BABYLON.Vector3(0.414,0.197,0.321),
    },
    ]);
    p_pain_right_leg.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.403,0.09,-0.033),
    },
        { frame: 50.3371977433269, value: new BABYLON.Vector3(0.403,0.09,-0.033),
    },
        { frame: 99.86559139784946, value: new BABYLON.Vector3(0.403,0.09,-0.033),
    },
    ]);
    p_pain_left_foot.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-1.107,-0.375,-0.159),
    },
        { frame: 50, value: new BABYLON.Vector3(-0.428,-0.485,-0.079),
    },
        { frame: 100, value: new BABYLON.Vector3(-1.107,-0.375,-0.159),
    },
    ]);
    p_pain_right_foot.setKeys([
        { frame: 0, value: new BABYLON.Vector3(-0.927,0.007,0),
    },
    ]);
    p_pain_toes.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.43,3,0),
    },
    ]);
    p_pain_toes.setKeys([
        { frame: 0, value: new BABYLON.Vector3(0.43,3,0),
    },
    ]);
    
    


    // 3) Link the animation to the joint
    p_pain_anim.addTargetedAnimation(p_pain_spine,player.scene.getNodeById("p_Spine"));
    p_pain_anim.addTargetedAnimation(p_pain_neck,player.scene.getNodeById("p_Neck"));
    p_pain_anim.addTargetedAnimation(p_pain_left_shoulder,player.scene.getNodeById("p_LeftShoulder"));
    p_pain_anim.addTargetedAnimation(p_pain_left_arm,player.scene.getNodeById("p_LeftArm"));
    p_pain_anim.addTargetedAnimation(p_pain_left_forearm,player.scene.getNodeById("p_LeftForeArm"));
    p_pain_anim.addTargetedAnimation(p_pain_left_hand,player.scene.getNodeById("p_LeftHand"));
    p_pain_anim.addTargetedAnimation(p_pain_right_shoulder,player.scene.getNodeById("p_RightShoulder"));
    p_pain_anim.addTargetedAnimation(p_pain_right_arm,player.scene.getNodeById("p_RightArm"));
    p_pain_anim.addTargetedAnimation(p_pain_right_forearm,player.scene.getNodeById("p_RightForeArm"));
    p_pain_anim.addTargetedAnimation(p_pain_right_handthumb,player.scene.getNodeById("p_RightHandThumb1"));

    p_pain_anim.addTargetedAnimation(p_pain_up_left_leg,   player.scene.getNodeById("p_LeftUpLeg"));
    p_pain_anim.addTargetedAnimation(p_pain_up_right_leg,   player.scene.getNodeById("p_RightUpLeg"));
    p_pain_anim.addTargetedAnimation(p_pain_hips_ctrl,player.scene.getNodeById("p_HipsCtrl"));
    p_pain_anim.addTargetedAnimation(p_pain_hips,     player.scene.getNodeById("p_Hips"));
    p_pain_anim.addTargetedAnimation(p_pain_left_leg,      player.scene.getNodeById("p_LeftLeg"));
    p_pain_anim.addTargetedAnimation(p_pain_right_leg,      player.scene.getNodeById("p_RightLeg"));
    p_pain_anim.addTargetedAnimation(p_pain_left_foot,     player.scene.getNodeById("p_LeftFoot"));
    p_pain_anim.addTargetedAnimation(p_pain_right_foot,     player.scene.getNodeById("p_RightFoot"));
    p_pain_anim.addTargetedAnimation(p_pain_toes,     player.scene.getNodeById("p_LeftToes"));
    p_pain_anim.addTargetedAnimation(p_pain_toes,     player.scene.getNodeById("p_RightToes"));

    

    // return a dictionary with all the animation groups
    return {"rest": p_rest_anim,"walk": p_walk_anim, "pain": p_pain_anim};
}

function DegToRad(x,y,z){
    return new BABYLON.Vector3((x/180)*Math.PI, (y/180)*Math.PI, (z/180)*Math.PI);

}