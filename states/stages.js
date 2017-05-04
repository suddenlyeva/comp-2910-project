"use strict";

// Needs heavy refactoring

let STAGES = [setupStage0, setupStage1, setupStage2, setupStage3, setupStage4];
let currentStage = 0;
let stageTimer = 0;
let stageScene;
// Discuss about where to declare later
let background, conveyorBelt;
let gProcessor;

function stageInit() {
    stageTimer = 0;

    let bgTexture = PIXI.utils.TextureCache["background.png"];
    let background = new PIXI.Sprite(bgTexture);

    let pauseButton = makeSimpleButton(100, 50, "Pause", 0x94b8b8);
    pauseButton.position.set(CANVAS_WIDTH - 150, 100);
    pauseButton.on("pointertap", PauseMenu.open);

    stageScene = new PIXI.Container()
    stageScene.addChild(background);
    stageScene.addChild(pauseButton);
}

function setupStage0() {
    currentStage = 0;
    console.log("stage 0");
	
    stageInit();
	
	
	var tempRecipe = new Recipe([1,2,3,4],APPLE);
	var tempRecipe2 = new Recipe([1,2,3],APPLE);
	
	gProcessor = new Processor(tempRecipe);
	gProcessor.OnTestInit();
	
	
	var gPro2 = new Processor(tempRecipe2);
	gPro2.SetPosition(100, 300);
	gPro2.Spawn();
	
	
	// working
	gProcessor.SetPosition(100,200);
	gProcessor.Spawn();
	
    let apples = [];
    let BELT_SPEED = 1.3;

    for (let i = 0; i < 6; i++) {
        apples.push(APPLE);
        apples.push(BLANK);
    }

    conveyorBelt = new ConveyorBelt(apples, BELT_SPEED);

    SCENE = stageScene;
    STATE = ingredientTestStage;

}

function stage0() {

	conveyorBelt.update();
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
        StageComplete.open();
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
        StageComplete.open();
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
        StageComplete.open();
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
        StageComplete.open();
    }
}

function nextStage() {
    currentStage = currentStage === STAGES.length - 1 ? 0 : currentStage + 1;
}

function ingredientTest() {

}
function ingredientTestStage() {
    conveyorBelt.update();
}
