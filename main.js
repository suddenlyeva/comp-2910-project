"use strict";

let loadingProgressBar;
function init() {
    // Stuff for the Loader
    let thingsToLoad = [
        "images/spritesheet.json",
        "images/gears-xl.json",
        "images/food.json",
        "images/background-stageselect.png"
    ];

    // Authentication Check
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("logged in");
            USER = user;
        }
    });

    // Load Progress
    loadProgress(); // -> progress.js

    RENDERER.backgroundColor = 0x95d5f5;

    window.addEventListener('resize', function(){ // Flag after resize event for optimization
        WINDOW_RESIZED = true;
    }, true);

    // Create Loading Bar
    loadingProgressBar = makeProgressBar(
        CANVAS_WIDTH / 1.5, CANVAS_HEIGHT / 6, 10, 0, 0x00d27f);
    loadingProgressBar.position.set(CANVAS_WIDTH / 2 - loadingProgressBar.width / 2,
        CANVAS_HEIGHT / 2 - loadingProgressBar.height / 2);
    SCENE.addChild(loadingProgressBar);

    // Load game with PIXI loader
    PIXI.loader
        .on("progress", showLoadingProgress)
        .add(thingsToLoad)
        .load(loadSounds); // -> sfx.js
}

// Starts the game at Intro
function setup() {

    // Create letterbox
    TOP_MASK = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["letterbox.png"],
        0,
        CANVAS_HEIGHT
    );
    TOP_MASK.interactive = true;
    BOT_MASK = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["letterbox.png"],
        0,
        CANVAS_HEIGHT
    );
    BOT_MASK.interactive = true;
    LEFT_MASK = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["letterbox.png"],
        CANVAS_WIDTH,
        0
    );
    LEFT_MASK.interactive = true;
    RIGHT_MASK = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["letterbox.png"],
        CANVAS_WIDTH,
        0
    );
    RIGHT_MASK.interactive = true;

    // Load texture dictionary
    defineItemTextures(); // -> elements/ingredient.js

    // Start game
    Intro.open(); // -> states/intro.js
    TICKER.add(gameLoop);
    TICKER.start();
}

// Called by loader before the game starts
function showLoadingProgress(loader, resource) {

    // Show progress
    console.log("loading: " + resource.url);

    // Other half of loading bar is in sfx.js sound.onProgress
    loadingProgressBar.xScale(loader.progress / 200); // -> util.js

    // Resize loading screen
    sceneResize(STRETCH_THRESHOLD); // -> util.js
    RENDERER.resize(CANVAS_WIDTH * SCENE.scale.x, CANVAS_HEIGHT * SCENE.scale.y);

    // Draw loading screen
    RENDERER.render(SCENE);
}

// Called while the game is running
function gameLoop() {

    STATE(); // Single-state update loop for easy switching

    // Scene resize and centering
    if(WINDOW_RESIZED || SCENE !== previousScene) {

        sceneResize(STRETCH_THRESHOLD); // -> util.js
        RENDERER.resize(window.innerWidth, window.innerHeight);

        frameX = (window.innerWidth - CANVAS_WIDTH * SCENE.scale.x)/2;
        frameY = (window.innerHeight - CANVAS_HEIGHT * SCENE.scale.y)/2;
        SCENE.x = frameX;
        SCENE.y = frameY;

        letterbox(frameX, frameY); // -> util.js

        WINDOW_RESIZED = false;
    }

    previousScene = SCENE; // Reset Scene switch flag

    RENDERER.render(SCENE); // Draw the current Scene
}

// start the game
init();
