"use strict";

// File for random functions without a proper place yet.

// simple rectangular button
// use this until we have "real" buttons
// font properties and line style are fixed
function makeSimpleButton(width, height, text, color, textSize = 20, borderWidth = 2) {
    let btnCont = new PIXI.Container();
    let btn = new PIXI.Graphics();
    let txt = new PIXI.Text(text, {
        fontFamily: FONT_FAMILY, fontSize: textSize, fill: "black"
    });

    btn.lineStyle(borderWidth, 0x000000, 1);
    btn.beginFill(color);
    btn.drawRect(0, 0, width, height);
    btn.endFill();

    btnCont.addChild(btn);
    btnCont.addChild(txt);

    txt.position.set(width / 2 - txt.width / 2, height / 2 - textSize / 2);

    btnCont.interactive = true;
    btnCont.buttonMode = true;
    return btnCont;
}

function makeLoadingBar(width, height, padding, bgColor, fgColor) {
    let loadingBar = new PIXI.Container();

    let bgLoading = new PIXI.Graphics();
    bgLoading.beginFill(bgColor);
    bgLoading.drawRect(0, 0, width, height);
    bgLoading.endFill();

    let fgLoading = new PIXI.Graphics();
    fgLoading.beginFill(fgColor);
    fgLoading.drawRect(padding, padding, width - padding * 2, height - padding * 2);
    fgLoading.endFill();
    fgLoading.scale.x = 0;

    loadingBar.addChild(bgLoading);
    loadingBar.addChild(fgLoading);

    // let user control fgLoading width through scale
    loadingBar.xScale = function(s) { fgLoading.scale.x = s; };

    return loadingBar;
}

function makeSlider(width, height, sliderThickness = height / 6, handleWidth = height / 2) {
    let sliderObj = new PIXI.Container();

    let colorSound = 0x77f441,
        colorMuted = 0xff1a1a,
        colorDrag  = 0xd7f442;
    // using handleWidth because handle.width is for some reason inaccurate
    let endOfSlider = width - handleWidth;

    let handle = new PIXI.Graphics();
    handle.lineStyle(4, 0x0, 1);
    handle.beginFill(0xFFFFFF);
    handle.drawRect(0, 0, handleWidth, height);
    handle.endFill();
    handle.x = endOfSlider;
    handle.tint = colorSound;
    handle.interactive = handle.buttonMode = true;

    let slider = new PIXI.Graphics();
    slider.beginFill(0x0);
    slider.drawRect(0, 0, width, sliderThickness);
    slider.endFill();
    slider.y = height / 2 - slider.height / 2;

    // clicking on the slider brings handle position to that point
    let clickableArea = new PIXI.Graphics();
    clickableArea.beginFill(0x0);
    clickableArea.drawRect(0, 0, width, height)
    clickableArea.endFill();
    clickableArea.alpha = 0;
    clickableArea.interactive = clickableArea.buttonMode = true;

    handle.pointerdown = eventData => {
        // record cursor position inside handle
        handle.dragData = eventData.data.getLocalPosition(handle.parent);
        handle.tint = colorDrag;
    };

    handle.pointerup = handle.pointerupoutside =
        clickableArea.pointerup = clickableArea.pointerupoutside =
        eventData => {
            handle.dragData = false;
            handle.tint = handle.x === slider.x ? colorMuted : colorSound;
        };

    handle.pointermove = eventData => {
        if(handle.dragData) {
            handle.tint = colorDrag;
            let newPos = eventData.data.getLocalPosition(handle.parent);
            // xAdjusted is old handle.x + difference between new and old cursor position
            let xAdjusted = handle.x + newPos.x - handle.dragData.x;
            if(xAdjusted < slider.x) {
                handle.x = slider.x;
            } else if(xAdjusted > endOfSlider) {
                handle.x = endOfSlider;
            } else {
                handle.x = xAdjusted;
                handle.dragData = newPos;
            }
        }
    };

    clickableArea.pointerdown = eventData => {
        handle.dragData = eventData.data.getLocalPosition(handle.parent);
        let xAdjusted = handle.dragData.x - handle.width / 2;
        if(xAdjusted < slider.x) {
            handle.x = slider.x;
        } else if(xAdjusted > endOfSlider) {
            handle.x = endOfSlider;
        } else {
            handle.x = xAdjusted;
        }
    };

    sliderObj.addChild(slider);
    sliderObj.addChild(clickableArea);
    sliderObj.addChild(handle);

    return sliderObj;
}

// Point to box collision
function testHitRectangle(pointObj, rectObj) {
    let xPoint = pointObj.x;
    let yPoint = pointObj.y;
    let xMin = rectObj.x - rectObj.width/2;
    let xMax = rectObj.x + rectObj.width/2;
    let yMin = rectObj.y - rectObj.height/2;
    let yMax = rectObj.y + rectObj.height/2;

    return (xMin < xPoint && xPoint < xMax) && (yMin < yPoint && yPoint < yMax);
}

function sceneResize(stretchThreshold = 0) {
    // stretchThreshold - how much scene dimensions can deviate from the desired aspect ratio
    // 0.2 means the scene can be stretched by a maximum of 20% vertically or horizontally
    let targetAspectRatio  = CANVAS_WIDTH / CANVAS_HEIGHT,
        currentAspectRatio = window.innerWidth / window.innerHeight;

    if(targetAspectRatio < currentAspectRatio) {
        SCENE.scale.y = window.innerHeight / CANVAS_HEIGHT;
        SCENE.scale.x = SCENE.scale.y * (1 +
                Math.min(1 - (CANVAS_WIDTH * SCENE.scale.y) / window.innerWidth,
                         stretchThreshold));
    } else {
        SCENE.scale.x = window.innerWidth / CANVAS_WIDTH;
        SCENE.scale.y = SCENE.scale.x * (1 +
            Math.min(1 - (CANVAS_HEIGHT * SCENE.scale.x) / window.innerHeight,
                     stretchThreshold));
    }

    // using SCENE.scale.x = SCENE.scale.y = ... average performance ~1.27
    // all in one formula (...CANVAS_WIDTH * SCENE.scale.[xy]...) average performance ~0.034
}
