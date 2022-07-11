var object_path = "./res/models/";



function createHouse(scene) {
    var object = null;

    BABYLON.SceneLoader.Append("./res/models/old-house-babylon/","old-house.babylon", scene,function(scene) {
        object =  scene.getMeshById("House");
        object.position.z = 10;
        object.position.y = -0.3;
        console.log(object.rotation);
    });

    object =  scene.getMeshById("House");
    
    return object;
}



function createTree(scene,position,rotation) {
    var object = null;
    BABYLON.SceneLoader.Append("./res/models/tree-babylon/","tree.babylon", scene,function(scene) {
        object =  scene.getMeshById("Prunus_americana_01");
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scaling.x = 1;
        object.scaling.y = 1;
        object.scaling.z = 1;
        object.rotation.x = rotation[0];
        object.rotation.y = rotation[1];
        object.rotation.z = rotation[2];
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });
    
    return object;
}

function createTractor(scene,position,rotation) {
    var object = null;
    
    BABYLON.SceneLoader.Append("./res/models/tractor-babylon/","tractor.babylon", scene,function(scene) {
        object =  scene.getMeshById("tractor_root");
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scaling.x = 0.4;
        object.scaling.y = 0.4;
        object.scaling.z = 0.4;
        object.rotation.x = rotation[0];
        object.rotation.y = rotation[1];
        object.rotation.z = rotation[2];
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });

    return object;
}


function createStone(scene,position,rotation) {
    var object = null;

    BABYLON.SceneLoader.Append("./res/models/stones-babylon/","stones.babylon", scene,function(scene) {
        let object =  scene.getMeshById("Fbx_Root");
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scaling.x = 0.01;
        object.scaling.y = 0.01;
        object.scaling.z = 0.01;
        object.rotation.x = rotation[0];
        object.rotation.y = rotation[1];
        object.rotation.z = rotation[2];
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });
    
    return object;
}


function createPlanets(scene) {
    
    BABYLON.SceneLoader.Append("./res/models/blue-planet-babylon/","blue-planet.babylon", scene,function(scene) {
        let object =  scene.getMeshById("Fleka_planet_1");
        object.position = new BABYLON.Vector3(-20,30,-100);
        object.scaling.x = 5;
        object.scaling.y = 5;
        object.scaling.z = 5;
        object.rotation.x = 0;
        object.rotation.y = Math.PI;
        object.rotation.z = Math.PI;
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });

    

    var redMat = new BABYLON.StandardMaterial("redMat", scene);
	redMat.diffuseTexture = new BABYLON.Texture("./res/textures/terradisiena.jpg", scene);
	
	var greenMat = new BABYLON.StandardMaterial("greenMat", scene);
	greenMat.diffuseTexture = new BABYLON.Texture("./res/textures/ground.jpg", scene);

    var sandMat = new BABYLON.StandardMaterial("sandMat", scene);
	sandMat.diffuseTexture = new BABYLON.Texture("./res/textures/sand.jpg", scene);
	
    var terraMat = new BABYLON.StandardMaterial("terraMat", scene);
	terraMat.diffuseTexture = new BABYLON.Texture("./res/textures/terracotta.jpeg", scene);

	var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter:50}, scene);
	sphere1.material = redMat;
	sphere1.position  = new BABYLON.Vector3(100,10,100);
    sphere1.rotation.y = -Math.PI/2;

    
	var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter:60}, scene);
	sphere2.material = greenMat;
    sphere2.position = new BABYLON.Vector3(-150,-80,100);
    sphere2.rotation.y = Math.PI;

    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere3", {diameter:60}, scene);
	sphere3.material = terraMat;
    sphere3.position = new BABYLON.Vector3(-100,-30,-100);
    sphere3.rotation.y = Math.PI/2

    const ring = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 10, diameter: 100, tessellation:32});
    ring.material = sandMat;
    ring.position = new BABYLON.Vector3(-100,-30,-100);
    ring.rotation.x = -Math.PI/6;


}



function createApollo(scene,position,rotation) {
    var object = null;
    
    BABYLON.SceneLoader.Append("./res/models/apollo-babylon/","apollo.babylon", scene,function(scene) {
        let object =  scene.getMeshById("Fbx_Root");
        rename_with_prefix(object, "apollo")
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scaling.x = 1.0;
        object.scaling.y = 1.0;
        object.scaling.z = 1.0;
        object.rotation.x = rotation[0];
        object.rotation.y = rotation[1];
        object.rotation.z = rotation[2];
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });
    
    return object;
}


function getRandomLoc(worldC,R){
    var phi = Math.random()*Math.PI;
    var theta = Math.random()*2*Math.PI;
    var x = R*Math.sin(phi)*Math.cos(theta) + worldC[0];
    var y = R*Math.sin(phi)*Math.sin(theta) + worldC[1];
    var z = R*Math.cos(phi)                 + worldC[2];

    return new BABYLON.Vector3(x,y,z)
}

function getRotation(position,worldC){

    var z = worldC.subtract(position).normalize();
    var random_vector =  new BABYLON.Vector3(Math.random(),Math.random(),Math.random()).normalize();

    var x = (z.cross(random_vector)).normalize();
    var y = x.cross(z).normalize(); 

    var m = new BABYLON.Matrix();
    m.setRow(0,new BABYLON.Vector4(x._x,x._y,x._z,0))
    m.setRow(1,new BABYLON.Vector4(y._x,y._y,y._z,0))
    m.setRow(2,new BABYLON.Vector4(z._x,z._y,z._z,0))
    return m;
}



