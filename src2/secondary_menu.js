function SecondaryMenu(advancedTexture,game){

    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = "200px";
    rect1.height = "250px";
    rect1.cornerRadius = 30;
    rect1.color = "black";
    rect1.thickness = 3;
    rect1.background = "black";
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
        advancedTexture.removeControl(rect1);
    });
   
}

