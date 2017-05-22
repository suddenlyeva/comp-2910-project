// Declare and initialize global variables

// Font Global
let FONT_FAMILY = "JMH-HarryDicksonOne";

// Base Canvas Size
let CANVAS_WIDTH = 1280,
    CANVAS_HEIGHT = 720;

// Size of one tile unit
let TILES_PX = 80;

// Resize Information
let WINDOW_RESIZED = true;
let STRETCH_THRESHOLD = 0.1;

// Ticker Global for deltaTime interpolation
let TICKER = new PIXI.ticker.Ticker();

// Renderer Global
let RENDERER = PIXI.autoDetectRenderer({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    view: document.getElementById("display"),
    transparent: false,
    autoResize: true
});

// State Machine Globals
let SCENE = new PIXI.Container(), previousScene;
let STATE;

// Database Globals
let DATABASE = firebase.database();
let USER;

// is the secret level (ppap) unlocked?
let PPAP_UNLOCKED = false;

// level progress is loaded in this array
let LEVEL_PROGRESS = [];

// Letterboxing variables
let TOP_MASK,
    BOT_MASK,
    LEFT_MASK,
    RIGHT_MASK,
    frameX,
    frameY,
    frameW,
    frameH;
