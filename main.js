"use strict";

let CANVAS_WIDTH = 1280,
    CANVAS_HEIGHT = 720;
let thingsToLoad = [
    "images/spritesheet.json"
];

let RENDERER = PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
RENDERER.backgroundColor = 0x95d5f5;
document.body.appendChild(RENDERER.view);

let SCENE = new PIXI.Container();
let STATE;

let loadingProgressBar = makeLoadingBar(100, 250, 600, 100, 10, 0, 0x00d27f);
SCENE.addChild(loadingProgressBar);

PIXI.loader
    .on("progress", showLoadingProgress)
    .add(thingsToLoad)
    .load(setup);

function setup() {
    openIntro();
    gameLoop();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    STATE();
    RENDERER.render(SCENE);
}

function showLoadingProgress(loader, resource) {
    console.log("loading: " + resource.url);
    loadingProgressBar.xScale(loader.progress / 100);
    RENDERER.render(SCENE);
}
