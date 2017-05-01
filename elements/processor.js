"use strict";

function makeProcessor(items) {
    
    let processor;
    
    // Data to track every frame
    processor.isProcessing = false;
    processor.processTimer = 0;
    processor.recipeProgress = []; // of booleans
    
    // Data that is different for each processor
    processor.x = x;
    processor.y = y;
    processor.timeToProcess;
    processor.recipe = makeRecipe(itemTypes,resultType);
    
    // Required Behaviours
    processor.setup = function() {
        // TODO: makes the sprites and frame and stuff
    }
    
    processor.update = function () {
        // TODO
        // Check if it's not processing
        
            // Check if recipe is complete
                // process the recipe
                    // track timer
                // create output item
            
        // else 
            // Check for item collision
            
            // If collision: check if it's a match
            
            // If match: adjust recipe progress
            // Else waste the item
    }
    
    processor.recipeComplete = function () {
        // TODO: Check if each bool in recipeProgress is true or not
        // returns a bool
    };

    processor.checkMatch = function (itemDraggedIn) {
        // TODO: Check if the item added to processor fits an empty slot on recipe
    }
    
    processor.showTimer = function () {
        // TODO: shows/updates the timer
        // maybe refactor
    }
    
    return processor;
    
}