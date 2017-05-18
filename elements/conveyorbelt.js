"use strict";

function ConveyorBelt(itemTypes, speed, level) { // <- elements/ingredient.js, states/level.js

    // Define Constants
    let SPRITE_HALF_PX = TILES_PX/2;
    let ARRAY_MIN_SIZE = 17;

    // Define Properties
    this.items = [];
    this.belt = new PIXI.Container();
    this.speed = speed;
    this.deltaX = 0;

    this.lastIndex = itemTypes.length + ARRAY_MIN_SIZE - 4;

    // Define Behaviours
    this.update = () => {

        // Speed this frame
        let frameSpeed = this.speed * TICKER.deltaTime;

        // Move belt forwards

        this.belt.x += frameSpeed;
        for (let i in this.items) {
            this.items[i].x += frameSpeed;      // -> elements/ingredient.js
        }

        // Track change in X
        this.deltaX += frameSpeed;

        // When last item reaches trash can:
        if(this.deltaX >= TILES_PX) {

            // Move belt backwards
            this.belt.x -= TILES_PX;

            // Waste first item if not a blank
            if (this.items[0] != null && this.items[0].type != BLANK) {

                this.items[0].waste();          // -> elements/ingredient.js
                this.items.shift();

                // Check for level completion
                level.isComplete = level.checkForCompletion(); // states/levels.js

            }
            // Otherwise just remove from stage entirely.
            else {
                level.scene.removeChild(this.items[0]);
                this.items.shift();
            }

            // Reset Delta
            this.deltaX -= TILES_PX;

            // Add a blank to the end
            this.addItemAtIndex(makeItem(BLANK, level), this.lastIndex);
        }
    }

    // Adds an item to the array
    this.addItemAtIndex = (item, index) => {

        // Remove previous blank
        if(this.items[index] != null && this.items[index].type == BLANK) {
            level.scene.removeChild(this.items[index]);
        }

        // Position
        // At bottom of screen
        item.y = CANVAS_HEIGHT - SPRITE_HALF_PX;

        // Normalize to near bottom right corner
        item.x = CANVAS_WIDTH + this.deltaX - TILES_PX*2;

        // Shift left by index
        item.x -= TILES_PX * index;

        // Copy in
        this.items[index] = item;
    }

    // Returns an index based on an X position
    this.getIndexFromX = (x) => {
        return Math.floor((CANVAS_WIDTH - SPRITE_HALF_PX + this.deltaX - x) / TILES_PX) - 1;
    }

    // Returns an item based on index
    this.getItemAtX = (x) => {
        return this.items[this.getIndexFromX(x)];
    }

    // Adds an item based on an x position
    this.addItemAtX = (item, x) => {
        this.addItemAtIndex(item, this.getIndexFromX(x));
    }

    // Point Collision
    this.collidesWithPoint = (x,y) => {
        return (0 <= x && x <= CANVAS_WIDTH - TILES_PX) && (CANVAS_HEIGHT - TILES_PX <= y && y <= CANVAS_HEIGHT);
    }

    // Finish Constructor

    // Pad array and construct belt
    for(let i = 0; i < ARRAY_MIN_SIZE; i++) {
        if (i <= ARRAY_MIN_SIZE - 3) {
            this.addItemAtIndex(makeItem(BLANK, level), i); // -> elements/ingredient.js
        }

        let beltTile = new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["conveyor-belt.png"]
        );

        beltTile.y = CANVAS_HEIGHT - TILES_PX;
        beltTile.x = CANVAS_WIDTH - TILES_PX;
        beltTile.x -= TILES_PX * i;
        this.belt.addChild(beltTile);
    }
    
    
                
    if(!PPAP_UNLOCKED) {
        // PPAP
        let pen = new PIXI.Sprite(ITEM_TEXTURES[PEN]);
        pen.anchor.set(0.5);
        pen.interactive = true;
        pen.buttonMode = true;
        pen.x = CANVAS_WIDTH - 0.5 * TILES_PX;;
        pen.y = CANVAS_HEIGHT - 60;
        level.scene.addChild(pen);
        
            
        pen.onDragStart = (event) => {
            if (!level.itemPickedUp) { // -> states/levels.js
                PlaySound(eSFXList.ItemPickUp, false);
                pen.data = event.data;
                pen.alpha = 0.5;
                pen.dragging = true;
                level.itemPickedup = true;
            }
        };
        
        pen.onDragMove = () => {
            if(pen.dragging) {
                // Track x and y
                let newPosition = pen.data.getLocalPosition(pen.parent);
                pen.x = newPosition.x;
                pen.y = newPosition.y;
            }
        };
        
        pen.onDragEnd = () => {

            if(pen.dragging) {
                if (pen.x < TILES_PX && pen.y < TILES_PX) {
                    PlaySound(eSFXList.IntoProcessor, false);
                    level.scene.removeChild(pen);
                    LEVELS.push(PPAP);
                    LEVEL_PROGRESS.push({
                        unlocked: true,
                        highscore: 0
                    });
                    PPAP_UNLOCKED = true;
                }
                
                PlaySound(eSFXList.ItemDropped, false);
                this.itemPickedup = false;
            }
        
            // Reset visuals and flag
            pen.alpha = 1;
            pen.dragging = false;
            pen.data = null;
            
        };
        
        // Declare event handlers
        pen.on('pointerdown', pen.onDragStart)
            .on('pointerup', pen.onDragEnd)
            .on('pointerupoutside', pen.onDragEnd)
            .on('pointermove', pen.onDragMove);
    
    }
    
    // Trash Pit
    let trashPit = new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["trash-pit.png"]
    );
    trashPit.anchor.set(0.5);
    trashPit.y = CANVAS_HEIGHT - 40;
    trashPit.x = CANVAS_WIDTH - 48;

    // Add belt background
    level.scene.addChild(this.belt);

    // Add trash pit
    level.scene.addChild(trashPit);

    // Fill out rest of conveyor
    for(let i = 0; i < itemTypes.length; i++) {
        this.addItemAtIndex(makeItem(itemTypes[i], level), i + ARRAY_MIN_SIZE - 3); // -> elements/ingredient.js
    }
}
