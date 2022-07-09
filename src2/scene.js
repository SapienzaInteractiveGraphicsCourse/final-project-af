function createScene(canvas,engine) {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());

   // FREE CAMERA
   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
   camera.setTarget(BABYLON.Vector3.Zero());

   // ARCROTATE CAMERA
   var camera2 = new BABYLON.ArcRotateCamera("camera2", -Math.PI / 4, 1.1, 20, BABYLON.Vector3.Zero());
   camera2.target = BABYLON.Vector3.Zero();

   

    var skybox = createSkyBox(scene);

    var player = createPlayer(scene);

    skybox.setSkyConfig("material.inclination", skybox.material.inclination, 0);

    return scene;
};