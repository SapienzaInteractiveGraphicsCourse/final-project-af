function createSkyBox(scene) {
    var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;

    var skybox = new BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyMaterial;

    var sunlight = new BABYLON.DirectionalLight("sunlight",new BABYLON.Vector3(0, -1, 0), scene);
    sunlight.parent = skybox;


    skybox.setTime = function(time_to) {
        // change position of sun (visual)
        var time_from = skybox.material.inclination; 
                
		var keys = [
            { frame: 0, value: time_from },
			{ frame: 100, value: time_to }
        ];

        var animation = new BABYLON.Animation("animation","material.inclination", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);


        // change light direction
        var rot_from = skybox.rotation.x;
        var rot_to = -time_to*Math.PI;

        var keys = [
            { frame: 0, value: rot_from },
			{ frame: 100, value: rot_to }
        ];

        var animation_rot = new BABYLON.Animation("animation_rot","rotation.x", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation_rot.setKeys(keys);
        scene.stopAnimation(skybox);
		scene.beginDirectAnimation(skybox, [animation,animation_rot], 0, 100, false, 1);

    }

    skybox.setSkyConfig = function (property, from, to) {
		var keys = [
            { frame: 0, value: from },
			{ frame: 100, value: to }
        ];

		var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);
		
		scene.stopAnimation(skybox);
		scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
	};
    
    // add key listeners (temp)
    window.addEventListener("keydown", function (evt) {
        
		switch (evt.keyCode) {

			case 49: skybox.setTime(skybox.material.inclination+0.1); break; // 1
			case 50: skybox.setTime(skybox.material.inclination-0.1); break; // 2

			case 51: skybox.setSkyConfig("material.luminance", skybox.material.luminance, 0.1); break; // 3
			case 52: skybox.setSkyConfig("material.luminance", skybox.material.luminance, 1.0); break; // 4
			default: break;
		}
    });

    return skybox
}