"use strict";


function Processor(recipeOrder, level) //the Recipe this Processor will produce
{

    //================================================================================
    // Game Functions
    //================================================================================

    //-------------------------------------------------------------------------------
    // On create / Init
    // Variable assignment
    this.Spawn = () => {
        
        this.mTimer = new Timer(level);
        
        // Variable Assignments
        //this.mRequiredIngredients = [];
        this.mNumIngredients = recipeOrder.GetListCount();

        //  --- Sprite related Init  ---

        // First Box
        this.mSpriteProcessor = new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["input.png"]
        );

        // Processor's Origin
        this.mSpriteProcessor.x = this.mPosition.x;
        this.mSpriteProcessor.y = this.mPosition.y;

        // Addes to Scene
        level.scene.addChild(this.mSpriteProcessor);

        // Rendering Processing Trays
        for(let i = 0; i < this.mNumIngredients; ++i)
        {
            // Unsafe (no sprite manager to initilize sprite with set position

            // Spawns Processor's Tray sprites
            this.mSpriteTray[i] = ( new PIXI.Sprite(
                PIXI.loader.resources["images/spritesheet.json"].textures["recipe-waiting.png"]
            ));
            this.mSpriteTray[i].x = (this.mPosition.x + (TILES_PX) + (TILES_PX * (i))); // offsets the pos based off index
            this.mSpriteTray[i].y = (this.mPosition.y);


            // Creates Gears Object
            this.mGears.push(makeGear("s",1));
            // Sets Position
            this.mGears[i].x = this.mSpriteTray[i].x;
            this.mGears[i].y = this.mSpriteTray[i].y - 22;
            // Pushes to Renderer
            level.scene.addChild(this.mGears[i]);

            // Addes to Scene
            level.scene.addChild(this.mSpriteTray[i]);

            // Spawns Ingredient image on top of the tray
            this.mRequiredIngredients[i] = makeItem(recipeOrder.GetList()[i], level);   // Pushes new Item on the list
            this.mRequiredIngredients[i].interactive = false;                               // Not Pressable
            this.mRequiredIngredients[i].alpha = this.mAlphaUnfinished;                                    // Sets the transparancy

            this.mRequiredIngredients[i].x = this.mSpriteTray[i].x + (this.spriteSizeHalf); // Spawns to the center of the tray
            this.mRequiredIngredients[i].y = this.mSpriteTray[i].y + (this.spriteSizeHalf + 67);
            this.bRecipeProgress[i] = false; // Forcefully sets to not completed

        }

        // -- Processor's Width and Height --

        this.mWidth = TILES_PX + TILES_PX*2 +(this.mNumIngredients * (TILES_PX));
        this.mHeight = TILES_PX;

        // -- Last Tray is the Processor output --

        this.mOutputTexture.push(PIXI.loader.resources["images/spritesheet.json"].textures["output.png"]);
        this.mOutputTexture.push(PIXI.loader.resources["images/spritesheet.json"].textures["output-ready.png"]);

        this.mOutputSprite = new PIXI.Sprite(this.mOutputTexture[this.mOutputState.Blue]);

        this.mOutputSprite.x = (this.mPosition.x + (TILES_PX) + (TILES_PX * (this.mNumIngredients))); //array starts at 0
        this.mOutputSprite.y = (this.mPosition.y);


        // Adds to Scene
        level.scene.addChild(this.mOutputSprite);


        // -- Position Timer, center to where processor is at --
        this.mTimer.loadTimer(TILES_PX + this.mOutputSprite.x , TILES_PX + this.mOutputSprite.y);
        this.mCurrentState = this.mProcessorState.Feeding;

    };

    //-------------------------------------------------------------------------------
    // On Update
    this.update = () => {

        // State Updater
        this.UpdateState();

        // State Machine, Acts accordingly to what ever state it is in
        switch(this.mCurrentState)
        {
            case (this.mProcessorState.Feeding): {  // Feeding State
                if(this.bReset) {
                    this.bReset = false;
                }
            }break;

            case (this.mProcessorState.Processing): {   // Processing State
                    let something = 0;
                    // If Timer hasn't been spawned, spawn it.
                    if(!this.bIsTimerSpawned) {
                        PlaySound(eSFXList.ClockTicking, true);
                        this.mTimer.OnSpawn();
                        this.bIsTimerSpawned = true;
                    }

                    this.mTimer.Update();

                    // Spins Gears
                    for(let i = 0; i < this.mGears.length; ++i) {
                        this.mGears[i].update();
                    }

                    //Check for update change
                    this.bIsTimerFinished = this.mTimer.IsFinished();

            }break;

            case (this.mProcessorState.Finished): { // Spawning/Item Check State

                this.mTimer.OnKill();

                if(!this.bIsFinishedSpawning) {
					StopSound(eSFXList.ClockTicking);
                    this.SpawnOutput();
                    this.mOutputSprite.texture = this.mOutputTexture[this.mOutputState.Yellow];
                    this.bIsFinishedSpawning = true;
                }
                else if(this.bOutputEmpty()){
                    this.mOutputSprite.texture = this.mOutputTexture[this.mOutputState.Blue];
                    this.ResetProcessorState();
                    this.bReset = true;     // State Flag
                }
            }break;
        }
    };

    //-------------------------------------------------------------------------------
    // State Checker, Updates state if needed
    this.UpdateState = () => {

        // Feeding State
        if(this.bRecipeCompletion() && this.mCurrentState === this.mProcessorState.Feeding) {
            // State Change -> Processing
            this.mCurrentState = this.mProcessorState.Processing;
        }

        // Processing Timer State
        else if(this.mCurrentState === this.mProcessorState.Processing && this.bIsTimerFinished) {
            this.mCurrentState = this.mProcessorState.Finished;

        }

        // Item Spawning State
        else if(this.mCurrentState === this.mProcessorState.Finished && this.bReset){
            this.mCurrentState = this.mProcessorState.Feeding;
        }

    };


    //================================================================================
    // Acessors
    //================================================================================

    //-------------------------------------------------------------------------------
    // Checks if all the required Recipe Ingredients are added
    this.bRecipeCompletion = () => {
        for (let i = 0; i < this.mNumIngredients; ++i) {
            if(this.bRecipeProgress[i] == false)
                return false;
        }
        return true;
    };

    //-------------------------------------------------------------------------------
    // Checks if the Outputted item has been moved
    this.bOutputEmpty = () => {

        // Because the Player is only allowed one interaction at a time,
        // we can persume he can only do one thing when dragging
        return level.isFinalItem(this.mOutputItem.type) || this.mOutputItem.dragging;
    };

    //-------------------------------------------------------------------------------
    // Collision pass for ingredients Item's center x and y
    this.collidesWithPoint = (x,y) => {

        // Input Box
        let inputLeft = this.mPosition.x; // x1
        let inputRight = this.mPosition.x + (this.mWidth - TILES_PX*2);//x2
        let inputTop = this.mPosition.y; // y1
        let inputBottom = this.mPosition.y + TILES_PX*2; //y2

        // Recipe Boxes
        if(this.mCurrentState === this.mProcessorState.Feeding) {
            return  ( inputLeft < x
            && x < inputRight
            && inputTop < y
            && y < inputBottom);
        }
        // If state is not Feeding, Item's Dragged on Top will still fall
        else {
			PlaySound(eSFXList.Error,false);
            return false;
		}
    };

    //-------------------------------------------------------------------------------
    // Returns State
    this.GetState = () => {
        return this.mCurrentState;
    };

    //================================================================================
    // Mutators
    //================================================================================

    //-------------------------------------------------------------------------------
    // Sets Position of the Compressor
    this.SetPosition = (x,y) => {
        this.mPosition.x = x;
        this.mPosition.y = y;
    };


    //================================================================================
    // Object Functions ( These should be Privated)
    //================================================================================

    //-------------------------------------------------------------------------------
    // Passes Ingredient Object to Processor
    this.addItem = (droppedIngredient) => {
        for(let i = 0; i < this.mNumIngredients; ++i)
        {
            // ! Change to ====
            if(droppedIngredient.type == this.mRequiredIngredients[i].type && !this.bRecipeProgress[i])
            {
                this.mRequiredIngredients[i].alpha = this.mAlphaFinished; //TODO: MAGIC NUMBER
                this.bRecipeProgress[i] = true;
                this.mSpriteTray[i].texture = PIXI.loader.resources["images/spritesheet.json"].textures["recipe-correct.png"];

                level.scene.removeChild(droppedIngredient);
                return true;
            }
        }
        return false;
    };

    //-------------------------------------------------------------------------------
    // Spawns Ingredient
    this.SpawnOutput = () => {

            this.mOutputItem = makeItem(recipeOrder.GetOutput(), level);
            level.addScore(recipeOrder.GetScore());

            this.mOutputItem.x = TILES_PX + this.mOutputSprite.x;
            this.mOutputItem.y = TILES_PX + this.mOutputSprite.y;

			PlaySound(eSFXList.RecipeComplete,false);
			
            if(level.isFinalItem(this.mOutputItem.type)) {
                // TODO: level.poof
                this.mOutputItem.interactive = false;
                this.mOutputItem.fadeAway();
                level.completionData.itemsComplete.push(recipeOrder.GetOutput());
            }
    };

    //------------------------------------------------------------------------------
    // Resets the State of Processor
    this.ResetProcessorState = () => {

        // Resets the Whole Processor's Alpha

        // Resets Tray Ingredient's Alpha, and Progress
        for(let i = 0; i < this.mNumIngredients; ++i)
        {
            this.bRecipeProgress[i] = false;
            this.mRequiredIngredients[i].alpha = this.mAlphaUnfinished;
            this.mSpriteTray[i].texture = PIXI.loader.resources["images/spritesheet.json"].textures["recipe-waiting.png"];
        }

        // Resets Flags
        this.bIsFinishedSpawning = false;   // Spawner Flag
        this.isDone = false;                // State Flag
        this.bIsTimerFinished = false;      // Timer Flag
        this.bIsTimerSpawned = false;
    };

    //================================================================================
    // Object Variables
    //================================================================================

    // Sprites Objects
    this.mSpriteProcessor;      // Processor

    this.mSpriteTray = [];      // Processorr Trays

    this.mOutputTexture = [];   // Process Output
    this.mOutputSprite;

    this.mGears = [];           // Gears / Cogs

    // 80 is TILES_PX, defualt sprite size
    this.spriteSizeHalf = TILES_PX / 2;

    // Enums
    this.mOutputState = { Blue : 0, Yellow : 1};                            // Output State
    this.mProcessorState = { Feeding : 0, Processing : 1, Finished : 2 };   // Processor State

    // Object Variables
    this.mPosition = {x : 0, y : 0};    // Processor Position

    this.mWidth;
    this.mHeight;

    this.mScore = 0;                    // Game Score
    this.mAlphaUnfinished = 0.5;        // Item Incompleted Fade
    this.mAlphaFinished = 0.8;          // Item Completed Fade

    // Ingredients / Item
    this.mRequiredIngredients = [];     // Array of required items
    this.mNumIngredients;               // Total Number of Ingredients
    this.bRecipeProgress = [];          // An array of booleans to check if each seperate ingredients are placed
    this.mOutputItem;                   // Local Variable that holds the output object

    // Timer Object
    this.mTimer;
    this.bIsTimerSpawned = false;
    this.bIsTimerFinished = false;

    // State Variables
    this.mCurrentState;
    this.bReset = false;                // for Processor is completed, Reset Flag
    this.bIsFinishedSpawning = false;   // Flag for item has finished Spawning


}   // End of Class


