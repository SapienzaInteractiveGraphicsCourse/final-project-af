function get_settings_panel(advancedTexture){
    
    var selectBox = new BABYLON.GUI.SelectionPanel("selectBox");
    selectBox.width = 0.25;
    selectBox.height = 0.52;
    selectBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    advancedTexture.addControl(selectBox);
    return selectBox
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

