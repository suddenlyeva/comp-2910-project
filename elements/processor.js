"use strict";

function Processor(recipeOrder, level) //the Recipe this Processor will produce 
{

	//-------------------------------------------------------------------------------
	// Memeber functions
	//-------------------------------------------------------------------------------
	
	//-------------------------------------------------------------------------------
	// Sets Position of the Compressor
	this.SetPosition = (x,y) => {
		this.mPositionX = x;
		this.mPositionY = y;
	};
	
	//-------------------------------------------------------------------------------
	// On create / Init
	// Variable assignment
	this.Spawn = () => {	
	
		// Variable Assignments
		//this.requiredIngredients = [];
		this.numIngredients = recipeOrder.GetListCount();

	
		//  --- Sprite related Init  ---
	
		// Sprite Handler should be placed here
		this.mSpriteProcessor = new PIXI.Sprite(
			PIXI.loader.resources["images/spritesheet.json"].textures["input.png"]
		);
		
		// Should be defined later
		this.mSpriteProcessor.x = this.mPositionX;
		this.mSpriteProcessor.y = this.mPositionY;
		
		// Rendering Processing Trays
		for(let i = 0; i < this.numIngredients; ++i)
		{
			// Unsafe (no sprite manager to initilize sprite with set position
			
			// Spawns Processor's Tray sprites
			this.mSpriteTray[i] = ( new PIXI.Sprite(
				PIXI.loader.resources["images/spritesheet.json"].textures["recipe-waiting.png"]
			));
			this.mSpriteTray[i].x = (this.mPositionX + (TILES_PX*2) + (TILES_PX * (i))); // offsets the pos based off index
			this.mSpriteTray[i].y = (this.mPositionY + TILES_PX);
			
			level.scene.addChild(this.mSpriteTray[i]);		// Pushes this to the scene, Explicit because apple's render function is called on init

			// Spawns the Ingredients ontop of the tray
			this.requiredIngredients[i] = makeItem(recipeOrder.GetList()[i], level);	// Pushes new Item on the list
			this.requiredIngredients[i].interactive = false;								// Not Pressable
			this.requiredIngredients[i].alpha = this.alpha;									// Sets the transparancy
			
			this.requiredIngredients[i].x = this.mSpriteTray[i].x + (this.spriteSizeHalf);	// Spawns to the center of the tray
			this.requiredIngredients[i].y = this.mSpriteTray[i].y + (this.spriteSizeHalf);
			this.recipeProgress[i] = false; // Forcefully sets to not completed
			
		}
		
		// Last Tray is the Processor output
		this.mSpriteOutput = new PIXI.Sprite(
			PIXI.loader.resources["images/spritesheet.json"].textures["output.png"]
		);
		this.mSpriteOutput.x = (this.mPositionX + (TILES_PX*2) + (TILES_PX * (this.numIngredients))); //array starts at 0
		this.mSpriteOutput.y = (this.mPositionY);
		
		// Addes Tray Sprites to stage
		level.scene.addChild(this.mSpriteProcessor);
		level.scene.addChild(this.mSpriteOutput);
		
		
		this.currentState = this.ProcessorState.Feeding;

	};
	
	//-------------------------------------------------------------------------------
	// Collision pass for ingredients Item's center x and y
	this.collidesWithPoint = (x,y) => {
		
		// Input Box
		let inputLeft = this.mPositionX;
		let inputRight = this.mPositionX + TILES_PX*2;
		let inputTop = this.mPositionY;
		let inputBottom = this.mPositionY + TILES_PX*2;
		
		// Recipe Boxes
		let boundingboxX = this.mPositionX + TILES_PX*2; // top left
		let boundingboxY = this.mPositionY + TILES_PX; 	 // top 
		let boundingboxUpperLimitX = boundingboxX + (TILES_PX * this.numIngredients); //top right
		let boundingboxUpperLimitY = boundingboxY + TILES_PX; //bottom
		if(this.currentState === this.ProcessorState.Feeding) {
			return 	( inputLeft < x && x < inputRight && inputTop < y && y < inputBottom) ||
				( boundingboxX < x && x < boundingboxUpperLimitX && boundingboxY < y && y < boundingboxUpperLimitY);
		}
		// If state is not Feeding, Item's Dragged on Top will still fall
		else
			return false;
		
    };
	
	//-------------------------------------------------------------------------------
	// Passes Ingredient Object to Processor
	this.addItem = (droppedIngredient) => {
		for(let i = 0; i < this.numIngredients; ++i)
		{
			// ! Change to ====
			if(droppedIngredient.type == this.requiredIngredients[i].type && !this.recipeProgress[i])
			{
				this.requiredIngredients[i].alpha = 1;
				this.recipeProgress[i] = true;
				this.mSpriteTray[i].texture = PIXI.loader.resources["images/spritesheet.json"].textures["recipe-correct.png"];
				
				level.scene.removeChild(droppedIngredient);
				return true;
			}
		}
        return false;
	};
	
	//-------------------------------------------------------------------------------
	// State Checker, Updates state if needed
	this.StateChanger = () => {
		
		// If all Item is finished and not processing
		if(this.bRecipeCompletion() && this.currentState === this.ProcessorState.Feeding) {
			// State Change -> Processing
			this.currentState = this.ProcessorState.Processing;
			//this.currentState = this.ProcessorState.Finished;
		}
		// If Processing and timer finished
		else if(this.currentState === this.ProcessorState.Processing && this.bFinishedTimer) {
			this.currentState = this.ProcessorState.Finished;
			
		}
		else if(this.currentState === this.ProcessorState.Finished && this.bReset){
			this.currentState = this.ProcessorState.Feeding;
		}	
	};
	
	//-------------------------------------------------------------------------------
	// Checks if the Outputted item has been moved
	this.isOutputIsEmpty = () => {
		return this.mOutputItem.dragging;
	};
	//-------------------------------------------------------------------------------
	// On Update
	this.update = () => {
		
		// State Updater
		this.StateChanger();
			
		// State Machine, Acts accordingly to what ever state it is in
		switch(this.currentState)
		{
			case (this.ProcessorState.Feeding): {	// Feeding State
			}break;
			case (this.ProcessorState.Processing): {	// Processing State
					this.timerUpdate();
					console.log(this.processTimer);
					// Draw Timer
			}break;
			case (this.ProcessorState.Finished): {	// Spawning/Item Check State
				if(!this.bIsFinishedSpawning) {
					this.SpawnOutput();
					this.bIsFinishedSpawning = true;
					}
				else if(this.isOutputIsEmpty()){
					this.ResetProcessorState();
					this.bReset = true;		// State Flag
				}
			}break;
		}
	};
	
	//---
	// Spawns Ingredient
	this.SpawnOutput = () => {
			this.mOutputItem = makeItem(recipeOrder.GetOutput(), level);
			level.completionData.itemsComplete.push(recipeOrder.GetOutput());
            
			this.mOutputItem.x = TILES_PX + this.mSpriteOutput.x;
			this.mOutputItem.y = TILES_PX + this.mSpriteOutput.y;
			
	};
	
	//-------------------------------------------------------------------------------
	// Gets Score of the recipe
	this.GetScore = () => {
		return (this.mScore);
	};
	
	//-------------------------------------------------------------------------------
	// Sets Score
	this.SetScore = () => {
		//(this.mScore) = recipeOrder.GetScore();
	};
	
	//-------------------------------------------------------------------------------
	// Checks if all the required Recipe Ingredients are added
	this.bRecipeCompletion = () => {
		for (let i = 0; i < this.numIngredients; ++i) {
			if(this.recipeProgress[i] == false)
				return false;
		}
		return true;
	};
	
	//-------------------------------------------------------------------------------
	// Resets the State of Processor
	this.ResetProcessorState = () => {
		
		// Resets the Whole Processor's Alpha
		// Makes them Clickable
        
		// this.SetInteract(true);
		
		// Resets Tray Ingredient's Alpha, and Progress
		for(let i = 0; i < this.numIngredients; ++i)
		{
			this.recipeProgress[i] = false;
			this.requiredIngredients[i].alpha = this.alpha;
			this.mSpriteTray[i].texture = PIXI.loader.resources["images/spritesheet.json"].textures["recipe-waiting.png"];
		}

		this.bIsFinishedSpawning = false; 	// Resets Spawner Flag 
		this.bIsDone = false;				// Resets State Flag
		this.bFinishedTimer = false;
		
	};
	

	//-------------------------------------------------------------------------------
	// Timer Update
	this.timer = () => {
		
	};
	
	//-------------------------------------------------------------------------------
	// Updates the timer
	this.timerUpdate = () => {
		if(this.processTimer < this.totalProcessTime && !bFinishedTimer)
		{
			this.processTimer += TICKER.deltaTime;
		}
		else
		{
			bFinishedTimer = true;
		}
	};
	
	/**
	//-------------------------------------------------------------------------------
	// Sets the Alpha and Interaction State of the Processor's Sprites
	// this.SetInteract = (bool) => {}; 
	
	//-------------------------------------------------------------------------------
	// On draw
	this.OnRender : function()
	{
			//Stuffs to do on Draw?
			
			//if in processing state 
				stage.addChild(timerCircle)
			//render clock
			
	}

	*/

	
	//-------------------------------------------------------------------------------
	// Object Variables
	//-------------------------------------------------------------------------------
	
	// Sprites
	this.mSpriteProcessor; 					// Sprite Variable
	this.mSpriteTray = [];
	this.mSpriteOutput; 			// This Sprite will not be have a bounding box
	
	this.spriteSizeHalf = TILES_PX / 2;
	
	// Position
	this.mPositionX;
	this.mPositionY;
	
	// Ingredients
	this.requiredIngredients = [];		// Array of required items
	this.numIngredients;				// Total Number of Ingredients
	this.recipeProgress = []; 			// An array of booleans to check if each seperate ingredients are placed
	this.mPosition;
	
	// Processing Variables
	this.totalProcessTime = 5; 			// total time it takes for an item to process
	this.processTimer = 0; 				// Current process duration	
	this.timerCircle;					// Drawing Circle
	this.bFinishedTimer = false;
	
	// Object Variables
	this.isCollidable = true;			// This object is collidable
	this.currentState;
	this.mScore = 0;
	this.mOutputItem;					// Local Variable that holds the output object
	
	this.bReset = false;				// for Processor is completed, Reset Flag 
	
	this.bIsFinishedSpawning = false;	// Flag for item has finished Spawning
	
	this.ProcessorState = { Feeding : 0, Processing : 1, Finished : 2 };
	
	this.alpha = 0.5;
	// 0 = loading items
	// 1 = processing
	
}	// End of Class
