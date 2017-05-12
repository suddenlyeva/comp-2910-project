"use strict";

// Base Canvas Size
let CANVAS_WIDTH = 1280,
    CANVAS_HEIGHT = 720;

// Font Global
let FONT_FAMILY = "JMH-HarryDicksonOne";

// State Machine Globals
let SCENE = new PIXI.Container();
let STATE, previousScene;

// Stuff for the Loader
let thingsToLoad = [
    "images/spritesheet.json"
];

// Renderer Global
let RENDERER = PIXI.autoDetectRenderer({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    view: document.getElementById("display"),
    transparent: false,
    autoResize: true
});
RENDERER.backgroundColor = 0x95d5f5;

// Ticker Global for deltaTime interpolation
let TICKER = new PIXI.ticker.Ticker();

// Resize Information
let WINDOW_RESIZED = true;
let STRETCH_THRESHOLD = 0.1;
window.addEventListener('resize', function(){ // Flag after resize event for optimization
    WINDOW_RESIZED = true;
}, true);

// Create Loading Bar
let loadingProgressBar = makeProgressBar(
    CANVAS_WIDTH / 1.5, CANVAS_HEIGHT / 6, 10, 0, 0x00d27f);
loadingProgressBar.position.set(CANVAS_WIDTH / 2 - loadingProgressBar.width / 2,
    CANVAS_HEIGHT / 2 - loadingProgressBar.height / 2);
SCENE.addChild(loadingProgressBar);


// Load game with PIXI loader
PIXI.loader
    .on("progress", showLoadingProgress)
    .add(thingsToLoad)
    .load(setup);

// Starts the game at Intro
function setup() {
    Intro.open(); 
    TICKER.add(gameLoop);
    TICKER.start();
}

// Called while the game is running
function gameLoop() {
    
    // Resize the scene on window resize or scene changed
    if(WINDOW_RESIZED || SCENE !== previousScene) {
        sceneResize(STRETCH_THRESHOLD); // -> util.js
        RENDERER.resize(CANVAS_WIDTH * SCENE.scale.x, CANVAS_HEIGHT * SCENE.scale.y);
        WINDOW_RESIZED = false;
    }
    
    STATE(); // Single-state update loop for easy switching

    previousScene = SCENE; // Reset Scene switch flag

    RENDERER.render(SCENE); // Draw the current Scene
}

// Called by loader before the game starts
function showLoadingProgress(loader, resource) {
    
    // Show progress
    console.log("loading: " + resource.url);
    loadingProgressBar.xScale(loader.progress / 100);
    
    // Resize loading screen
    sceneResize(STRETCH_THRESHOLD);
    RENDERER.resize(CANVAS_WIDTH * SCENE.scale.x, CANVAS_HEIGHT * SCENE.scale.y);
    
    // Draw loading screen
    RENDERER.render(SCENE);
}
