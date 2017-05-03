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
