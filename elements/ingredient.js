"use strict";

// Itemdex
let BLANK          =  0;
let SPLAT          =  1;
let APPLE          =  2;
let APPLE_SLICE    =  3;
let BANANA         =  4;
let ORANGE         =  5;
let ORANGE_SLICE   =  6;
let KIWI           =  7;
let KIWI_SLICE     =  8;
let YOGURT         =  9;
let FRUIT_YOGURT   = 10;
let PINEAPPLE      = 11;
let FLOUR          = 12;
let PIE            = 13;
let BREAD          = 14;
let FISH           = 15;
let FISH_STEAK     = 16;
let FISH_SOUP      = 17;
let FRIED_FISH     = 18;
let CHICKEN        = 19;
let CHICKEN_LEG    = 20;
let CHICKEN_COOKED = 21;
let CHEESE         = 22;
let CHEESE_SLICE   = 23;
let MILK           = 24;
let EGGS           = 25;
let FRIED_EGG      = 26;
let LOBSTER        = 27;
let LOBSTER_BOILED = 28;
let LOBSTER_SOUP   = 29;
let CABBAGE        = 30;
let CABBAGE_SLICE  = 31;
let TOMATO         = 32;
let TOMATO_SLICE   = 33;
let SALAD          = 34;
let SALAD_2        = 35;
let OCTOPUS        = 36;
let CUCUMBER       = 37;
let CUCUMBER_SLICE = 38;
let RICE           = 40;
let NORI           = 41;
let SUSHI_ROLL     = 43;
let ONIGIRI        = 44;
let SANDWICH       = 45;
let FRUIT_PORRIDGE = 46;
let MEAT           = 47;
let MEAT_2         = 48;
let MEAT_3         = 49;
let STEAK          = 50;
let APPLE_PIE      = 51;
let WHEAT          = 52;

let PEN            = 98;
let PPAP_ITEM      = 99;


