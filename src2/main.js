var g; // just so I can access it from console

window.onload = function() {
    g = new Game();
    g.goToMainMenu();
    
    // Resize
    window.addEventListener("resize", ()=>(g.engine.resize()));
};