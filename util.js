"use strict";

// File for random functions without a proper place yet.

// simple rectangular button
// use this until we have "real" buttons
// font properties and line style are fixed
function makeSimpleButton(width, height, text, color, textSize = 20, borderWidth = 2) {

    // Create Display Objects
    let btnCont = new PIXI.Container();
    let btn = new PIXI.Graphics();
    let txt = new PIXI.Text(text, {
        fontFamily: FONT_FAMILY, fontSize: textSize, fill: "black"
    });

    // Style
    btn.lineStyle(borderWidth, 0x000000, 1);
    btn.beginFill(color);
    btn.drawRect(0, 0, width, height);
    btn.endFill();

    // Group in Container
    btnCont.addChild(btn);
    btnCont.addChild(txt);

    // Set Text
    txt.position.set(width / 2 - txt.width / 2, height / 2 - textSize / 2);

    // Make Interactive
    btnCont.interactive = true;
    btnCont.buttonMode = true;

    // Return to caller
    return btnCont;
}

// Creates a scalable progress bar
function makeProgressBar(width, height, padding, bgColor, fgColor) {

    // Create Container
    let progressBar = new PIXI.Container();

    // Create Background
    let bgProgress = new PIXI.Graphics();
    bgProgress.beginFill(bgColor);
    bgProgress.drawRect(0, 0, width, height);
    bgProgress.endFill();

    // Create Foreground
    let fgProgress = new PIXI.Graphics();
    fgProgress.beginFill(0xFFFFFF);
    fgProgress.tint = fgColor;
    fgProgress.drawRect(padding, padding, width - padding * 2, height - padding * 2);
    fgProgress.endFill();
    fgProgress.scale.x = 0;

    // Add to container
    progressBar.addChild(bgProgress);
    progressBar.addChild(fgProgress);

    // Functions

    // let user control fgLoading width through scale
    progressBar.xScale = (s) => {
        fgProgress.scale.x = s;
    };

    // Get the current scale
    progressBar.getScale = () => {
        return fgProgress.scale.x;
    };

    // Change the bar's color
    progressBar.setColor = (color) => {
        fgProgress.tint = color;
    };

    // Return to Caller
    return progressBar;
}

