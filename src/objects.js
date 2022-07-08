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

    //BABYLON.SceneLoader.Append("./res/models/tree-05-babylon/","tree-05.babylon", scene,function(scene) {
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
        console.log(object);
    });

    //object =  scene.getMeshById("dead_tree");
    
    return object;
}


function getRandomLoc(worldC,R){
    var x = (Math.cos(Math.random()*Math.PI))* R + worldC[0] ;
    var z = (Math.cos(Math.random()*Math.PI)) * R + worldC[2] ;
    var y = Math.sqrt(worldC[1] + R*R - Math.pow((x - worldC[0]),2) - Math.pow((z - worldC[2]),2));
    return [x,y,z];
}

function getRotation(position,R){
    var x_r = Math.atan2(R/position[2],R/position[1]);
    var y_r = Math.atan2(R/position[0],R/position[2]);
    var z_r = Math.atan2(R/position[1],R/position[0]);
    return [x_r,y_r,z_r];
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
        console.log(object);
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
        console.log(object);
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
        console.log(object);
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
        console.log(object);
    });

    //object =  scene.getMeshById("dead_tree");
    
    return object;
}


