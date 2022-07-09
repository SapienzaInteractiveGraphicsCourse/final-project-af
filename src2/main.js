var g; // just so I can access it from console

window.onload = function() {
    g = new Game();
    g.goToGame();
    
    // Resize
    window.addEventListener("resize", ()=>(g.engine.resize()));
};








