"use strict";

let CANVAS_WIDTH = 1280,
    CANVAS_HEIGHT = 720;
let FONT_FAMILY = "JMH-HarryDicksonOne";
let thingsToLoad = [
    "images/spritesheet.json"
];

let RENDERER = PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
RENDERER.view.style.position = "absolute";
RENDERER.view.style.display = "block";
RENDERER.autoResize = true;
RENDERER.resize(window.innerWidth, window.innerHeight);
RENDERER.backgroundColor = 0x95d5f5;
document.body.appendChild(RENDERER.view);

let SCENE = new PIXI.Container();
let STATE;

let loadingProgressBar = makeLoadingBar(
    RENDERER.width / 1.5, RENDERER.height / 6, 10, 0, 0x00d27f);
loadingProgressBar.position.set(RENDERER.width / 2 - loadingProgressBar.width / 2,
    RENDERER.height / 2 - loadingProgressBar.height / 2);
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
    console
    STATE();
    RENDERER.render(SCENE);
}

function showLoadingProgress(loader, resource) {
    console.log("loading: " + resource.url);
    loadingProgressBar.xScale(loader.progress / 100);
    RENDERER.render(SCENE);
}
