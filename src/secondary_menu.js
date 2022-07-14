function SecondaryMenu(advancedTexture2,game) {


    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = "700px";
    rect1.height = "500px";
    rect1.cornerRadius = 30;
    rect1.color = "black";
    rect1.thickness = 3;
    rect1.background = "blue";
    advancedTexture2.addControl(rect1);

    var image_rock = new BABYLON.GUI.Image("but", "res/textures/rock_wall.jpg");
    image_rock.width = 1;
    image_rock.height = 1;
    rect1.addControl(image_rock, 0, 1);
    
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

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("Quit_button", "Quit");
    button1.thickness = 4;
    button1.width = 0.5;
    button1.height = "40px";
    button1.cornerRadius = 10;
    button1.children[0].color = "black";
    button1.children[0].fontSize = 24;
    button1.color = "#303233";
    button1.background = "#8c8f91";
    panel.addControl(button1);  

    var button2;
    var rectSpace1 = new BABYLON.GUI.Rectangle();
    rectSpace1.alpha = 0;
    rectSpace1.width = 0.5;
    rectSpace1.height = "40px";
    panel.addControl(rectSpace1);  

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

    var rectSpace2 = new BABYLON.GUI.Rectangle();
    rectSpace2.alpha = 0;
    rectSpace2.width = 0.5;
    rectSpace2.height = "40px";
    panel.addControl(rectSpace2);

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("Options_button", "Resume");
    button2.thickness = 3;
    button2.width = 0.5;
    button2.height = "40px";
    button2.cornerRadius = 10;
    button2.children[0].color = "black";
    button2.children[0].fontSize = 24;
    button2.color = "#303233";
    button2.background = "#8c8f91";
    panel.addControl(button2);
    
    var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
    image_steampunk.width = 0.9;
    image_steampunk.height = 0.95;
    grid.addControl(image_steampunk,0,1);

    var welcome_text = new BABYLON.GUI.TextBlock();
    welcome_text.width = 0.7;
    welcome_text.height = 0.7;
    welcome_text.text = "What's wrong soldier?!";
    welcome_text.color = "gold";
    welcome_text.fontSize = 34;
    welcome_text.textWrapping = 1;
    welcome_text.textHorizontalAlignment = 2;
    welcome_text.textVerticalAlignment = 2;
    grid.addControl(welcome_text,0,1);



    button1.onPointerClickObservable.add(function () {
        flag_buttons = 1;
        set_botton_colours (button1,button2,button3,button4,flag_buttons);

        var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
        image_steampunk.width = 0.9;
        image_steampunk.height = 0.95;
        grid.addControl(image_steampunk,0,1);

        thirdMenu(advancedTexture2,game);
    });


    button3.onPointerClickObservable.add(function () {
        flag_buttons = 3;
        set_botton_colours (button1,button2,button3,button4,flag_buttons);

        var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
        image_steampunk.width = 0.9;
        image_steampunk.height = 0.95;
        grid.addControl(image_steampunk,0,1);

        var sv = new BABYLON.GUI.ScrollViewer(null, true);
        sv.width = 0.6;
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
        rc.height = 1;
        sv.addControl(rc);
    
        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = commands_text();
        text1.color = "white";
        text1.fontSize = 18;
        text1.textWrapping = 1;
        text1.textHorizontalAlignment = 0;
        text1.textVerticalAlignment = 0;
        rc.addControl(text1);

    });
    
    
    button4.onPointerClickObservable.add(function () {
        flag_buttons = 4;
        set_botton_colours (button1,button2,button3,button4,flag_buttons);

        var image_steampunk = new BABYLON.GUI.Image("but", "res/textures/steampunk.jpg");
        image_steampunk.width = 0.9;
        image_steampunk.height = 0.95;
        grid.addControl(image_steampunk,0,1);

        var selectBox = new BABYLON.GUI.SelectionPanel("selectBox");
        selectBox.width = 0.7;
        selectBox.height = 0.8;
        selectBox.thickness = 0;
        selectBox.fontSize = 14;
        selectBox.color = "white";
        selectBox.headerColor = "white";
        selectBox.buttonColor = "gray";
        selectBox.labelColor = "red";

        selectBox.addGroup(volumeGroup);
        selectBox.addGroup(lightGroup);
        
    
        grid.addControl(selectBox, 0, 1);  
    });


    button2.onPointerClickObservable.add(function () {
        flag_buttons = 2;
        set_botton_colours (button1,button2,button3,button4,flag_buttons);

        advancedTexture2.removeControl(rect1);
    });

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

    var setVolume = function(value){
        BABYLON.Engine.audioEngine.setGlobalVolume(value);
    }

    var lightGroup = new BABYLON.GUI.RadioGroup("Illumination");
    lightGroup.addRadio("Low", setLight);
    lightGroup.addRadio("Medium", setLight);
    lightGroup.addRadio("High", setLight, true);


    var volumeGroup = new BABYLON.GUI.SliderGroup("Sounds volume", "S");
	volumeGroup.addSlider("Audio", setVolume, "Level", 0, 5, 1)
}



