"use strict";
// let some kind of enum for ingredients?
let BLANK = 0;
let APPLE = 1;

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

    
    
    item.update = function() {
        
    };
    
    item.waste = function() {
        // Change sprite to "wasted" texture, maybe play a sound
        
        console.log("waste");
        // Replace the texture with wasted item later
        item.visible = false;

    };
    item.addToProcessor = function() {
        // Adjust the processor and delete the item.
        // Call processor add function later
        console.log("Added to processor");
        // Delete processed ingredients and move it to unseen postion -> search other logic
        stageScene.removeChild(item);
    };
    item.addToConveyor = function() {
        // Add item to the conveyor
        // Call conveyor add function later
        console.log("Added to conveyor");
        console.log(conveyorBeltRec.width);
        console.log(conveyorBeltRec.height);
        conveyorBelt.addItemAtX(item, item.x);
    };

    item.onDragStart = function(event) {
        console.log("event");
        item.data = event.data;
        item.alpha = 0.5;
        item.dragging = true;
        if (conveyorBelt.collidesWithPoint(item.x, item.y)) {
            conveyorBelt.addItemAtX(makeItem(BLANK), item.x);
        }
    }
    item.onDragEnd = function() {
        if(testHitRectangle(item, processor)) {
            // addToProcessor on drop collision
            this.addToProcessor();
        } else if(conveyorBelt.collidesWithPoint(item.x, item.y) && item.dragging) {
            // addToConveyor on drop collision
            item.addToConveyor();
        } else if(item.type != BLANK) {
            // Waste on drop collision
            item.waste();
        }

        item.alpha = 1;
        item.dragging = false;
        item.data = null;
    }
    item.onDragMove = function() {
        if(item.dragging) {
            // Track x and y
            let newPosition = item.data.getLocalPosition(item.parent);
            item.x = newPosition.x;
            item.y = newPosition.y;
        }
    }
    
    // Drag and drop
    item.on("pointerdown", item.onDragStart)
        .on("pointerup", item.onDragEnd)
        .on("pointermove", item.onDragMove);
    
    if (item.type == BLANK) {
        stageScene.addChildAt(item, 1);
    }
    else {
        stageScene.addChild(item);
    }

    return item;
}
