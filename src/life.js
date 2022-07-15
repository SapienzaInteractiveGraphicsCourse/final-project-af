function playerLife (game) {

    this.numberLife = 3;
    this.start = new Date().getTime();
    this.time = 0;
    this.kills = 0;
    this.game = game;
    this.game.environment.life1.isVisible = true;
    this.game.environment.life2.isVisible = true;
    this.game.environment.life3.isVisible = true;
    this.lostLife = async function(){
        this.numberLife -=1;
        if(this.numberLife <= 2) this.game.environment.life3.isVisible = false; 
        if(this.numberLife <= 1) this.game.environment.life2.isVisible = false;
        if(this.numberLife == 0) this.game.environment.life1.isVisible = false;
    }
    this.game.scene.onAfterRenderObservable.add(() => {
      if (this.numberLife == 0){
        var end = new Date().getTime();
        this.time = (end - this.start)/1000;
        this.game.goToLost();
        
      }});
}


  function deathMenu(game){

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var rect = new BABYLON.GUI.Rectangle();
    rect.width = "700px";
    rect.height = "500px";
    rect.cornerRadius = 30;
    rect.color = "black";
    rect.thickness = 3;
    rect.background = "blue";
    advancedTexture.addControl(rect);

    var image_rock = new BABYLON.GUI.Image("but", "res/textures/rock_wall.jpg");
    image_rock.width = 1;
    image_rock.height = 1;
    rect.addControl(image_rock, 0, 1);
    
    var grid = new BABYLON.GUI.Grid();   
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; 
    grid.width = 0.98;
    grid.height = 0.98;
    grid.addRowDefinition(0.15);
    grid.addRowDefinition(0.45);
    grid.addRowDefinition(0.15);
    grid.addRowDefinition(0.25);
    rect.addControl(grid);

    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = 1;
    rect1.height = 1;
    rect1.cornerRadius = 30;
    rect1.thickness = 0;
    grid.addControl(rect1,0,0);

    var text1 = new BABYLON.GUI.TextBlock();
    text1.width = 0.7;
    text1.height = 0.7;
    text1.text = "You are dead!";
    text1.color = "gold";
    text1.fontSize = 40;
    text1.textWrapping = 1;
    text1.textHorizontalAlignment = 2;
    text1.textVerticalAlignment = 2;
    rect1.addControl(text1);

    var rect2 = new BABYLON.GUI.Rectangle();
    rect2.width = 1;
    rect2.height = 1;
    rect2.cornerRadius = 30;
    rect2.thickness = 0;
    grid.addControl(rect2,1,0);

    var text2 = new BABYLON.GUI.TextBlock();
    text2.width = 0.7;
    text2.height = 0.7;
    text2.text = "SCORE: \n";
    text2.text += "   - Number of kills: " + game.player.life.kills + "\n";
    text2.text += "   - Time: "+ convertHMS(game.player.life.time) + "\n";
    text2.color = "white";
    text2.fontSize = 34;
    text2.textWrapping = 1;
    text2.textHorizontalAlignment = 0;
    text2.textVerticalAlignment = 0;
    rect2.addControl(text2);
    
    var rect3 = new BABYLON.GUI.Rectangle();
    rect3.width = 1;
    rect3.height = 1;
    rect3.cornerRadius = 30;
    rect3.thickness = 0;
    grid.addControl(rect3,2,0);
    
    var text3 = new BABYLON.GUI.TextBlock();
    text3.width = 0.7;
    text3.height = 0.7;
    text3.text = "Do you want to play again?";
    text3.color = "white";
    text3.fontSize = 34;
    text3.textWrapping = 1;
    text3.textHorizontalAlignment = 2;
    text3.textVerticalAlignment = 0;
    rect3.addControl(text3);

    //var rect3 = new BABYLON.GUI.Rectangle();
    //rect3.width = 1;
    //rect3.height = "20px";
    //rect3.cornerRadius = 30;
    //rect3.thickness = 0;
    //grid.addControl(rect3,2,0);

    var grid2 = new BABYLON.GUI.Grid();   
    grid2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    grid2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; 
    grid2.width = 0.98;
    grid2.height = 0.98;
    grid2.addColumnDefinition(0.5);
    grid2.addColumnDefinition(0.5);
    grid.addControl(grid2,3,0);

    var buttonYES = BABYLON.GUI.Button.CreateSimpleButton("YES_button", "YES");
    buttonYES.thickness = 3;
    buttonYES.width = 0.5;
    buttonYES.height = "40px";
    buttonYES.cornerRadius = 10;
    buttonYES.children[0].color = "black";
    buttonYES.children[0].fontSize = 24;
    buttonYES.color = "#303233";
    buttonYES.background = "#8c8f91";
    grid2.addControl(buttonYES,0,0); 

    var buttonNO = BABYLON.GUI.Button.CreateSimpleButton("NO_button", "NO");
    buttonNO.thickness = 3;
    buttonNO.width = 0.5;
    buttonNO.height = "40px";
    buttonNO.cornerRadius = 10;
    buttonNO.children[0].color = "black";
    buttonNO.children[0].fontSize = 24;
    buttonNO.color = "#303233";
    buttonNO.background = "#8c8f91";
    grid2.addControl(buttonNO,0,1); 
    
    buttonYES.onPointerClickObservable.add(function () {
      game.goToGame();
    });

    buttonNO.onPointerClickObservable.add(function () {
      game.goToMainMenu();
    });
  }


function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}
    