function createRandomTrees(scene,position,rotation){
    var object = null;
     
    BABYLON.SceneLoader.Append("./res/models/","looe.babylon", scene,function(scene) {
        object =  scene.getMeshById("Circle_Circle");
        object.position = position;
        object.scaling.x = 0.7;
        object.scaling.y = 0.7;
        object.scaling.z = 0.7;
        rotation.decompose(null,object.rotationQuaternion,null,null);
    });
}





function createChair(scene,position,rotation){
    var object = null;
    BABYLON.SceneLoader.Append("./res/models/chair-babylon/","chair.babylon", scene,function(scene) {
        object =  scene.getMeshById("3DSMesh_0_0");
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scaling.x = 0.22;
        object.scaling.y = 0.22;
        object.scaling.z = 0.22;
        object.rotation.x = rotation[0];
        object.rotation.y = rotation[1];
        object.rotation.z = rotation[2];
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });

    return object;
}


function createCristals(scene,R, worldC){
    var object = null;
    BABYLON.SceneLoader.Append("./res/models/three-crystals-babylon/","three-crystals.babylon", scene,function(scene) {
        object =  scene.getMeshById("kristalli_03_fixed__1_");
        object.position.x = R + worldC[0] + 3.5;
        object.position.y = worldC[1];
        object.position.z = worldC[2];
        object.scaling.x = 0.1;
        object.scaling.y = 0.1;
        object.scaling.z = 0.1;
        object.rotation.x = 0;
        object.rotation.y = 0;
        object.rotation.z = -Math.PI/2;
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });

    BABYLON.SceneLoader.Append("./res/models/blue-crystal-babylon/","blue-crystal.babylon", scene,function(scene) {
        object =  scene.getMeshById("root");
        object.position.x =  worldC[0] - R-1.0;
        object.position.y = worldC[1]-6.0;
        object.position.z = worldC[2] + 5.0;
        object.scaling.x = 30;
        object.scaling.y = 30;
        object.scaling.z = 30;
        object.rotation.x = Math.PI/2;
        object.rotation.y = Math.PI/2;
        object.rotation.z = 0;
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });
    
}

function createGrave(scene,worldC,R){

    BABYLON.SceneLoader.Append("./res/models/grave-babylon/","grave.babylon", scene,function(scene) {
        object =  scene.getMeshById("Stone_Wall");
        object.position.x =  worldC[0];
        object.position.y = worldC[1] - R ;
        object.position.z = worldC[2] - 5.5;
        object.scaling.x = 5;
        object.scaling.y = 5;
        object.scaling.z = 5;
        object.rotation.x = Math.PI;
        object.rotation.y = 0;
        object.rotation.z = 0;
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });

    BABYLON.SceneLoader.Append("./res/models/crystals-babylon/","crystals.babylon", scene,function(scene) {
        object =  scene.getMeshById("crystal_root");
        object.position.x =  worldC[0] -5.2;
        object.position.y = worldC[1] -R ;
        object.position.z = worldC[2] -4.5;
        object.scaling.x = 13;
        object.scaling.y = 13;
        object.scaling.z = 13;
        object.rotation.x = Math.PI;
        object.rotation.y = 0;
        object.rotation.z = 0;
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });


    BABYLON.SceneLoader.Append("./res/models/ruby-babylon/","ruby.babylon", scene,function(scene) {
        object =  scene.getMeshById("crystal");
        object.position.x =  worldC[0] + 1.0 ;
        object.position.y = worldC[1] - R;
        object.position.z = worldC[2] + 2.0;
        object.scaling.x = 3;
        object.scaling.y = 3;
        object.scaling.z = 3;
        object.rotation.x = Math.PI;
        object.rotation.y = 0;
        object.rotation.z = 0;
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });


    var particleSystem;

    var fogTexture = new BABYLON.Texture("./res/textures/smoke.png", scene);

    var createNewSystem = function() {
    if (particleSystem) {
        particleSystem.dispose();
    }

    var fountain = BABYLON.Mesh.CreateBox("foutain", .01, scene);
    fountain.position = new BABYLON.Vector3(0.0, -2*R + 1.0, 10.0);
    fountain.visibility = 0;

    particleSystem = new BABYLON.ParticleSystem("particles", 2500 , scene);
    particleSystem.manualEmitCount = particleSystem.getCapacity();
    particleSystem.minEmitBox = new BABYLON.Vector3(-5, 1, -5); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(5, 1, 5); // To...

    particleSystem.particleTexture = fogTexture.clone();
    particleSystem.emitter = fountain;
    
    particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1);
    particleSystem.color2 = new BABYLON.Color4(.95, .95, .95, 0.15);
    particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
    particleSystem.minSize = 7.0;
    particleSystem.maxSize = 10.0;
    particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
    particleSystem.emitRate = 50000;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
    particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
    particleSystem.minAngularSpeed = -2;
    particleSystem.maxAngularSpeed = 2;
    particleSystem.minEmitPower = .5;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.005;

    particleSystem.start();
    }

    createNewSystem();

}