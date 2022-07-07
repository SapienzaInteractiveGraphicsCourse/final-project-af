var result = null;

var createScene = function () {
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

   camera.attachControl(canvas, true);

   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
   light.intensity = 0.7;

   // SWITCHING ON DOUBLE CLICK
   var switchCam = true;
   scene.onPointerObservable.add((pointerInfo) => {
       if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOUBLETAP) {
           if (switchCam) {
               camera2.detachControl(canvas);
               scene.activeCamera = camera;
               camera.attachControl(canvas, true);
           } else {
               camera.detachControl(canvas);
               scene.activeCamera = camera2;
               camera2.attachControl(canvas, true);
           }
           switchCam = !switchCam;
       }
   });

    // var box = new BABYLON.MeshBuilder.CreateBox("box",scene);

    var skybox = createSkyBox(scene);

    createPlayer(scene);

    // Our built-in 'ground' shape.
    //var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 1, height: 1}, scene);

    skybox.setSkyConfig("material.inclination", skybox.material.inclination, 0);

    return scene;
};