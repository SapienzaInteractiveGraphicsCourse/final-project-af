var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());

    camera_position = new BABYLON.Vector3(0, 5, -10)


   // FREE CAMERA
   var camera = new BABYLON.FreeCamera("camera1", camera_position, scene);
   camera.setTarget(BABYLON.Vector3.Zero());

   // ARCROTATE CAMERA
   var camera2 = new BABYLON.ArcRotateCamera("camera2", -Math.PI / 4, 1.1, 20, BABYLON.Vector3.Zero());
   camera2.target = BABYLON.Vector3.Zero();

   camera.attachControl(canvas, true);

   // SWITCHING ON DOUBLE CLICK
   var switchCam = true;
   scene.onPointerObservable.add((pointerInfo) => {
       if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOUBLETAP) {
           if (switchCam) {
               camera.detachControl(canvas);
               scene.activeCamera = camera2;
               camera2.attachControl(canvas, true);
           } else {
               camera2.detachControl(canvas);
               scene.activeCamera = camera;
               camera.attachControl(canvas, true);
           }
           switchCam = !switchCam;
       }
   });

    var skybox = createSkyBox(scene);
    skybox.setSkyConfig("material.inclination", skybox.material.inclination, 0);

    var worldMat = new BABYLON.StandardMaterial("mat1", scene);
    var worldText = new BABYLON.Texture("./res/textures/mars.jpg",scene);
    worldMat.ambientTexture = worldText;
    worldMat.specularColor = new BABYLON.Color3(0,0,0);

    var columns = 30;  // 6 columns
    var rows = 30;  // 4 rows

    var faceUV = new Array(columns*rows);
    
    
    const R = 30.0;
    const world_position = new BABYLON.Vector3(0.0, -R, 10.0);
    const world_rotation =  new BABYLON.Vector3(Math.PI/2 , Math.PI/2, Math.PI/2);
    const world = BABYLON.MeshBuilder.CreateSphere("world", {diameter:R*2}, scene);
    world.position = world_position;
    world.rotation = world_rotation;

    world.material = worldMat;

    var house = createHouse(scene);
    
    var tree = createTree(scene,[-10,-4,20],[2*Math.PI/5,Math.PI/5,0]);
    //var tree2 = createTree(scene,[10,0,0],[0,Math.PI/3,0]);
    //var tree3 = createTree(scene,[0,10,0],[0,Math.PI/3,0]);
    var tractor = createTractor(scene,[6,-0.85,7],[-Math.PI/25,0,-Math.PI/20]);
    var stone = createStone(scene,[-10,-3.6,0],[-Math.PI/10,Math.PI/20,0]);

    //var apollo = createApollo(scene,[0,-R,10.25 - R],[-Math.PI/2,0,0]);
    return scene;
};