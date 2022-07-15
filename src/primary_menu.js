function Menu(game) {

    this.scene = game.scene

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this.canvas, true);
    
    //var volume = BABYLON.Engine.audioEngine.setGlobalVolume(1);

    var music = new BABYLON.Sound("Music", "./res/sounds/menu-song.wav", this.scene, null, {
        loop: true,
        autoplay: true
      });

    var hammer = new BABYLON.Sound("click", "./res/sounds/hammer.wav", this.scene);

    window.addEventListener("mousedown", function(evt) {
        if (evt.button === 0) {
            hammer.play();
        }
      });

    

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    this.advancedTexture = advancedTexture;

    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = "700px";
    rect1.height = "500px";
    rect1.cornerRadius = 30;
    rect1.color = "black";
    rect1.thickness = 3;
    rect1.background = "blue";
    advancedTexture.addControl(rect1);

    var image_rock = new BABYLON.GUI.Image("but", "res/textures/rock_wall.jpg");
    image_rock.width = 1;
    image_rock.height = 1;
    rect1.addControl(image_rock);
    
    var grid = new BABYLON.GUI.Grid();   
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; 
    grid.width = 0.98;
    grid.height = 0.98;
    grid.addColumnDefinition(0.5);
    grid.addColumnDefinition(0.5);
    rect1.addControl(grid);
    
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
    
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("Options_button", "Rules");
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
    

    var welcome_text = new BABYLON.GUI.TextBlock();
    welcome_text.width = 0.7;
    welcome_text.height = 0.7;
    welcome_text.text = wellcome_text();
    welcome_text.color = "gold";
    welcome_text.fontSize = 34;
    welcome_text.textWrapping = 1;
    welcome_text.textHorizontalAlignment = 2;
    welcome_text.textVerticalAlignment = 2;
    welcome_text.isVisible = true;
    grid.addControl(welcome_text,0,1);

    ///////////////////////////// Rules ///////////////////////////////////////////////////////
    var sv1 = new BABYLON.GUI.ScrollViewer(null, true);
    sv1.width = 0.65;
    sv1.height = 0.7;
    sv1.thickness = 0;
    sv1.color = "black";
    sv1.thumbImage = new BABYLON.GUI.Image("thumb", "res/textures/metal.jpg");
    sv1.thumbLength = 0.50;
    sv1.thumbHeight = 1.0;
    sv1.isVisible = false;
    grid.addControl(sv1, 0, 1);

    var rc1 = new BABYLON.GUI.Rectangle();
    rc1.thickness = 0;
    rc1.width = 1;
    rc1.height = 1.4;
    sv1.addControl(rc1);

    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = rules_text();
    text1.color = "white";
    text1.fontSize = 16;
    text1.textWrapping = 1;
    text1.textHorizontalAlignment = 0;
    text1.textVerticalAlignment = 0;
    rc1.addControl(text1);

    ///////////////////////////// Commands ///////////////////////////////////////////////////////

    var sv2 = new BABYLON.GUI.ScrollViewer(null, true);
    sv2.width = 0.65;
    sv2.height = 0.7;
    sv2.thickness = 0;
    sv2.color = "black";
    sv2.thumbImage = new BABYLON.GUI.Image("thumb", "res/textures/metal.jpg");
    sv2.thumbLength = 0.50;
    sv2.thumbHeight = 1.0;
    sv2.isVisible = false;
    grid.addControl(sv2, 0, 1);

    var rc2 = new BABYLON.GUI.Rectangle();
    rc2.thickness = 0;
    rc2.width = 1;
    rc2.height = 1.7;
    sv2.addControl(rc2);

    var text2 = new BABYLON.GUI.TextBlock();
    text2.text = commands_text();
    text2.color = "white";
    text2.fontSize = 16;
    text2.textWrapping = 1;
    text2.textHorizontalAlignment = 0;
    text2.textVerticalAlignment = 0;
    rc2.addControl(text2);


    ///////////////////////////// Settings ///////////////////////////////////////////////////////

    var selectBox = new BABYLON.GUI.SelectionPanel("selectBox");
    selectBox.width = 0.7;
    selectBox.height = 0.8;
    selectBox.thickness = 0;
    selectBox.fontSize = 14;
    selectBox.color = "white";
    selectBox.headerColor = "white";
    selectBox.buttonColor = "gray";
    selectBox.labelColor = "red";
    selectBox.isVisible = false;
    grid.addControl(selectBox, 0, 1);
    
    game.flag_light = 1.0;

    var setLight = function(but) {   
        switch(but) {
            case 0: 
                game.flag_light = 0.1;
            break
            case 1: 
                game.flag_light = 0.5;
            break
            case 2: 
                game.flag_light = 1.0;
            break
        }
    }

    var setDiff = function(but) {   
        switch(but) {
            case 0: 
                game.difficulty = 1;
            break
            case 1: 
                game.difficulty =  2;
            break
            case 2: 
                game.difficulty =  3;
            break
        }
    }

    var setVolume = function(value){
        BABYLON.Engine.audioEngine.setGlobalVolume(value);
    }

    var lightGroup = new BABYLON.GUI.RadioGroup("Illumination");
    lightGroup.addRadio("Low", setLight);
    lightGroup.addRadio("Medium", setLight);
    lightGroup.addRadio("High", setLight, true);

    var diffGroup = new BABYLON.GUI.RadioGroup("Difficulty Level");
    diffGroup.addRadio("Low", setDiff, true);
    diffGroup.addRadio("Medium", setDiff);
    diffGroup.addRadio("High", setDiff);

    var volumeGroup = new BABYLON.GUI.SliderGroup("Sounds volume", "S");
	volumeGroup.addSlider("Audio", setVolume, "Level", 0, 5, 1);

    selectBox.addGroup(volumeGroup);
    selectBox.addGroup(lightGroup);
    selectBox.addGroup(diffGroup);


    ////////////////////////////// Callbacks /////////////////////////////////////////////////////////////////

    button1.onPointerClickObservable.add(function () {
        flag_buttons = 1;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);

        game.goToGame();
    });


    button2.onPointerClickObservable.add(function () {
        flag_buttons = 2;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);
        
        welcome_text.isVisible = false;
        sv2.isVisible =false;
        selectBox.isVisible = false;
        sv1.isVisible =true;
    });

    button3.onPointerClickObservable.add(function () {
        flag_buttons = 3;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);
        
        welcome_text.isVisible = false;
        selectBox.isVisible = false;
        sv1.isVisible =false;
        sv2.isVisible =true;
    });
    
    button4.onPointerClickObservable.add(function () {
        flag_buttons = 4;
        set_botton_colour (button1,button2,button3,button4,flag_buttons);

        welcome_text.isVisible = false;
        sv1.isVisible =false;
        sv2.isVisible =false;
        selectBox.isVisible =true;
    });

}




    

function set_botton_colour (button1,button2,button3,button4,flag){
    button1.color = "#303233";
    button1.background = "#8c8f91";
    button2.color = "#303233";
    button2.background = "#8c8f91";
    button3.color = "#303233";
    button3.background = "#8c8f91";
    button4.color = "#303233";
    button4.background = "#8c8f91";

    if(flag ==1){
        button1.color = "#FF7979";
        button1.background = "#d64220";
    } else if(flag==2){
        button2.color = "#FF7979";
        button2.background = "#d64220";
    } else if(flag==3){
        button3.color = "#FF7979";
        button3.background = "#d64220";
    } else if(flag==4){
        button4.color = "#FF7979";
        button4.background = "#d64220";
    }
}
