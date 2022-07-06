var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;
    
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyMaterial;

    BABYLON.SceneLoader.Append("","./res/models/man.obj", scene);


    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("res/textures/ground.jpg", scene);
	groundMaterial.diffuseTexture.uScale = 6;
	groundMaterial.diffuseTexture.vScale = 6;
    ground.material = groundMaterial;






    var setSkyConfig = function (property, from, to) {
		var keys = [
            { frame: 0, value: from },
			{ frame: 100, value: to }
        ];
		
		var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);
		
		scene.stopAnimation(skybox);
		scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
	};

    setSkyConfig("material.inclination", skybox.material.inclination, 0);

    window.addEventListener("keydown", function (evt) {
		switch (evt.keyCode) {
			case 49: setSkyConfig("material.inclination", skybox.material.inclination, 0); break; // 1
			case 50: setSkyConfig("material.inclination", skybox.material.inclination, -0.5); break; // 2

			case 51: setSkyConfig("material.luminance", skybox.material.luminance, 0.1); break; // 3
			case 52: setSkyConfig("material.luminance", skybox.material.luminance, 1.0); break; // 4
			
			case 53: setSkyConfig("material.turbidity", skybox.material.turbidity, 40); break; // 5
			case 54: setSkyConfig("material.turbidity", skybox.material.turbidity, 5); break; // 6
			
            case 55: setSkyConfig("material.cameraOffset.y", skybox.material.cameraOffset.y, 50); break; // 7
            case 56: setSkyConfig("material.cameraOffset.y", skybox.material.cameraOffset.y, 0); break;  // 8
			default: break;
		}
    });

    //var ufo_position = new BABYLON.Vector3(-3.0, 20, 1.0);
    //get_ufo(ufo_position, 2.0, scene);


    return scene;
};