function Player(assets,scene,input) {
    console.log(scene)
    console.log(input)
    console.log(assets);
    this.scene = scene;
    // this.mesh = assets.mesh;
    this.mesh = scene.getMeshById(assets);

    this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 4, 1.1, 20, BABYLON.Vector3.Zero(),scene);

    this.input = input;

    
    // control keypresses everytime you render the frame
    // maybe add the callback directly in the player update function
    this.scene.onBeforeRenderObservable.add(() => {
        this.input.updateFromKeyboard();
        this.input.vertical; // contains vertical desired input
        this.input.horizontal; // contains horizontal desired input

        // get delta time
        // update velocities
        // update position
        // update orientation
        // update animations
        // handle collisions
    }); 
    
}   

function PlayerInput(scene) {

    this.scene = scene;
    this.inputMap = {}; // put here key presses

    // Install an action manager on the scene
    this.scene.actionManager = new BABYLON.ActionManager(this.scene);
    // Listen to keypress and keyrelease events
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; // why keydown?
    }));


    this.updateFromKeyboard = function() {
        if (this.inputMap["ArrowUp"]) {
            this.vertical = BABYLON.Scalar.Lerp(this.vertical, 1, 0.2);
            this.verticalAxis = 1;
        } else if (this.inputMap["ArrowDown"]) {
            this.vertical = BABYLON.Scalar.Lerp(this.vertical, -1, 0.2);
            this.verticalAxis = -1;
        } else {
            this.vertical = 0;
            this.verticalAxis = 0;
        }
        if (this.inputMap["ArrowLeft"]) {
            this.horizontal = BABYLON.Scalar.Lerp(this.horizontal, -1, 0.2);
            this.horizontalAxis = -1;
    
        } else if (this.inputMap["ArrowRight"]) {
            this.horizontal = BABYLON.Scalar.Lerp(this.horizontal, 1, 0.2);
            this.horizontalAxis = 1;
        }
        else {
            this.horizontal = 0;
            this.horizontalAxis = 0;
        }
    }

}