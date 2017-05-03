"use strict";

// let some kind of enum for ingredients?
let BLANK = 0;
let APPLE = 1;

let ITEM_TEXTURES = [];
let ITEM_TEXTURES[BLANK] = PIXI.loader.resources["images/spritesheet.json"].textures["testblank.png"];
let ITEM_TEXTURES[APPLE] = PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"];

function makeItem(type, x, y) {
    // Define Constants
    let SCENE_HEIGHT_PX = 480;
    let SCENE_WIDTH_PX = 640;
    let SPRITE_SIZE_PX = 32;
    let SPRITE_HALF_PX = SPRITE_SIZE_PX/2;
    
    // TODO: getTextureFromType -> textureStr
    // the argument of textures should be replaced with textureStr after implementing index
    let item = new PIXI.Sprite(
        ITEM_TEXTURES[type]
    );
    
    // Test for blank object
    if(type = BLANK) {
        this.isBlank = true;
    }
    else {
        this.isBLank = false;
    }

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
    item.scale.set(1);

    item.update = function() {
        // Drag and drop
        this.on("pointerdown", this.onDragStart)
            .on("pointerup", this.onDragEnd)
            .on("pointerupoutside", this.onDragEnd)
            .on("pointermove", this.onDragMove);
    };
    item.waste = function() {
        // Change sprite to "wasted" texture, maybe play a sound
        
        console.log("waste");
        // Replace the texture with wasted item later
        this.texture = PIXI.loader.resources["images/spritesheet.json"].textures["banana.png"];
    };
    item.addToProcessor = function() {
        // Adjust the processor and delete the item.
        // Call processor add function later
        console.log("Added to processor");
        // Delete processed ingredients and move it to unseen postion -> search other logic
        stageScene.removeChild(this);
        this.x = 10000;
        this.y = 10000;
    };
    item.addToConveyor = function() {
        // Add item to the conveyor
        // Call conveyor add function later
        console.log("Added to conveyor");
        console.log(conveyorBeltRec.width);
        console.log(conveyorBeltRec.height);
        conveyorBelt.addItemAtIndex(this, conveyorBelt.getIndexFromX(this.x));
    };

    item.onDragStart = function(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
        conveyorBelt.addItemAtIndex(makeTestBlank(), conveyorBelt.getIndexFromX(this.x));
    }
    item.onDragEnd = function() {
        if(testHitRectangle(this, processor) && this.dragging) {
            // addToProcessor on drop collision
            this.addToProcessor();
        } else if(testHitRectangle(this, conveyorBeltRec) && this.dragging) {
            // addToConveyor on drop collision
            this.addToConveyor();
        } else if(testHitRectangle(this, banana) && this.dragging) {
            // Waste on drop collision
            this.waste();
        }

        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }
    item.onDragMove = function() {
        if(this.dragging) {
            // Track x and y
            let newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }
    return item;
}
