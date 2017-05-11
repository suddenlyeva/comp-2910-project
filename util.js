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

function makeProgressBar(width, height, padding, bgColor, fgColor) {
    let progressBar = new PIXI.Container();

    let bgProgress = new PIXI.Graphics();
    bgProgress.beginFill(bgColor);
    bgProgress.drawRect(0, 0, width, height);
    bgProgress.endFill();

    let fgProgress = new PIXI.Graphics();
    fgProgress.beginFill(0xFFFFFF);
    fgProgress.tint = fgColor;
    fgProgress.drawRect(padding, padding, width - padding * 2, height - padding * 2);
    fgProgress.endFill();
    fgProgress.scale.x = 0;

    progressBar.addChild(bgProgress);
    progressBar.addChild(fgProgress);

    // let user control fgLoading width through scale
    progressBar.xScale = (s) => { fgProgress.scale.x = s; };
    // get the current scale
    progressBar.getScale = () => {return fgProgress.scale.x; };
    // change the bar's color
    progressBar.setColor = (color) => {
        fgProgress.tint = color;
    }

    return progressBar;
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
    clickableArea.beginFill(0, 0);
    clickableArea.drawRect(0, 0, width, height)
    clickableArea.endFill();
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
        SCENE.scale.x = Math.min(SCENE.scale.y * (1 + stretchThreshold),
            window.innerWidth / CANVAS_WIDTH);
    } else {
        SCENE.scale.x = window.innerWidth / CANVAS_WIDTH;
        SCENE.scale.y = Math.min(SCENE.scale.x * (1 + stretchThreshold),
            window.innerHeight / CANVAS_HEIGHT);
    }
}

// Make a spinning gear
// Sizes: "s, m, l, xl"
function makeGear(size, speed) {
    
    // Constant Controls
    let FRAMECOUNT = 12;
    let TIMEOUT = 2;
    
    // Save textures
    let frames = [];
    for (let i = 0; i < FRAMECOUNT; i++) {
        frames.push(
            PIXI.loader.resources["images/spritesheet.json"].textures["gear-" + size + "-" + i + ".png"]
        );
    }
    
    // Make gear
    let gear = new PIXI.Sprite(frames[0]);
    
    // Add properties
    gear.ticker = 0;
    gear.currentFrame = 0;
    gear.isNextFrame = false;
    
    // Update
    gear.update = () => {
        
        // Tick up
        gear.ticker += speed * TICKER.deltaTime;
        
        // Increment frames, iterate if very fast
        while (gear.ticker >= TIMEOUT) {
            gear.currentFrame ++;
            gear.ticker -= TIMEOUT;
            gear.isNextFrame = true;
        }
        
        // Reset
        if (gear.currentFrame >= FRAMECOUNT) {
            gear.currentFrame -= FRAMECOUNT;
        }
        
        // Change Texture, check is for optimization
        if (gear.isNextFrame) {
            gear.texture = frames[gear.currentFrame];
        }
    }
    
    return gear;
}

function padZeroForInt(intToPad, digits) {
    let paddedNum = "";
    for(let i = 0; i < digits; i++) {
        paddedNum += "0";
    }
    paddedNum = (paddedNum + intToPad).slice(-digits);
    return paddedNum;
}

// function toggleFullScreen() {
//     var doc = window.document;
//     var docEl = doc.documentElement;
//
//     var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
//     var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
//
//     if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
//         requestFullScreen.call(docEl);
//     }
//     else {
//         cancelFullScreen.call(doc);
//     }
// }
