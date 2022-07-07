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


    var flag_buttons = 0;




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
    var image_mirino = new BABYLON.GUI.Image("but", "res/textures/rock_wall.jpg");
    image_mirino.width = 1;
    image_mirino.height = 1;
    rect1.addControl(image_mirino, 0, 1);
    
    var grid = new BABYLON.GUI.Grid();   
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; 
    rect1.addControl(grid); 
    
    grid.width = 0.98;
    grid.height = 0.98;

    grid.addColumnDefinition(0.5);
    grid.addColumnDefinition(0.5);
    
    var panel = new BABYLON.GUI.StackPanel();    
    grid.addControl(panel, 0, 0);   

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("Start_button", "Start");
    button1.thickness = 4;
    button1.width = 0.5;
    button1.height = "40px";
    button1.cornerRadius = 10;
    button1.children[0].color = "black";
    button1.children[0].fontSize = 24;
    button1.color = "#303233";
    button1.background = "#8c8f91";
    panel.addControl(button1);  

    var rectSpace1 = new BABYLON.GUI.Rectangle();
    rectSpace1.alpha = 0;
    rectSpace1.width = 0.5;
    rectSpace1.height = "40px";
    panel.addControl(rectSpace1);  

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("Options_button", "Options");
    button2.thickness = 3;
    button2.width = 0.5;
    button2.height = "40px";
    button2.cornerRadius = 10;
    button2.children[0].color = "black";
    button2.children[0].fontSize = 24;
    button2.color = "#303233";
    button2.background = "#8c8f91";
    panel.addControl(button2);
    
    var rectSpace2 = new BABYLON.GUI.Rectangle();
    rectSpace2.alpha = 0;
    rectSpace2.width = 0.5;
    rectSpace2.height = "40px";
    panel.addControl(rectSpace2);

    var button3 = BABYLON.GUI.Button.CreateSimpleButton("Commands_botton", "Commands");
    button3.thickness = 3;
    button3.width = 0.5;
    button3.height = "40px";
    button3.cornerRadius = 10;
    button3.children[0].color = "black";
    button3.children[0].fontSize = 24;
    button3.color = "#303233";
    button3.background = "#8c8f91";
    panel.addControl(button3); 

    var rectSpace3 = new BABYLON.GUI.Rectangle();
    rectSpace3.alpha = 0;
    rectSpace3.width = 0.5;
    rectSpace3.height = "40px";
    panel.addControl(rectSpace3);

    var button4 = BABYLON.GUI.Button.CreateSimpleButton("Settings_button", "Settings");
    button4.thickness = 3;
    button4.width = 0.5;
    button4.height = "40px";
    button4.cornerRadius = 10;
    button4.children[0].color = "black";
    button4.children[0].fontSize = 24;
    button4.color = "#303233";
    button4.background = "#8c8f91";
    panel.addControl(button4); 


    
    var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
    image_steampunk.width = 0.9;
    image_steampunk.height = 0.95;
    grid.addControl(image_steampunk,0,1);

    var wellcome_text = new BABYLON.GUI.TextBlock();
    wellcome_text.width = 0.7;
    wellcome_text.height = 0.7;
    wellcome_text.text = "Wellcome!";
    wellcome_text.color = "white";
    wellcome_text.fontSize = 18;
    wellcome_text.textWrapping = 1;
    wellcome_text.textHorizontalAlignment = 0;
    wellcome_text.textVerticalAlignment = 0;
    grid.addControl(wellcome_text,0,1);

    

    button1.onPointerClickObservable.add(function () {
        flag_buttons = 1;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);

        var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
        image_steampunk.width = 0.9;
        image_steampunk.height = 0.95;
        grid.addControl(image_steampunk,0,1);

    });


    button2.onPointerClickObservable.add(function () {
        flag_buttons = 2;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);

        var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
        image_steampunk.width = 0.9;
        image_steampunk.height = 0.95;
        grid.addControl(image_steampunk,0,1);
    });

    button3.onPointerClickObservable.add(function () {
        flag_buttons = 3;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);

        var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
        image_steampunk.width = 0.9;
        image_steampunk.height = 0.95;
        grid.addControl(image_steampunk,0,1);

        var sv = new BABYLON.GUI.ScrollViewer(null, true);
        sv.width = 0.7;
        sv.height = 0.7;
        sv.thickness = 0;
        sv.color = "black";
        sv.thumbImage = new BABYLON.GUI.Image("thumb", "res/textures/metal.jpg");
        sv.thumbLength = 0.50;
        sv.thumbHeight = 1.0;
        grid.addControl(sv, 0, 1);

        var rc = new BABYLON.GUI.Rectangle();
        rc.thickness = 0;
        rc.width = 1;
        rc.height = 2;
        sv.addControl(rc);
    
        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = " Qui si potrebbe mettere  tutti i comandi base! \n  Ad esempio: \n  - Come muoversi \n  - Come sparare \n  - Etc...";
        text1.color = "white";
        text1.fontSize = 18;
        text1.textWrapping = 1;
        text1.textHorizontalAlignment = 0;
        text1.textVerticalAlignment = 0;
        sv.addControl(text1);

    });
    
    button4.onPointerClickObservable.add(function () {
        flag_buttons = 4;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);

        var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
        image_steampunk.width = 0.9;
        image_steampunk.height = 0.95;
        grid.addControl(image_steampunk,0,1);

        var selectBox = new BABYLON.GUI.SelectionPanel("selectBox");
        selectBox.width = 0.7;
        selectBox.height = 0.8;
        selectBox.thickness = 0;
        selectBox.fontSize = 18;
        selectBox.color = "white";
        selectBox.headerColor = "white";
        selectBox.buttonColor = "gray";
        selectBox.labelColor = "red";

        selectBox.addGroup(audioGroup);
        selectBox.addGroup(lightGroup);
        selectBox.addGroup(diffGroup);
    
        grid.addControl(selectBox, 0, 1);  
    });
    

    

    

    var flag_music = 1;
    var flag_sound = 1;
    var flag_light = 0.0;

    var setMusic = function(isChecked) {   
		if (isChecked) {
            flag_music = 1;
        }
        else {
            flag_music = 0;
        }
	}

    var setSound = function(isChecked) {   
		if (isChecked) {
            flag_sound = 1;
        }
        else {
            flag_sound = 0;
        }
	}


    var setLight = function(but) {   
		switch(but) {
            case 0: 
                flag_light = 0.1;
            break
            case 1: 
                flag_light = 0.5;
            break
            case 2: 
                flag_light = 1.0;
            break
        }
	}

    var setDiff = function(but) {   
		switch(but) {
            case 0: 
                flag_diff = 1;
            break
            case 1: 
                flag_diff = 2;
            break
            case 2: 
                flag_diff = 3;
            break
        }
	}

    var audioGroup = new BABYLON.GUI.CheckboxGroup("Audio");
	audioGroup.addCheckbox("Music", setMusic, true);
    audioGroup.addCheckbox("Sound", setSound,true);

    var lightGroup = new BABYLON.GUI.RadioGroup("Illumination");
    lightGroup.addRadio("Low", setLight);
    lightGroup.addRadio("Medium", setLight);
    lightGroup.addRadio("High", setLight, true);

    var diffGroup = new BABYLON.GUI.RadioGroup("Difficulty Level");
    diffGroup.addRadio("Low", setDiff, true);
    diffGroup.addRadio("Medium", setDiff);
    diffGroup.addRadio("High", setDiff);

    


    return scene;
};