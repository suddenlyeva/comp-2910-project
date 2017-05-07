"use strict";

let CANVAS_WIDTH = 1280,
    CANVAS_HEIGHT = 768;
let FONT_FAMILY = "JMH-HarryDicksonOne";
let thingsToLoad = [
    "images/spritesheet.json"
];

let SCENE = new PIXI.Container();
let previousScene;
let STATE;

let RENDERER = PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
RENDERER.view.style.position = "absolute";
RENDERER.view.style.display = "block";
RENDERER.autoResize = true;
RENDERER.backgroundColor = 0x95d5f5;
document.body.appendChild(RENDERER.view);

let WINDOW_RESIZED = true;
window.addEventListener('resize', function(){
    WINDOW_RESIZED = true;
}, true);

let loadingProgressBar = makeLoadingBar(
    CANVAS_WIDTH / 1.5, CANVAS_HEIGHT / 6, 10, 0, 0x00d27f);
loadingProgressBar.position.set(CANVAS_WIDTH / 2 - loadingProgressBar.width / 2,
    CANVAS_HEIGHT / 2 - loadingProgressBar.height / 2);
SCENE.addChild(loadingProgressBar);

PIXI.loader
    .on("progress", showLoadingProgress)
    .add(thingsToLoad)
    .load(setup);

function setup() {
    Intro.open();
    gameLoop();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    
    if(WINDOW_RESIZED || SCENE !== previousScene) {
        // Auto-resize everything
        sceneResize(0.15);
        RENDERER.resize(SCENE.width, SCENE.height);
        WINDOW_RESIZED = false;
    }
    
    STATE();
    
    previousScene = SCENE;
    
    RENDERER.render(SCENE);
}

function showLoadingProgress(loader, resource) {
    console.log("loading: " + resource.url);
    loadingProgressBar.xScale(loader.progress / 100);
    
    // Resize everything
    SCENE.scale.x = window.innerWidth/CANVAS_WIDTH;
    SCENE.scale.y = window.innerHeight/CANVAS_HEIGHT;
    RENDERER.resize(window.innerWidth, window.innerHeight);
    
    RENDERER.render(SCENE);
}