//==========================================================================================
//==========================================================================================

function Timer(level)
{

    //==========================================================================================
    // Game Functions
    //==========================================================================================

    //-------------------------------------------------------------------------------
    // Stuffs to do on Spawn
    this.OnSpawn = () => {
        level.scene.addChild(this.mCurrentSprite);
        this.mCurrentSprite.scale.set(0.25);
        this.isEntering = true;
    };  // Play Animation

    //-------------------------------------------------------------------------------
    // Stuffs to do on create
    this.Update = () => {

        if(this.isEntering) {
            this.EnteranceAnimation();
        }

        // Don't continue ticking when timer is done.
        if (!this.isTimerFinished) {

            // Increment time
            this.currentTime += TICKER.deltaTime;

            // Check for next tick
            if(this.currentTime >= this.maxFramePerTick) {

                this.currentFrame++; // Increment the frame
                this.mCurrentSprite.texture = this.mSpriteList[this.currentFrame]; // Change the texture
                this.currentTime = 0; //-= this.maxFramePerTick; // Reset ticker
            }

            // Reset on last tick
            if(this.currentFrame == this.maxframe - 1) {
                this.isTimerFinished = true;
                this.currentFrame = 0;
            }
        }
    };

    //-------------------------------------------------------------------------------
    // Stuffs on kill
    this.OnKill = () => {
        level.scene.removeChild(this.mCurrentSprite);
        this.Reset();
        this.jump = 0;
    } ; // Play Animation

    //-------------------------------------------------------------------------------
    // Loads Sprite
    this.loadTimer = (x, y) => {
        this.SetPosition(x,y);
        for (let i = 0; i < this.maxframe; i++) {
            this.mSpriteList.push(
                PIXI.loader.resources["images/spritesheet.json"].textures["stop-watch-icon-hi" + i + ".png"]
            );
        }

        this.mCurrentSprite = new PIXI.Sprite(this.mSpriteList[0]);
        this.mCurrentSprite.position.set(x, y);
        this.mCurrentSprite.anchor.set(0.5);

    };

    //==========================================================================================
    // Accessors
    //==========================================================================================

    //-------------------------------------------------------------------------------
    // Returns a boolean
    this.IsFinished = () => {
        return this.isTimerFinished;
    };

    //==========================================================================================
    // Mutators
    //==========================================================================================

    //-------------------------------------------------------------------------------
    this.SetPosition = (x,y) => {
        this.mPosition.x = x;
        this.mPosition.y = y;
    };

    //==========================================================================================
    // Object Functions (These should be Privated)
    //==========================================================================================

    //-------------------------------------------------------------------------------
    // Resets all the variables
    this.Reset = () => {

        this.currentTime = 0;
        this.currentFrame =  0;

        // Resets Sprite
        this.mCurrentSprite.texture = this.mSpriteList[this.currentFrame];

        this.isTimerFinished = false;
        this.isSpawned = false;

        this.animationFrame = 0;
        this.jump = 0;
        this.scale = 0;
    };

    //-------------------------------------------------------------------------------
    // An Animation for Entry of Timer
    this.EnteranceAnimation = () => {

        // Tick Rate
        this.animationFrame += TICKER.deltaTime * 0.1;

        // First 3 Seconds is Bounce
        //if(this.animationFrame <= 3) {
            // if(this.jump <= 4)
                // this.mCurrentSprite.y--;
            // else if( this.mCurrentSprite.y <= this.mPosition.y)
                // this.mCurrentSprite.y++;

            // this.jump += TICKER.deltaTime * 0.2;

        if(this.animationFrame <= this.totalAnimationFrame) {

            // Slowly Scales back to one to 1
            if(this.animationFrame <= 1)
                this.mCurrentSprite.scale.set(this.animationFrame);
        }
        else
            this.isEntering = false;

    };

    //-------------------------------------------------------------------------------
    // An Animation of Exit of Timer
    this.ExitAnimation = () => {
        // Empty
    };

    //==========================================================================================
    // Memeber Variables
    //==========================================================================================


    // Processing Variables
    this.mCurrentSprite;                    // Current Sprite
    this.mSpriteList = [];                  // List of Sprite
    this.mPosition = {x : 0, y : 0};


    // Timer Variables
    this.maxframe = 8;
    this.totalProcessTime = 180;            // total time it takes for an item to process (3 seconds)

    // Maximum amount of allowed frames in one clock handle
    this.maxFramePerTick = this.totalProcessTime / this.maxframe;

    this.currentTime = 0;
    this.currentFrame =  0;
    this.isTimerFinished = false;
    this.isSpawned = false;


    // Animation Variables
    this.animationFrame = 0;
    this.totalAnimationFrame = 10;
    this.isEntering = false;

    this.jump = 0;
    this.scale = 0;

};

