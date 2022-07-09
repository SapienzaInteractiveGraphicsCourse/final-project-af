var object_path = "./res/models/";



function createHouse(scene) {
    var object = null;

    BABYLON.SceneLoader.Append("./res/models/old-house-babylon/","old-house.babylon", scene,function(scene) {
        object =  scene.getMeshById("House");
        object.position.z = 10;
        object.position.y = -0.3;
        
    });

    object =  scene.getMeshById("House");
    
    return object;
}



function createTree(scene,position,rotation) {
    var object = null;
    BABYLON.SceneLoader.Append("./res/models/","looe.babylon", scene,function(scene) {
        object =  scene.getMeshById("Circle_Circle");
        object.position.x = position[0];
        object.position.y = position[1];
        object.position.z = position[2];
        object.scaling.x = 0.7;
        object.scaling.y = 0.7;
        object.scaling.z = 0.7;
        object.rotation.x = rotation[0];
        object.rotation.y = rotation[1];
        object.rotation.z = rotation[2];
        object.rotationQuaternion = BABYLON.Quaternion.FromEulerVector(object.rotation);
    });

    //object =  scene.getMeshById("dead_tree");
    
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


function createTractor(scene,position,rotation) {
    var object = null;
    
    //BABYLON.SceneLoader.Append("./res/models/tree-05-babylon/","tree-05.babylon", scene,function(scene) {
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

    //object =  scene.getMeshById("dead_tree");
    
    return object;
}


function createStone(scene,position,rotation) {
    var object = null;
    
    //BABYLON.SceneLoader.Append("./res/models/tree-05-babylon/","tree-05.babylon", scene,function(scene) {
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

    //object =  scene.getMeshById("dead_tree");
    
    return object;
}


function createStone2(scene,position,rotation) {
    var object = null;
    
    //BABYLON.SceneLoader.Append("./res/models/tree-05-babylon/","tree-05.babylon", scene,function(scene) {
        BABYLON.SceneLoader.Append("./res/models/stone2-babylon/","stone2.babylon", scene,function(scene) {
        object =  scene.getMeshById("Fbx_Root");
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

    //object =  scene.getMeshById("dead_tree");
    
    return object;
}


function createApollo(scene,position,rotation) {
    var object = null;
    
    //BABYLON.SceneLoader.Append("./res/models/tree-05-babylon/","tree-05.babylon", scene,function(scene) {
    BABYLON.SceneLoader.Append("./res/models/apollo-babylon/","apollo.babylon", scene,function(scene) {
        let object =  scene.getMeshById("Fbx_Root");
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

    //object =  scene.getMeshById("dead_tree");
    
    return object;
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

// Shift+Ctrl+Alt+I to open the inspector
window.addEventListener("keydown", (ev) => {
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) 
    if (this.scene.debugLayer.isVisible()) this.scene.debugLayer.hide(); else this.scene.debugLayer.show();});