function get_settings_panel(advancedTexture2){
    
    var selectBox = new BABYLON.GUI.SelectionPanel("selectBox");
    selectBox.width = 0.25;
    selectBox.height = 0.52;
    selectBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    advancedTexture2.addControl(selectBox);
    return selectBox
}


function set_botton_colours (button1,button2,button3,button4,flag){
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
        button3.color = "#FF7979";
        button3.background = "#d64220";
    } else if(flag==3){
        button3.color = "#FF7979";
        button3.background = "#d64220";
    } else if(flag==4){
        button4.color = "#FF7979";
        button4.background = "#d64220";
    }
}





function thirdMenu(advancedTexture2,game){

    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = "200px";
    rect1.height = "250px";
    rect1.cornerRadius = 30;
    rect1.color = "black";
    rect1.thickness = 3;
    rect1.background = "black";
    advancedTexture2.addControl(rect1);

    var image_rock = new BABYLON.GUI.Image("but", "res/textures/rock_wall.jpg");
    image_rock.width = 1;
    image_rock.height = 1;
    rect1.addControl(image_rock);
    
    var grid = new BABYLON.GUI.Grid();   
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; 
    grid.width = 0.98;
    grid.height = 0.98;
    grid.addColumnDefinition(1.0);

    rect1.addControl(grid);

    var text = new BABYLON.GUI.TextBlock();
    text.width = 0.7;
    text.height = 0.7;
    text.text = "Sure to quit?";
    text.color = "white";
    text.fontSize = 20;
    text.textWrapping = 1;
    text.textHorizontalAlignment = 2;
    text.textVerticalAlignment = 0;
    grid.addControl(text);

    var panel = new BABYLON.GUI.StackPanel();    
    grid.addControl(panel,0,1);

    var buttonYES = BABYLON.GUI.Button.CreateSimpleButton("YES_button", "YES");
    buttonYES.thickness = 3;
    buttonYES.width = 0.5;
    buttonYES.height = "40px";
    buttonYES.cornerRadius = 10;
    buttonYES.children[0].color = "black";
    buttonYES.children[0].fontSize = 24;
    buttonYES.color = "#303233";
    buttonYES.background = "#8c8f91";
    panel.addControl(buttonYES); 

    var rectSpace2 = new BABYLON.GUI.Rectangle();
    rectSpace2.alpha = 0;
    rectSpace2.width = 0.1;
    rectSpace2.height = "10px";
    panel.addControl(rectSpace2);

    var buttonNO = BABYLON.GUI.Button.CreateSimpleButton("NO_button", "NO");
    buttonNO.thickness = 3;
    buttonNO.width = 0.5;
    buttonNO.height = "40px";
    buttonNO.cornerRadius = 10;
    buttonNO.children[0].color = "black";
    buttonNO.children[0].fontSize = 24;
    buttonNO.color = "#303233";
    buttonNO.background = "#8c8f91";
    panel.addControl(buttonNO,0,2); 
    
    buttonYES.onPointerClickObservable.add(function () {
        game.goToMainMenu();
    });

    buttonNO.onPointerClickObservable.add(function () {
        advancedTexture2.removeControl(rect1);
    });
   
}

