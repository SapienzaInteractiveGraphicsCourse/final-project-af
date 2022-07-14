// Game states
// they are used for example to choose which scene to render
const GAME_STATES = {MAIN_MENU: 0,
                     PLAYING:   1,
                     LOST:      2,
}

function Game() {
    this.state = null;

    this.canvas = document.getElementById("renderCanvas"); // where to draw
    this.engine = new BABYLON.Engine(this.canvas, true);

    this.gameScene = null;
    this.scene = null;
    this.playerAsset = null;

    this.setUpGame = async function() {
        this.scene = new BABYLON.Scene(this.engine);
        this.environment = new Environment(this.scene);

        await this.environment.load(this);
        await this.loadCharacterAssets();
        this.environment.GUI_environment(this, this.scene);

        this.input = new PlayerInput(this.scene);
        this.player = new Player(this.playerAsset.id, this.scene, this.input,this.environment.planet.id, this);
        this.scene.activeCamera = this.player.camera;
        this.player.camera.attachControl(this.canvas, true);

        this.enemy = new Enemy(this.scene,this.environment,this.player);
        await this.enemy.loadEnemy();
        this.enemy.callEnemies();

        // from https://www.babylonjs-playground.com/#PLW9V9#19
        // camera pointer lock code 
        var isLocked = false;
        // On click event, request pointer lock
        var game = this
        this.scene.onPointerDown = function (evt) {
            
            //true/false check if we're locked, faster than checking pointerlock on each single click.
            if (!isLocked) {
                game.canvas.requestPointerLock = game.canvas.requestPointerLock || game.canvas.msRequestPointerLock || game.canvas.mozRequestPointerLock || game.canvas.webkitRequestPointerLock;
                if (game.canvas.requestPointerLock) {
                    game.canvas.requestPointerLock();
                }
            }

        };
        var pointerlockchange = function () {
            var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
            
            // If the user is already locked
            if (!controlEnabled) {
                //camera.detachControl(canvas);
                isLocked = false;
            } else {
                //camera.attachControl(canvas);
                isLocked = true;
            }
        };
        // Attach events to the document
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    
    }

    // this gets called when you transition into the actual game
    this.goToGame = async function() {
        this.engine.displayLoadingUI(); // display loading
        if (this.scene != null) {this.scene.detachControl(); // inhibit any input
                                    this.scene.dispose();}     // delete old scene

        await this.setUpGame();

        this.engine.hideLoadingUI();
        this.state = GAME_STATES.PLAYING;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.setUpLost = async function() {
        this.scene = new BABYLON.Scene(this.engine);
        this.environment = new Environment(this.scene);
        await this.environment.load(this);
        this.lostMenu = deathMenu(this);
        
    }

    // this gets called when you transition into the actual game
    this.goToLost = async function() {
        this.engine.displayLoadingUI(); // display loading
        if (this.scene != null) {this.scene.detachControl(); // inhibit any input
                                    this.scene.dispose();}     // delete old scene

        await this.setUpLost();

        this.engine.hideLoadingUI();
        this.state = GAME_STATES.LOST;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.setUpMenu = async function() {
        this.scene = new BABYLON.Scene(this.engine);
        this.environment = new Environment(this.scene);
        await this.environment.load(this);
        var menu = new Menu(this);        
    }

    this.loadCharacterAssets = async function(scene) {
        await BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/player/", "player.gltf", scene).then(
            result =>{this.playerAsset = result.meshes[0];})  
        this.playerAsset.rotationQuaternion = null;
        rename_with_prefix(this.playerAsset,"p_");
        await BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/m1911-handgun-babylon/", "m1911-handgun.babylon", scene).then(
            result =>{
                var gun = new BABYLON.TransformNode("gun",scene);
                result.meshes.forEach(mesh => mesh.parent=gun);
                gun.scaling = new BABYLON.Vector3(0.01,0.01,0.01);
                gun.rotationQuaternion = null;
                gun.rotation = new BABYLON.Vector3(1.56,-3.13,-1.59);
                gun.position = new BABYLON.Vector3(-0.06,0.29,0);
                gun.parent = this.scene.getNodeById("p_RightHand");
            })
    }

    this.goToMainMenu = async function() {
        this.engine.displayLoadingUI(); // display loading
        if (this.scene != null) {this.scene.detachControl(); // inhibit any input
                                 this.scene.dispose();}     // delete old scene

        await this.setUpMenu();

        this.engine.hideLoadingUI();
        this.state = GAME_STATES.MAIN_MENU;
    }
        
    this.engine.runRenderLoop(() => {this.scene.render()});

    // Shift+Ctrl+Alt+I to open the inspector
    window.addEventListener("keydown", (ev) => {
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) 
    if (this.scene.debugLayer.isVisible()) this.scene.debugLayer.hide(); else this.scene.debugLayer.show();});
}
function rename_with_prefix(x,prefix) {
    x.id = prefix + x.id; // add a prefix
    let children = x.getChildren()
    if (children == []) {return;} // no children left here
    // else
    
    children.forEach(child => {child.rotationQuaternion = null; rename_with_prefix(child,prefix)});

    return;
}