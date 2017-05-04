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

function makeSlider(width, height, text, handleHeight, handleColor) {
    let slider = new PIXI.Container();

    let desc = new PIXI.Text(text, {
        fontFamily: FONT_FAMILY, fontSize: height / 3, fill: 0x0
    });

    let line = new PIXI.Graphics();
    line.lineStyle(handleHeight / 6, 0x0, 1);
    line.moveTo(0, 0);
    line.lineTo(width / 1.2, 0);
    line.position.set(width / 2 - line.width / 2, height - handleHeight / 2);

    let handleWidth = handleHeight / 2;
    let handle = new PIXI.Graphics();
    handle.lineStyle(4, 0x0, 1);
    handle.beginFill(handleColor);
    handle.drawRect(0, 0, handleWidth, handleHeight);
    handle.endFill();
    handle.position.set(line.x, line.y + line.height / 2 - handle.height / 2);
    handle.interactive = handle.buttonMode = true;

    handle.pointerdown = event => {
        // record cursor position inside handle
        handle.dragData = event.data.getLocalPosition(handle.parent);
        handle.tint = 0x77f441;
    };

    handle.pointerup = handle.pointerupoutside = event => {
        handle.dragData = false;
        handle.tint = 0xFFFFFF;
    };

    handle.pointermove = event => {
        if(handle.dragData) {
            let newPos = event.data.getLocalPosition(handle.parent);
            // xAdjusted is old handle.x + difference between new and old cursor position
            let xAdjusted = handle.x + newPos.x - handle.dragData.x;
            // using handleWidth because handle.width is for some reason inaccurate
            let endOfLine = line.x + line.width - handleWidth;
            if(xAdjusted < line.x) {
                handle.x = line.x;
            } else if(xAdjusted > endOfLine) {
                handle.x = endOfLine;
            } else {
                handle.x = xAdjusted;
                handle.dragData = newPos;
            }
        }
    };

    slider.addChild(line);
    slider.addChild(handle);
    slider.addChild(desc);

    return slider;
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
