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

        await this.environment.load();
        await this.loadCharacterAssets();
        this.input = new PlayerInput(this.scene);
        this.player = new Player(this.playerAsset.id, this.scene, this.input,this.environment.planet);
        this.scene.activeCamera = this.player.camera;
        this.player.camera.attachControl(this.canvas, true);
    }

    this.setUpMenu = async function() {
        this.scene = new BABYLON.Scene(this.engine);
        // put here the main menu
        // remember that the scene is "this.scene" not "scene"

        // add a callback to the start button that calls this.goToGame

        // if you want to test go to main.js and call game.goToMainMenu()
        // instead of game.goToGame();
        
    }

    this.loadCharacterAssets = async function(scene) {
            return BABYLON.SceneLoader.ImportMeshAsync(null, "./res/models/player/", "player.gltf", scene).then(
                (result) =>{;this.playerAsset = result.meshes[0];});
    }

    this.goToMainMenu = async function() {
        this.engine.displayLoadingUI(); // display loading
        if (this.scene != null) {this.scene.detachControl(); // inhibit any input
                                 this.scene.dispose();}     // delete old scene

        await this.setUpMenu();

        this.engine.hideLoadingUI();
        this.state = GAME_STATES.MAIN_MENU;
        this.goToGame();
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
    
    
    this.engine.runRenderLoop(() => {
        switch (this.state) {
            case GAME_STATES.PLAYING:
                this.scene.render();
            default: break;}
    });

    // Shift+Ctrl+Alt+I to open the inspector
    window.addEventListener("keydown", (ev) => {
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) 
    if (this.scene.debugLayer.isVisible()) this.scene.debugLayer.hide(); else this.scene.debugLayer.show();});
}