// Builds a Volume Slider
function makeSlider(initValue, width, colorSound, sliderThickness = 20) {

    // Create Container
    let sliderObj = new PIXI.Container();

    // Define Colors
    let colorMuted = 0xff3a3a,
        colorDrag  = 0xd7f442;

    // Style and Draw Handle
    /*
    let handle = new PIXI.Graphics();
    handle.lineStyle(4, 0x0, 1);
    handle.beginFill(0xFFFFFF);
    handle.drawRect(0, 0, handleWidth, height);
    handle.endFill();
    */
    let handle = new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["slider-handle.png"]
    );
    handle.interactive = handle.buttonMode = true;
        
    let endOfSlider = width - handle.width;

    // Style and draw Slider
    let slider = new PIXI.Graphics();
    slider.beginFill(0x0);
    slider.drawRect(0, 0, width, sliderThickness);
    slider.endFill();
    slider.y = handle.height / 2 - slider.height / 2;

    // Clicking on the slider brings handle position to that point
    let clickableArea = new PIXI.Graphics();
    clickableArea.beginFill(0, 0);
    clickableArea.drawRect(0, 0, width, handle.height)
    clickableArea.endFill();
    clickableArea.interactive = clickableArea.buttonMode = true;

    // Sets the slider to a given value.
    sliderObj.setValue = (newValue) => {
        if(newValue >= 0 && newValue <= 1) {
            sliderObj.value = newValue;
            handle.x = slider.x + (endOfSlider - slider.x) * newValue;
        }
    };
    
    sliderObj.setValue(initValue);

    // Functions

    // Records cursor position inside handle.dragData
    handle.pointerdown = (eventData) => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        handle.dragData = eventData.data.getLocalPosition(handle.parent);
        handle.ptrId = eventData.data.identifier;
        handle.tint = colorDrag;
    };


    // Change color on mute
    handle.pointerup = handle.pointerupoutside =
        clickableArea.pointerup = clickableArea.pointerupoutside =
        (eventData) => {
            PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
            sliderObj.cleanUp();
        };

    // Move the handle on drag
    handle.pointermove = (eventData) => {
        // If it's dragging with the same pointer id:
        if(handle.ptrId === eventData.data.identifier && handle.dragData) {

            // Set the color
            handle.tint = colorDrag;

            // Define a new position
            let newPos = eventData.data.getLocalPosition(handle.parent);

            // xAdjusted is old handle.x + difference between new and old cursor position
            let xAdjusted = handle.x + newPos.x - handle.dragData.x;

            // Bounds checking
            if(xAdjusted < slider.x) {              // Past the left
                handle.x = slider.x;
            } else if(xAdjusted > endOfSlider) {    // Past the end of slider
                handle.x = endOfSlider;
            } else {                                // Anywhere in the middle
                handle.x = xAdjusted;
                handle.dragData = newPos;
            }

            // Adjust value based on new positions and request callback
            sliderObj.value = (handle.x-slider.x) / (endOfSlider - slider.x);
            sliderObj.onSliderAdjust(sliderObj.value);
        }
    };

    // Also move when clicking anywhere on the clickable area
    // Separate so that clicking on the handle doesn't cause it to snap
    clickableArea.pointerdown = (eventData) => {
        handle.ptrId = eventData.data.identifier;
        handle.dragData = eventData.data.getLocalPosition(handle.parent);
        let xAdjusted = handle.dragData.x - handle.width / 2;
        if(xAdjusted < slider.x) {
            handle.x = slider.x;
        } else if(xAdjusted > endOfSlider) {
            handle.x = endOfSlider;
        } else {
            handle.x = xAdjusted;
        }

        sliderObj.value = (handle.x-slider.x) / (endOfSlider - slider.x);
        sliderObj.onSliderAdjust(sliderObj.value);
    };

    // clears handle data
    sliderObj.cleanUp = () => {
        handle.ptrId = handle.dragData = false; // Stop dragging
        handle.tint = handle.x === slider.x ? colorMuted : colorSound; // IF the handle is on the left edge of slider
    };

    // Function callback for moving the slider bar.
    sliderObj.onSliderAdjust = () => {};
    
    // Add to container
    sliderObj.addChild(slider);
    sliderObj.addChild(clickableArea);
    sliderObj.addChild(handle);
    sliderObj.cleanUp();

    // Return to caller
    return sliderObj;
}

// Rescales the screen up to a certain threshold
function sceneResize(stretchThreshold = 0) {
    // stretchThreshold - how much scene dimensions can deviate from the desired aspect ratio
    // 0.2 means the scene can be stretched by a maximum of 20% vertically or horizontally
    let targetAspectRatio  = CANVAS_WIDTH / CANVAS_HEIGHT,
        currentAspectRatio = window.innerWidth / window.innerHeight;

    if(targetAspectRatio < currentAspectRatio) {                         // Wider screen than normal
        SCENE.scale.y = window.innerHeight / CANVAS_HEIGHT;              // Always stretch height
        SCENE.scale.x = Math.min(SCENE.scale.y * (1 + stretchThreshold), // Use height ratio if past Stretch Threshold
            window.innerWidth / CANVAS_WIDTH);                           // Else stretch the width

    } else {                                                             // Taller Screen than normal
        SCENE.scale.x = window.innerWidth / CANVAS_WIDTH;
        SCENE.scale.y = Math.min(SCENE.scale.x * (1 + stretchThreshold), // Same as vertical, but inverted x and y
            window.innerHeight / CANVAS_HEIGHT);
    }
}

// Creates the letterbox around the game
// Divisions are to undo scaling from the scene resize
function letterbox(frameX, frameY) {
    frameX /= SCENE.scale.x;
    frameY /= SCENE.scale.y;
    frameW = window.innerWidth/SCENE.scale.x * (1 + STRETCH_THRESHOLD);
    frameH = window.innerHeight/SCENE.scale.y * (1 + STRETCH_THRESHOLD);

    LEFT_MASK.width = frameX;
    LEFT_MASK.height = frameH;
    LEFT_MASK.x = -frameX;
    SCENE.addChild(LEFT_MASK);

    RIGHT_MASK.width = frameX;
    RIGHT_MASK.height = frameH;
    RIGHT_MASK.x = CANVAS_WIDTH;
    SCENE.addChild(RIGHT_MASK);

    TOP_MASK.height = frameY;
    TOP_MASK.width = frameW
    TOP_MASK.y = -frameY;
    SCENE.addChild(TOP_MASK);

    BOT_MASK.height = frameY;
    BOT_MASK.width = frameW;
    BOT_MASK.y = CANVAS_HEIGHT;
    SCENE.addChild(BOT_MASK);

}