// Texture dictionary
let ITEM_TEXTURES = [];
function defineItemTextures() {
    ITEM_TEXTURES[SPLAT]          = PIXI.loader.resources["images/spritesheet.json"].textures["splat.png"];
    ITEM_TEXTURES[BLANK]          = PIXI.loader.resources["images/spritesheet.json"].textures["blank.png"];
    ITEM_TEXTURES[APPLE]          = PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"];
    ITEM_TEXTURES[APPLE_SLICE]    = PIXI.loader.resources["images/spritesheet.json"].textures["apple-slice.png"];
    ITEM_TEXTURES[BANANA]         = PIXI.loader.resources["images/spritesheet.json"].textures["banana.png"];
    ITEM_TEXTURES[ORANGE]         = PIXI.loader.resources["images/spritesheet.json"].textures["orange.png"];
    ITEM_TEXTURES[ORANGE_SLICE]   = PIXI.loader.resources["images/spritesheet.json"].textures["orange-slice.png"];
    ITEM_TEXTURES[KIWI]           = PIXI.loader.resources["images/spritesheet.json"].textures["kiwi.png"];
    ITEM_TEXTURES[KIWI_SLICE]     = PIXI.loader.resources["images/spritesheet.json"].textures["kiwi-slice.png"];
    ITEM_TEXTURES[YOGURT]         = PIXI.loader.resources["images/spritesheet.json"].textures["yogurt.png"];
    ITEM_TEXTURES[FRUIT_YOGURT]   = PIXI.loader.resources["images/spritesheet.json"].textures["fruit-yogurt.png"];
    ITEM_TEXTURES[PINEAPPLE]      = PIXI.loader.resources["images/spritesheet.json"].textures["pineapple.png"];
    ITEM_TEXTURES[PEN]            = PIXI.loader.resources["images/spritesheet.json"].textures["pen.png"];
    ITEM_TEXTURES[PPAP_ITEM]      = PIXI.loader.resources["images/spritesheet.json"].textures["ppap.png"];
    ITEM_TEXTURES[FLOUR]          = PIXI.loader.resources["images/food.json"].textures["flour.png"];
    ITEM_TEXTURES[PIE]            = PIXI.loader.resources["images/food.json"].textures["applepie.png"];
    ITEM_TEXTURES[BREAD]          = PIXI.loader.resources["images/food.json"].textures["bread.png"];
    ITEM_TEXTURES[FISH]           = PIXI.loader.resources["images/food.json"].textures["fish_2.png"];
    ITEM_TEXTURES[FISH_STEAK]     = PIXI.loader.resources["images/food.json"].textures["fish_steak.png"];
    ITEM_TEXTURES[FISH_SOUP]      = PIXI.loader.resources["images/food.json"].textures["fish_soup.png"];
    ITEM_TEXTURES[FRIED_FISH]     = PIXI.loader.resources["images/food.json"].textures["Fried_fish.png"];
    ITEM_TEXTURES[CHICKEN]        = PIXI.loader.resources["images/food.json"].textures["chicken.png"];
    ITEM_TEXTURES[CHICKEN_LEG]    = PIXI.loader.resources["images/food.json"].textures["leg_chicken.png"];
    ITEM_TEXTURES[CHICKEN_COOKED] = PIXI.loader.resources["images/food.json"].textures["grilled_chicken.png"];
    ITEM_TEXTURES[CHEESE]         = PIXI.loader.resources["images/food.json"].textures["cheese_2.png"];
    ITEM_TEXTURES[CHEESE_SLICE]   = PIXI.loader.resources["images/food.json"].textures["cheese.png"];
    ITEM_TEXTURES[MILK]           = PIXI.loader.resources["images/food.json"].textures["milk.png"];
    ITEM_TEXTURES[EGGS]           = PIXI.loader.resources["images/food.json"].textures["eggs.png"];
    ITEM_TEXTURES[FRIED_EGG]      = PIXI.loader.resources["images/food.json"].textures["omelette.png"];
    ITEM_TEXTURES[LOBSTER]        = PIXI.loader.resources["images/food.json"].textures["lobster.png"];
    ITEM_TEXTURES[LOBSTER_BOILED] = PIXI.loader.resources["images/food.json"].textures["boiled_lobster.png"];
    ITEM_TEXTURES[LOBSTER_SOUP]   = PIXI.loader.resources["images/food.json"].textures["lobster_soup.png"];
    ITEM_TEXTURES[CABBAGE]        = PIXI.loader.resources["images/food.json"].textures["cabbage.png"];
    ITEM_TEXTURES[CABBAGE_SLICE]  = PIXI.loader.resources["images/food.json"].textures["salad.png"];
    ITEM_TEXTURES[TOMATO]         = PIXI.loader.resources["images/food.json"].textures["tomato.png"];
    ITEM_TEXTURES[TOMATO_SLICE]   = PIXI.loader.resources["images/food.json"].textures["tomato.png"];
    ITEM_TEXTURES[SALAD]          = PIXI.loader.resources["images/food.json"].textures["salad_2.png"];
    ITEM_TEXTURES[SALAD_2]        = PIXI.loader.resources["images/food.json"].textures["salad_3.png"];
    ITEM_TEXTURES[OCTOPUS]        = PIXI.loader.resources["images/food.json"].textures["octopulus.png"];
    ITEM_TEXTURES[CUCUMBER]       = PIXI.loader.resources["images/food.json"].textures["cucumber .png"];
    ITEM_TEXTURES[CUCUMBER_SLICE] = PIXI.loader.resources["images/food.json"].textures["cucumber .png"];
    ITEM_TEXTURES[RICE]           = PIXI.loader.resources["images/food.json"].textures["rice.png"];
    ITEM_TEXTURES[NORI]           = PIXI.loader.resources["images/food.json"].textures["nori.png"];
    ITEM_TEXTURES[SUSHI_ROLL]     = PIXI.loader.resources["images/food.json"].textures["rolls.png"];
    ITEM_TEXTURES[ONIGIRI]        = PIXI.loader.resources["images/food.json"].textures["onigiri.png"];
    ITEM_TEXTURES[SANDWICH]       = PIXI.loader.resources["images/food.json"].textures["sandwich.png"];
    ITEM_TEXTURES[FRUIT_PORRIDGE] = PIXI.loader.resources["images/food.json"].textures["fruit_porridge.png"];
    ITEM_TEXTURES[MEAT]           = PIXI.loader.resources["images/food.json"].textures["meat_1.png"];
    ITEM_TEXTURES[MEAT_2]         = PIXI.loader.resources["images/food.json"].textures["meat_2.png"];
    ITEM_TEXTURES[MEAT_3]         = PIXI.loader.resources["images/food.json"].textures["meat_3.png"];
    ITEM_TEXTURES[STEAK]          = PIXI.loader.resources["images/food.json"].textures["steak.png"];
/*!*/  ITEM_TEXTURES[APPLE_PIE]        = PIXI.loader.resources["images/food.json"].textures["applepie.png"];
/*!*/  ITEM_TEXTURES[WHEAT]          = PIXI.loader.resources["images/food.json"].textures["flour.png"];
    // Use PIXI.loader.resources["images/food.json"].textures["*.png"]; for new sprites.
}

