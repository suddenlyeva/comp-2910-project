"use strict";

// Itemdex
let BLANK = 0;
let SPLAT = 1;
let APPLE = 2;
let APPLE_SLICE = 3;
let BANANA = 4;
let ORANGE = 5;
let ORANGE_SLICE = 6;
let KIWI = 7;
let KIWI_SLICE = 8;
let YOGURT = 9;
let FRUIT_YOGURT = 10;

// Makes an item in the level
function makeItem(type, level) { // <- states/levels.js

    // Texture dictionary
    // TODO: JSON solution for this?
    let ITEM_TEXTURES = [];
    ITEM_TEXTURES[SPLAT] = PIXI.loader.resources["images/spritesheet.json"].textures["splat.png"];
    ITEM_TEXTURES[BLANK] = PIXI.loader.resources["images/spritesheet.json"].textures["blank.png"];
    ITEM_TEXTURES[APPLE] = PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"];
    ITEM_TEXTURES[APPLE_SLICE] = PIXI.loader.resources["images/spritesheet.json"].textures["apple-slice.png"];
    ITEM_TEXTURES[BANANA] = PIXI.loader.resources["images/spritesheet.json"].textures["banana.png"];
    ITEM_TEXTURES[ORANGE] = PIXI.loader.resources["images/spritesheet.json"].textures["orange.png"];
    ITEM_TEXTURES[ORANGE_SLICE] = PIXI.loader.resources["images/spritesheet.json"].textures["orange-slice.png"];
    ITEM_TEXTURES[KIWI] = PIXI.loader.resources["images/spritesheet.json"].textures["kiwi.png"];
    ITEM_TEXTURES[KIWI_SLICE] = PIXI.loader.resources["images/spritesheet.json"].textures["kiwi-slice.png"];
    ITEM_TEXTURES[YOGURT] = PIXI.loader.resources["images/spritesheet.json"].textures["yogurt.png"];
    ITEM_TEXTURES[FRUIT_YOGURT] = PIXI.loader.resources["images/spritesheet.json"].textures["fruit-yogurt.png"];

    // Create the Sprite
    let item = new PIXI.Sprite(
        ITEM_TEXTURES[type]
    );
    item.buttonMode = true;
    item.anchor.set(0.5);

    // Data that is different for each ingredient
    item.type = type;
    item.interactive = item.type > SPLAT; // Kind of hacky, index non interactive items to less than SPLAT

    // Data that needs to be tracked every frame
    item.dragging = false;

    // Behaviours that we need the object to do

    // Turns the item into waste.
    item.waste = () => {
        level.completionData.waste++;   // -> states/levels.js
        level.updateWasteInfo();        // -> states/levels.js
        item.texture = ITEM_TEXTURES[SPLAT];
        item.interactive = false;
    };

    // Item fades into the air
    item.fadeAway = () => {

        // Make backing object
        let fadeAwaySprite = new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["fade-backing.png"]
        );
        level.scene.addChild(fadeAwaySprite);
        fadeAwaySprite.anchor.set(0.5);
        fadeAwaySprite.position.set(item.x, item.y);

        //Resort on scene
        level.scene.removeChild(item);
        level.scene.addChild(item);

        // For asynchronous animation
        let fadeAwayTicker = new PIXI.ticker.Ticker();
        let alphaTimeOut = 60; // 1 second

        fadeAwayTicker.add( (delta) => {

            // Float Up
            fadeAwaySprite.y -= delta;
            item.y -= delta;

            // Fade Out
            alphaTimeOut -= delta;
            if (alphaTimeOut <= 0) {
                fadeAwaySprite.alpha -= 0.02 * delta
                item.alpha -= 0.02 * delta;
            }

            // Kill after faded out.
             if (fadeAwaySprite.alpha <= 0.02) {
                 level.scene.removeChild(fadeAwaySprite);
                 level.scene.removeChild(item);
                 fadeAwayTicker.destroy();
             }
        });

        fadeAwayTicker.start();
    };

    // When the item is clicked.
    item.onDragStart = (event) => {
        if(!level.isComplete) { // -> states/levels.js
            sounds["sounds/item-pickup.wav"].play();
            item.data = event.data;
            item.alpha = 0.5;
            item.dragging = true;

            // Replace previous conveyor item with a blank
            if (level.conveyorBelt.collidesWithPoint(item.x, item.y)) {         // -> elements/conveyorbelt.js
                level.conveyorBelt.addItemAtX(makeItem(BLANK, level), item.x);  // -> elements/conveyorbelt.js
            }
        }
    };

    // When you let go of the item
    item.onDragEnd = (event) => {

        // Only if it was picked up
        if (item.dragging) {

            // addToConveyor if on conveyor
            if (level.conveyorBelt.collidesWithPoint(item.x, item.y) && // -> elements/conveyorbelt.js
                level.conveyorBelt.getItemAtX(item.x) != null &&
                level.conveyorBelt.getItemAtX(item.x).type == BLANK) {  // -> elements/conveyorbelt.js
                level.conveyorBelt.addItemAtX(item, item.x);            // -> elements/conveyorbelt.js
            }
            else {

                let addedToProcessor = false;

                // Add to a processor if on one of those
                for (let i in level.processors) {
                    if (level.processors[i].collidesWithPoint(item.x, item.y)) {    // -> elements/processor.js
                        addedToProcessor = level.processors[i].addItem(item);       // -> elements/processor.js
                    }
                }

                // else waste
                if(!addedToProcessor) {
                    sounds["sounds/splat.wav"].play();
                    item.waste();
                }
            }

            level.isComplete = level.checkForCompletion(); // -> states/levels.js
        }

        // Reset visuals and flag
        item.alpha = 1;
        item.dragging = false;
        item.data = null;
    };

    // When you drag the item around
    item.onDragMove = () => {
        if(item.dragging) {
            // Track x and y
            let newPosition = item.data.getLocalPosition(item.parent);
            item.x = newPosition.x;
            item.y = newPosition.y;
        }
    };

    // Declare event handlers
    item.on('pointerdown', item.onDragStart)
        .on('pointerup', item.onDragEnd)
        .on('pointerupoutside', item.onDragEnd)
        .on('pointermove', item.onDragMove);

    // Add to scene
    level.scene.addChild(item);

    // Return to caller
    return item;
}
