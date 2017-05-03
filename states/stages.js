"use strict";

// Needs heavy refactoring

let STAGES = [setupStage0, setupStage1, setupStage2, setupStage3, setupStage4];
let currentStage = 0;
let stageTimer = 0;
let stageScene;
// Discuss about where to declare later
let background, apple1, banana, processor, conveyor, conveyorBelt, conveyorBeltRec;

function stageInit() {
    stageTimer = 0;

    let bgTexture = PIXI.utils.TextureCache["background.png"];
    let background = new PIXI.Sprite(bgTexture);

    let pauseButton = makeSimpleButton(100, 50, "Pause", 0x94b8b8);
    pauseButton.position.set(CANVAS_WIDTH - 150, 100);
    pauseButton.on("pointertap", () => {
        openPauseMenu();
    });

    stageScene = new PIXI.Container()
    stageScene.addChild(background);
    stageScene.addChild(pauseButton);
}

function setupStage0() {
    RENDERER.backgroundColor = 0x000000;
    currentStage = 0;
    console.log("stage 0");

    stageInit();

    SCENE = stageScene;
    STATE = stage0;
}

function stage0() {
    stageTimer++;
    if (stageTimer === 120) {
        STATE = openStageComplete;
    }
}

function setupStage1() {
    RENDERER.backgroundColor = 0x330000;
    currentStage = 1;
    console.log("stage 1");

    stageInit();

    SCENE = stageScene;
    STATE = stage1;
}

function stage1() {
    stageTimer++;
    if (stageTimer === 120) {
        STATE = openStageComplete;
    }
}

function setupStage2() {
    RENDERER.backgroundColor = 0x660000;
    currentStage = 2;
    console.log("stage 2");

    stageInit();

    SCENE = stageScene;
    STATE = stage2;
}

function stage2() {
    stageTimer++;
    if (stageTimer === 120) {
        STATE = openStageComplete;
    }
}

function setupStage3() {
    RENDERER.backgroundColor = 0x990000;
    currentStage = 3;
    console.log("stage 3");

    stageInit();

    SCENE = stageScene;
    STATE = stage3;
}

function stage3() {
    stageTimer++;
    if (stageTimer === 120) {
        STATE = openStageComplete;
    }
}

function setupStage4() {
    RENDERER.backgroundColor = 0xcc0000;
    currentStage = 4;
    console.log("stage 4");

    stageInit();

    SCENE = stageScene;
    STATE = stage4;
}

function stage4() {
    stageTimer++;
    if (stageTimer === 120) {
        STATE = openStageComplete;
    }
}

function nextStage() {
    currentStage = currentStage === STAGES.length - 1 ? 0 : currentStage + 1;
}

function ingredientTest() {
    currentStage = 0;
    console.log("stage 0");

    stageInit();

    let apples = [];
    let BELT_SPEED = 1.3;

    for (let i = 0; i < 12; i+=2) {
        apples.push(makeItem("apple.png", 0, 0));
        apples.push(makeTestBlank());
        stageScene.addChild(apples[i]);
        stageScene.addChild(apples[i+1]);
    }

    conveyorBelt = new ConveyorBelt(apples, BELT_SPEED);
    conveyorBeltRec = new PIXI.Rectangle(0, (480-32), 1280, 64);

    apple1 = makeItem("apple.png", 100, 100);
    banana = makeItem("banana.png", 150, 150);
    processor = makeItem("table.png",200, 200);
    conveyor = makeItem("table.png",300, 300);

    stageScene.addChild(apple1);
    stageScene.addChild(banana);
    stageScene.addChild(processor);
    stageScene.addChild(conveyor);

    SCENE = stageScene;
    STATE = ingredientTestStage;

}
function ingredientTestStage() {
    apple1.update();
    banana.update();
    processor.update(); 
    conveyor.update(); 
    conveyorBelt.update();
}
