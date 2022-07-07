var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);


    var skybox = createSkyBox(scene);
    skybox.setSkyConfig("material.inclination", skybox.material.inclination, 0);


    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");



    //bigger rectangle
    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = "700px";
    rect1.height = "500px";
    rect1.cornerRadius = 30;
    rect1.color = "black";
    rect1.thickness = 3;
    rect1.background = "blue";
    advancedTexture.addControl(rect1);

    //var image = new BABYLON.GUI.Image("but", "https://www.babylonjs-playground.com/textures/Logo.png");
    //image.width = 0.4;
    //image.height = 0.4;
    //rect1.addControl(image);

    
    var grid = new BABYLON.GUI.Grid();   
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; 
    rect1.addControl(grid); 
    
    grid.width = 0.98;
    grid.height = 0.98;

    grid.addColumnDefinition(0.70);
    grid.addColumnDefinition(0.5);
    //grid.addColumnDefinition(0.25);

    var sv = new BABYLON.GUI.ScrollViewer(null, true);
    sv.width = 1;
    sv.height = 1;
    sv.background = "#CCCCCC";
    sv.color = "black";
    grid.addControl(sv, 0, 1);

    sv.thumbImage = new BABYLON.GUI.Image("thumb", "res/textures/gold.jpeg");
    sv.barImage = new BABYLON.GUI.Image("bar", "res/textures/red_velvet.jpeg");
    sv.thumbLength = 0.50;
    sv.thumbHeight = 1.0;

    var rc = new BABYLON.GUI.Rectangle();
    rc.thickness = 2;
    rc.width = 1;
    rc.height = 2;
    rc.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rc.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    rc.color = "black";
    rc.background = "white";
    sv.addControl(rc);
    
    var image_rc = new BABYLON.GUI.Image("but", "res/textures/red_velvet.jpeg");
    image_rc.width =rc.width;
    image_rc.height = rc.height;
    rc.addControl(image_rc); 

    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = " Qui si potrebbe mettere  tutti i comandi base! \n  Ad esempio: \n  - Come muoversi \n  - Come sparare \n  - Etc...";
    text1.color = "white";
    text1.fontSize = 24;
    text1.textWrapping = 1;
    text1.textHorizontalAlignment = 0;
    text1.textVerticalAlignment = 0;
    rc.addControl(text1);
    
    
    var panel = new BABYLON.GUI.StackPanel();    
    grid.addControl(panel, 0, 0);   

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("Start_button", "Start");
    button1.thickness = 3;
    button1.width = 0.5;
    button1.height = "40px";
    button1.color = "black";
    button1.background = "gray";
    panel.addControl(button1);  

    var rectSpace = new BABYLON.GUI.Rectangle();
    rectSpace.alpha = 0;
    rectSpace.width = 0.5;
    rectSpace.height = "40px";
    panel.addControl(rectSpace);  

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("Options_button", "Options");
    button2.thickness = 3;
    button2.width = 0.5;
    button2.height = "40px";
    button2.color = "black";
    button2.background = "gray";
    rc.addControl(image_rc); 
    panel.addControl(button2);
    
    var rectSpace2 = new BABYLON.GUI.Rectangle();
    rectSpace2.alpha = 0;
    rectSpace2.width = 0.5;
    rectSpace2.height = "40px";
    panel.addControl(rectSpace2);

    var button3 = BABYLON.GUI.Button.CreateSimpleButton("Settings_button", "Settings");
    button3.thickness = 3;
    button3.width = 0.5;
    button3.height = "40px";
    button3.color = "black";
    button3.background = "gray";
    panel.addControl(button3); 
    
    return scene;
};