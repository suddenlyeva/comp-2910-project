"use strict";

let CANVAS_WIDTH = 1280,
    CANVAS_HEIGHT = 720;
let FONT_FAMILY = "JMH-HarryDicksonOne";
let thingsToLoad = [
    "images/spritesheet.json",
    "images/foodfalllogo.jpg",
    "images/racetozerologo.png",
    "images/cp2.png"
];

let SCENE = new PIXI.Container();
let STATE, previousScene;

let RENDERER = PIXI.autoDetectRenderer({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    view: document.getElementById("display"),
    transparent: false,
    autoResize: true
});
RENDERER.backgroundColor = 0x95d5f5;
let TICKER = new PIXI.ticker.Ticker();

let WINDOW_RESIZED = true;
let STRETCH_THRESHOLD = 0.1;
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
    TICKER.add(gameLoop);
    TICKER.start();
}

function gameLoop() {
    if(WINDOW_RESIZED || SCENE !== previousScene) {
        // Auto-resize everything
        sceneResize(STRETCH_THRESHOLD);
        RENDERER.resize(CANVAS_WIDTH * SCENE.scale.x, CANVAS_HEIGHT * SCENE.scale.y);
        WINDOW_RESIZED = false;
    }

    STATE();

    previousScene = SCENE;

    RENDERER.render(SCENE);
}

function showLoadingProgress(loader, resource) {
    console.log("loading: " + resource.url);
    loadingProgressBar.xScale(loader.progress / 100);

    sceneResize(STRETCH_THRESHOLD);
    RENDERER.resize(CANVAS_WIDTH * SCENE.scale.x, CANVAS_HEIGHT * SCENE.scale.y);

    RENDERER.render(SCENE);
}
