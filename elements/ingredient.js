"use strict";
// let some kind of enum for ingredients?
let BLANK = 0;
let APPLE = 1;
let BANANA = 2;

function makeItem(type, x, y) {
    // Define Constants
    let SCENE_HEIGHT_PX = 480;
    let SCENE_WIDTH_PX = 640;
    let SPRITE_SIZE_PX = 32;
    let SPRITE_HALF_PX = SPRITE_SIZE_PX/2;

    //Texture dictionary
    let ITEM_TEXTURES = [];
    ITEM_TEXTURES[BLANK] = PIXI.loader.resources["images/spritesheet.json"].textures["testblank.png"];
    ITEM_TEXTURES[APPLE] = PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"];
    ITEM_TEXTURES[BANANA] = PIXI.loader.resources["images/spritesheet.json"].textures["banana.png"];
    
    // the argument of textures should be replaced with textureStr after implementing index
    let item = new PIXI.Sprite(
        ITEM_TEXTURES[type]
    );

    // Data that needs to be tracked every frame
    item.x = x;
    item.y = y;
    item.dragging = false;
    
    // Data that is different for each ingredient
    item.type = type;
    
    // Behaviours that we need the object to do
    item.interactive = true;
    item.buttonMode = true;
    item.anchor.set(0.5);
    
    item.waste = function() {
        item.texture = ITEM_TEXTURES[BANANA];
    };
    
    item.addToProcessor = function() {
        // TODO
    };

    item.onDragStart = function(event) {
        item.data = event.data;
        item.alpha = 0.5;
        item.dragging = true;
        if (conveyorBelt.collidesWithPoint(item.x, item.y)) {
            conveyorBelt.addItemAtX(makeItem(BLANK), item.x);
        }
    };
    
    item.onDragEnd = function(event) {
        
        if (item.dragging) {
            // addToConveyor if on conveyor
            if (conveyorBelt.collidesWithPoint(item.x, item.y) && conveyorBelt.getItemAtX(item.x).type == BLANK) {
                conveyorBelt.addItemAtX(item, item.x);
            }
            // else waste
            else {
                item.waste();
            }
        }
        item.alpha = 1;
        item.dragging = false;
        item.data = null;
    };
    
    item.onDragMove = function() {
        if(item.dragging) {
            // Track x and y
            let newPosition = item.data.getLocalPosition(item.parent);
            item.x = newPosition.x;
            item.y = newPosition.y;
        }
    };
    
    // Drag and drop
    item
        .on('pointerdown', item.onDragStart)
        .on('pointerup', item.onDragEnd)
        .on('pointerupoutside', item.onDragEnd)
        .on('pointermove', item.onDragMove);
    
    if (item.type == BLANK) {
        stageScene.addChildAt(item, 1);
    }
    else {
        stageScene.addChild(item);
    }

    return item;
}
