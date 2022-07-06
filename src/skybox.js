function createSkyBox(scene) {
    var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyMaterial;

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
			case 49: skybox.setSkyConfig("material.inclination", skybox.material.inclination, 0); break; // 1
			case 50: skybox.setSkyConfig("material.inclination", skybox.material.inclination, -0.5); break; // 2

			case 51: skybox.setSkyConfig("material.luminance", skybox.material.luminance, 0.1); break; // 3
			case 52: skybox.setSkyConfig("material.luminance", skybox.material.luminance, 1.0); break; // 4
			
			case 53: skybox.setSkyConfig("material.turbidity", skybox.material.turbidity, 40); break; // 5
			case 54: skybox.setSkyConfig("material.turbidity", skybox.material.turbidity, 5); break; // 6
			
            case 55: skybox.setSkyConfig("material.cameraOffset.y", skybox.material.cameraOffset.y, 50); break; // 7
            case 56: skybox.setSkyConfig("material.cameraOffset.y", skybox.material.cameraOffset.y, 0); break;  // 8
			default: break;
		}
    });

    return skybox
}