// Makes an item in the level
function makeItem(type, level) { // <- states/levels.js

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
        PlaySound(eSFXList.Splat, false); // -> sfx.js
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

        //Re-sort on scene
        level.scene.removeChild(item);
        level.scene.addChild(item);

        // For asynchronous animation
        let fadeAwayTicker = new PIXI.ticker.Ticker();
        let alphaTimeOut = 60; // 1 second

        fadeAwayTicker.add( (delta) => {

            // Float Up
            fadeAwaySprite.y -= delta;
            item.y           -= delta;

            // Fade Out
            alphaTimeOut     -= delta;
            if (alphaTimeOut <= 0) {
                fadeAwaySprite.alpha -= 0.02 * delta
                item.alpha           -= 0.02 * delta;
            }

            // Kill after faded out.
             if (fadeAwaySprite.alpha <= 0.02) {
                 fadeAwaySprite.destroy();
                 item          .destroy();
                 fadeAwayTicker.destroy();
             }
        });

        fadeAwayTicker.start();
    };

    // When the item is clicked.
    item.onDragStart = (event) => {

        if (!level.itemPickedUp) { // -> states/levels.js

            PlaySound(eSFXList.ItemPickUp, false); // -> sfx.js
            item.data          = event.data;
            item.alpha         = 0.5;
            item.dragging      = true;
            level.itemPickedup = true; // -> states/levels.js

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

                // Loop result holders
                let addedToProcessor = false;
                let collidedWithProcessor = false;

                // Add to a processor if on one of those
                for (let i = 0; !collidedWithProcessor && i < level.processors.length; i++) {
                    if (level.processors[i].collidesWithPoint(item.x, item.y)) {    // -> elements/processor.js
                        addedToProcessor      = level.processors[i].addItem(item);  // -> elements/processor.js
                        collidedWithProcessor = true;
                    }
                }

                // Error sound when dropped on processor but not added
                if (collidedWithProcessor && !addedToProcessor){
                    PlaySound(eSFXList.Error, false); // -> sfx.js
                }

                // Waste item if not added
                if(!addedToProcessor) {
                    item.waste();
                }
                // Play a sound if it was added
                else {
                    PlaySound(eSFXList.IntoProcessor, false); // -> sfx.js
                }
            }
            PlaySound(eSFXList.ItemDropped, false); // -> sfx.js
            level.itemPickedup = false;
            level.isComplete = level.checkForCompletion(); // -> states/levels.js
        }

        // Reset visuals and flag
        item.alpha    = 1;
        item.dragging = false;
        item.data     = null;
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
    item.on('pointerdown'     , item.onDragStart)
        .on('pointerup'       , item.onDragEnd)
        .on('pointerupoutside', item.onDragEnd)
        .on('pointermove'     , item.onDragMove);

    // Add to scene
    level.scene.addChild(item);

    // Return to caller
    return item;
}
