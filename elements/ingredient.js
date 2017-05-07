"use strict";
// let some kind of enum for ingredients?
let BLANK = 0;
let SPLAT = 1;
let APPLE = 2;
let APPLE_SLICE = 3;
let BANANA = 4;

function makeItem(type, level) {

    //Texture dictionary
    let ITEM_TEXTURES = [];
    ITEM_TEXTURES[SPLAT] = PIXI.loader.resources["images/spritesheet.json"].textures["splat.png"];
    ITEM_TEXTURES[BLANK] = PIXI.loader.resources["images/spritesheet.json"].textures["testblank.png"];
    ITEM_TEXTURES[APPLE] = PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"];
    ITEM_TEXTURES[APPLE_SLICE] = PIXI.loader.resources["images/spritesheet.json"].textures["apple-slice.png"];
    ITEM_TEXTURES[BANANA] = PIXI.loader.resources["images/spritesheet.json"].textures["banana.png"];
    
    // the argument of textures should be replaced with textureStr after implementing index
    let item = new PIXI.Sprite(
        ITEM_TEXTURES[type]
    );
    
    // Data that needs to be tracked every frame
    item.dragging = false;
    
    // Data that is different for each ingredient
    item.type = type;
    
    // Behaviours that we need the object to do
    item.interactive = item.type > SPLAT; // Kind of hacky, index non interactive items to less than SPLAT
    item.buttonMode = true;
    item.anchor.set(0.5);
    
	
    item.waste = () => {
        item.texture = ITEM_TEXTURES[SPLAT];
		item.interactive = false;
    };

    item.onDragStart = (event) => {
        item.data = event.data;
        item.alpha = 0.5;
        item.dragging = true;
        if (level.conveyorBelt.collidesWithPoint(item.x, item.y)) {
            level.conveyorBelt.addItemAtX(makeItem(BLANK, level), item.x);
        }
    };
    
    item.onDragEnd = (event) => {
        
        if (item.dragging) {
            // addToConveyor if on conveyor
            if (level.conveyorBelt.collidesWithPoint(item.x, item.y) && level.conveyorBelt.getItemAtX(item.x).type == BLANK) {
                level.conveyorBelt.addItemAtX(item, item.x);
            }
            else {
                // Check collision with processors
                for (let i in level.processors) {
                    if (level.processors[i].collidesWithPoint(item.x, item.y)) {
                        level.processors[i].addItem(item);
                    }
                }
                // else waste
                item.waste();
            }
		
			level.isComplete = level.checkForCompletion();
        }
		
        item.alpha = 1;
        item.dragging = false;
        item.data = null;
    };
    
    item.onDragMove = () => {
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
    
    // Z-Layer Control, 1 is just over background.
    if (item.type == BLANK) {
        level.scene.addChildAt(item, 1);
    }
    else {
        level.scene.addChild(item);
    }

    return item;
}