// Make a spinning gear
// Sizes: "s, m, l, xl"
function makeGear(size, speed) {

    // Constant Controls
    let frameCount = 12;
    let timeOut = 2;

    // Save textures
    let frames = [];
    if (size == "xl") {
        for (let i = 0; i < frameCount; i++) {
            frames.push(
                PIXI.loader.resources["images/gears-xl.json"].textures["gear-xl-" + i + ".png"]
            );
        }
    }
    else {
        for (let i = 0; i < frameCount; i++) {
            frames.push(
                PIXI.loader.resources["images/spritesheet.json"].textures["gear-" + size + "-" + i + ".png"]
            );
        }
    }

    // Make gear
    let gear = new PIXI.Sprite(frames[0]);

    // Add properties
    gear.ticker = 0;
    gear.currentFrame = 0;
    gear.isNextFrame = false;

    // Functions

    // Update
    gear.update = () => {

        // Tick up
        gear.ticker += speed * TICKER.deltaTime;

        // Increment frames, iterate if very fast
        while (gear.ticker >= timeOut) {
            gear.currentFrame ++;
            gear.ticker -= timeOut;
            gear.isNextFrame = true;
        }

        // Reset
        if (gear.currentFrame >= frameCount) {
            gear.currentFrame -= frameCount;
        }

        // Change Texture, check is for optimization
        if (gear.isNextFrame) {
            gear.texture = frames[gear.currentFrame];
        }
    };

    // Return to caller
    return gear;
}

// takes level data and returns earned grade
function calculateGrade(data) {
    // should this be a global ? ...
    let gradeLists = {
        perfect   : {percentage: 100,  text: "perfect!"    ,  nStars: 5},
        excellent : {percentage:  80,  text: "excellent!"  ,  nStars: 4},
        great     : {percentage:  60,  text: "great!"      ,  nStars: 3},
        nice      : {percentage:  40,  text: "nice!"       ,  nStars: 2},
        good      : {percentage:   0,  text: "good enough!",  nStars: 1}
    };

    let result;

    let gradeRate = (data.score / data.maxScore) * 100;

    // Assign grade
    if (gradeRate >= gradeLists.perfect.percentage) {
        result = gradeLists.perfect;
    } else if (gradeRate >= gradeLists.excellent.percentage) {
        result = gradeLists.excellent;
    } else if (gradeRate >= gradeLists.great.percentage) {
        result = gradeLists.great;
    } else if (gradeRate >= gradeLists.nice.percentage) {
        result = gradeLists.nice;
    } else if (gradeRate >= gradeLists.good.percentage) {
        result = gradeLists.good;
    }

    return result;
}

// returns displayable level name in correct format e.g. "level 1 : something"
// takes level id and name. Can also take level index if it's known at the time
function levelDisplayName(id, name, index = null) {
    if(id === PPAP.id)
        return "secret stage : " + name;
    if(index === null)
        index = findIndexById(LEVELS, id);
    // count levels from 1 so (index + 1)
    return "stage " + (index + 1) + " : " + name;
}

// returns an array conataining types to be made into the level preview.
// get with the level id number.
function getPreviewFromId(id, index = null) {
   
    if (index === null) {
        index = findIndexById(LEVELS, id);
    }
    return LEVELS[index].conveyorBelt.items.filter((v, i, a) => 
        (v !== BLANK) && (a.indexOf(v) === i)
    );
}

// arr - array of object with property 'id'; id - object id whose index we want to find
// returns -1 if index not found
function findIndexById(arr, id) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

// Adds zeros to the beginning of a number as string
function padZeroForInt(intToPad, digits) {
    let paddedNum = "" + intToPad;
    while(paddedNum.length < digits) {
        paddedNum = "0" + paddedNum;
    }
    return paddedNum;
}

// TODO: Well supported fullscreen functionality

// function toggleFullScreen() {
//     let doc = window.document;
//     let docEl = document.getElementById("display");
//
//     let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
//     let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
//
//     if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
//         requestFullScreen.call(docEl);
//     }
//     else {
//         cancelFullScreen.call(doc);
//     }
// }
