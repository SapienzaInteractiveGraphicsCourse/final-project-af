function createSkyBox(scene,game) {
    var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;

    this.skybox = new BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyMaterial;

    var sunlight_direct = new BABYLON.DirectionalLight("sunlight_direct",new BABYLON.Vector3(0, -1, 0), scene);
    sunlight_direct.parent = skybox;
    sunlight_direct.intensity = 2.0;
    skybox.sunlight_direct = sunlight_direct;
    
    var sunlight = new BABYLON.HemisphericLight("sunlight",new BABYLON.Vector3(0, 1, 0), scene);
    var max_intensity = 1;//this.intensity;

    sunlight.intensity = max_intensity;
    skybox.sunlight = sunlight;
    // smoothly changes time to time_to
    skybox.setTime = function(time_to,speed=1,cycle=false) {
        // change position of sun (visual)
        var time_from = skybox.material.inclination; 
                
		var keys = [
            { frame: 0, value: time_from },
			{ frame: 100, value: time_to }
        ];

        var sky_animation = new BABYLON.Animation("sky_animation","material.inclination", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
		sky_animation.setKeys(keys);

        // change light direction
        var rot_from = skybox.rotation.x;
        var rot_to = -time_to*Math.PI;

        var keys = [
            { frame: 0, value: rot_from },
			{ frame: 100, value: rot_to }
        ];

        var animation_rot = new BABYLON.Animation("animation_rot","rotation.x", 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
		animation_rot.setKeys(keys);

        skybox.getScene().stopAnimation(skybox);
		skybox.getScene().beginDirectAnimation(skybox, [sky_animation,animation_rot], 0, 100, cycle, speed);
    }

    // change any property with smooth interpolation
    skybox.setSkyConfig = function (property, from, to) {
		var keys = [
            { frame: 0, value: from },
			{ frame: 100, value: to }
        ];

		var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);
		
		skybox.getScene().stopAnimation(skybox);
		skybox.getScene().beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
	};
    

    /* Enable/Disable daylight cycle */
    skybox.cycling = false;
    skybox.startCycling = function() {

        if (this.cycling) {
            console.log("already cycling");
            return;
        }
        this.cycling = true;

        // get current orientation
        var time_to = skybox.material.inclination + 0.1;
        this.setTime(time_to,1,true);


    }
    skybox.stopCycling = function() {
        if (!this.cycling) {
            console.log("already not cycling");
            return;
        }
        this.cycling = false;
        scene.stopAnimation(skybox);
    }

    // add key listeners (temp)
    window.addEventListener("keydown", function (evt) {
        
		switch (evt.keyCode) {

			case 49: skybox.setTime(skybox.material.inclination+0.1); break; // 1
			case 50: skybox.setTime(skybox.material.inclination-0.1); break; // 2

			//case 51: skybox.setSkyConfig("material.luminance", skybox.material.luminance, 0.1); break; // 3
            case 51: skybox.startCycling(); break; // 3
			//case 52: skybox.setSkyConfig("material.luminance", skybox.material.luminance, 1.0); break; // 4
            case 52: skybox.stopCycling(); break; // 4
			default: break;
		}
    });

    return skybox
}