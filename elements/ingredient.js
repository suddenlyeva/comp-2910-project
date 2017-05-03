"use strict";

// let some kind of enum for ingredients?

function makeItem(type, x, y) {
    
    // TODO: getTextureFromType -> textureStr
    // the argument of textures should be replaced with textureStr after implementing index
    let item = new PIXI.Sprite(
        PIXI.loader.resources["images/spritesheet.json"].textures[type]
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
    };

    item.onDragStart = function(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }
    item.onDragEnd = function() {
        if(testHitRectangle(this, processor) && this.dragging) {
            // addToProcessor on drop collision
            this.addToProcessor();
        } else if(testHitRectangle(this, conveyor) && this.dragging) {
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
