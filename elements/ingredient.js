"use strict";

// let some kind of enum for ingredients?

function makeItem(type, x, y) {
    
    // TODO: getTextureFromType -> textureStr
    
    let item = new PIXI.Sprite(
        PIXI.loader.resources["images/spritesheet.json"].textures[textureStr]
    );
    
    // Data that needs to be tracked every frame
    item.x = x;
    item.y = y;
    item.isDropped = false;
    item.isPickedUp = false;
    
    // Data that is different for each ingredient
    item.type = type;
    
    // Behaviours that we need the object to do
    item.update = function() {
        // TODO
        
        // Track x and y
        
        // Drag and drop
        
        // Waste on drop collision
        
        // addToProcessor on drop collision
    };
    
    item.waste = function() {
        // Change sprite to "wasted" texture, maybe play a sound
    };
    
    item.addToProcessor = function() {
        // Adjust the processor and delete the item.
    };
    
    return item;
}