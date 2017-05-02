"use strict";

let canvasWidth = 800,
    canvasHeight = 600;
let thingsToLoad = [
    "images/spritesheet.json"
];

let renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight);
renderer.backgroundColor = 0x096c74;
document.body.appendChild(renderer.view);

let SCENE = new PIXI.Container();
let STATE, stateBuffer;

let loadingProgressBar = makeLoadingBar(100, 250, 600, 100, 10, 0, 0x00d27f);
SCENE.addChild(loadingProgressBar);

PIXI.loader
    .on("progress", showLoadingProgress)
    .add(thingsToLoad)
    .load(setup);

function setup() {
    STATE = openIntro;
    gameLoop();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    STATE();
    renderer.render(SCENE);
}

function showLoadingProgress(loader, resource) {
    console.log("loading: " + resource.url);
    loadingProgressBar.fgXScale(loader.progress / 100);
    renderer.render(SCENE);
}
