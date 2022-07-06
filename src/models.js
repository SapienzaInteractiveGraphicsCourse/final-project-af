function get_ufo(position, scale, scene){
    const body = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2.5, diameterY:1.7 });
    const wings = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop:6,diameterBottom:6,height:0.1,tessellation:48}, scene); //scene
    const stem = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop:0.01,diameterBottom:0.01,height:1}, scene); //scene  
    const capsule = BABYLON.MeshBuilder.CreateCapsule("ribbon", {height:0.2, radius:0.1}, scene);
    const glass = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2.5,slice: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    var gl = new BABYLON.GlowLayer("glow", scene);
    stem.position.y = 1.5;
    capsule.position.y = 0.5;
    body.position = position;
    body.scaling = new BABYLON.Vector3(scale,scale,scale);
    wings.parent = body;
    stem.parent = body;
    capsule.parent = stem;
    glass.parent = body;
    const ufoMat = new BABYLON.StandardMaterial("ufoMat");
    const glassMat = new BABYLON.StandardMaterial("glassMat");
    ufoMat.diffuseTexture = new BABYLON.Texture("metal.jpg", scene);
    glassMat.diffuseTexture = new BABYLON.Texture("glass.jpg", scene);
    body.material = ufoMat;
    wings.material = ufoMat;
    glass.material = glassMat;

}

function get_cannoniere (position,scale,scene){

    const motorRX_up = BABYLON.MeshBuilder.CreateCylinder("motorRX_up", {diameterTop:4,diameterBottom:3.5,height:10,tessellation:48}, scene); 
    const motorLX_up = BABYLON.MeshBuilder.CreateCylinder("motorRX_up", {diameterTop:4,diameterBottom:3.5,height:10,tessellation:48}, scene);
    


    
    const motorRX_dw = BABYLON.MeshBuilder.CreateCylinder("motorRX_dw", {diameterTop:4,diameterBottom:3.5,height:10,tessellation:48}, scene); //scene
    const motorLX_dw = BABYLON.MeshBuilder.CreateCylinder("motorLXdw", {diameterTop:4,diameterBottom:3.5,height:10,tessellation:48}, scene); //scene
    //set_position(motorRX,[1,1,0]);
    motorRX_dw.position = new BABYLON.Vector3(8, 1, 0);
    motorLX_dw.position = new BABYLON.Vector3(-8, 1, 0);
    motorRX_dw.scaling = new BABYLON.Vector3(1.0, 0.5, 1, 1);
    motorLX_dw.scaling = new BABYLON.Vector3(1.0, 0.5, 1);
    motorRX_dw.rotation = new BABYLON.Vector3(0, 0, 45);
    motorLX_dw.rotation = new BABYLON.Vector3(0, 0, 45);

    



    //var triangle = BABYLON.MeshBuilder.CreatePolyhedron("window", {type:5, sizeX: 3, sizeX:0.5, sizeX:0.5, sideOrientation:45 }, scene);
    
}


function skybox (scene){
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox_clouds.dds", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("URL TO IMAGE DIRECTORY/COMMON PART OF IMAGE FILENAMES", scene);
}




