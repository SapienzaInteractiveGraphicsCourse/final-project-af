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

    var underworldMat = new BABYLON.StandardMaterial("mat2", scene);
    var underworldText = new BABYLON.Texture("./res/textures/vulcan.jpg",scene);
    underworldMat.ambientTexture = underworldText;
    underworldMat.specularColor = new BABYLON.Color3(0,0,0);

    var barrierMat = new BABYLON.StandardMaterial("barrierMat", scene);
	barrierMat.specularColor = new BABYLON.Color3(221,160,221);
    //barrierMat.diffuseTexture = new BABYLON.Texture(".res/textures/fuxya.png", scene);
	barrierMat.alpha = 0.3;

    
    const R = 30.0;
    const world_position = new BABYLON.Vector3(0.0, -R, 10.0);
    const world_rotation =  new BABYLON.Vector3(Math.PI/2,Math.PI, Math.PI/2);
    const world = BABYLON.MeshBuilder.CreateSphere("world", {diameter:R*2}, scene);
    world.position = world_position;
    world.rotation = world_rotation;
    world.material = worldMat;

    const underworld_rotation =  new BABYLON.Vector3( 0 , 0,Math.PI);
    const underworld = BABYLON.MeshBuilder.CreateSphere("underworld", {diameter:R*2+0.1, slice: 0.5});
    underworld.position = world_position;
    underworld.rotation = underworld_rotation;
    underworld.material = underworldMat;

    const barrier = BABYLON.MeshBuilder.CreateCylinder("barrier", {height :0.02, diameter:R*2 + 10, tessellation:48}, scene);
    barrier.position = world_position;
    var purple = new BABYLON.Color4(221/255,160/255,221/255,1);
    barrier.faceColors = [purple,purple,purple]
    barrier.material =  barrierMat;

    createPlanets(scene);


    var house = createHouse(scene);
    var chair = createChair(scene,[-5,-0.5,10],[0,Math.PI/2,-Math.PI/25]);
    var crystal = createCristals(scene,R, [0.0, -R, 10.0]);

    var tractor = createTractor(scene,[6,-0.85,7],[-Math.PI/25,0,-Math.PI/20]);
    var stone = createStone(scene,[-10,-3.6,0],[-Math.PI/10,Math.PI/20,0]);
    
    var position_random_tree = getRandomLoc([0.0, -R, 10.0],R);
    var rotation_random_tree = getRotation(position_random_tree,world_position);
    var tree = createRandomTrees(scene,position_random_tree,rotation_random_tree);

    var position_random_stone = getRandomLoc([0.0, -R, 10.0],R);
    var rotation_random_stone = getRotation(position_random_stone,world_position);

    var tomb = createGrave(scene,[0.0, -R, 10.0],R)


    window.addEventListener("keydown", (ev) => {
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) 
    if (this.scene.debugLayer.isVisible()) this.scene.debugLayer.hide(); else this.scene.debugLayer.show();});
    // Shift+Ctrl+Alt+I to open the inspector

    

    

    return scene;
};