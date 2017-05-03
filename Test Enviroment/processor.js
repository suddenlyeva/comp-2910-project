"use strict";

import spriteManager from './location';

@class

function Processor(recipeOrder) //the Recipe this Processor will produce 
{
	//-------------------------------------------------------------------------------
	
	//-------------------------------------------------------------------------------
	
	//-------------------------------------------------------------------------------
	// Object Variables
	//-------------------------------------------------------------------------------
	this.mSprite; 				// Sprite Variable
	this.requiredIngredients;	// array of required items
	this.numIngredients;		// Total Number of Ingredients
	this.recipeProgress; 		// An array of booleans to check if each seperate ingredients are placed
	this.mPosition;
	
	this.totalProcessTime = 60; 		// total time it takes for an item to process
	this.processTimer = 0; 				// Current process duration	
	this.timerCircle;					// Drawing Circle
	
	
	
	this.isCollidable = true;
	
	
	// 0 = loading items
	// 1 = processing
	this.processorState = 0; 

	//-------------------------------------------------------------------------------
	// Project handler functions
	//-------------------------------------------------------------------------------
	
	// On create 
	// Variable assignment
	this.OnSetup : function() 
	{
		this.mSprite = spriteManager.getSprite("Processor");  // example
	
		// Sets Position
		this.mPosition = new Position(0,0);
		this.boundingBox = new BoundingBox();	// No spritemanager to handle collision checks between all sprites.
		
		// load all the sprites for the ingredients
		
		
		// Two possible ways to pull list
		this.requiredIngredients = [recipeOrder.getIngredentsList()]; // Pulls list of item array?
		this.requiredIngredients = recipeOrder;
		
		this.numIngredients = requiredIngredients.length - 1;	// Assigns total number of ingredients
		
		this.recipeProgress = new Array(numIngredients);
		
		for(var i = 0; i < requiredIngredeints.length; ++i) // Forcefully initiates them to false
		{
			recipeProgress[i] = false;
		}
	}
	
	//-------------------------------------------------------------------------------
	// On draw
	this.OnRender : function()
	{
			//Stuffs to do on Draw?
			
			//if in processing state 
				stage.addChild(timerCircle)
			//render clock
			
	}
	
	//-------------------------------------------------------------------------------
	// On Update
	this.OnUpdate : function() 
	{
		
		if(!bRecipeCompletion)
		{
			processState = 1;
		}
		switch (processState)
		{
			case 0: // still loading Ingredients on the tray
			{
				
				// Iterates through all the items on the scene and see if one is "dropped" into the processor
				if(itemCheck(collidedObject))
				{
					// Kill dropped object Item
					// grayed out object becomes fully drawn
				}
					
			}break;
			case 1: // Processing Ingredients
			{		
				timerUpdate();
				//do something related to processing
			}break;
		} // Switch
		
	}
	
	//-------------------------------------------------------------------------------
	// Memeber functions
	//-------------------------------------------------------------------------------
	
	
	//-------------------------------------------------------------------------------
	// Updates the timer
	
	this.timerUpdate : function()
	{
		if(processTimer < totalProcessTime)
		{
			processTimer += deltaTime;
		}
	}
	
	//-------------------------------------------------------------------------------
	// Checks if dragged item is an item on the recipe
	this.itemCheck(droppedObj)
	{
		for(let i = 0; i < numIngredients; ++i)
		{
			
			if(requiredIngredients[i] === droppedObj.getName())
			{
				requiredIngredients[i] = true; // if found flip to true 
				return true;
			}
		}
		return false;
	}
	
	//-------------------------------------------------------------------------------
	// Checks if all the required Recipe Ingredients are added
	this.bRecipeCompletion : function()
	{
		for (let i = 0; i < numIngredients; ++i)
		{
			if(requiredIngredients[i] === false)
				return false;
		}
		return true;
	}
	
	//-------------------------------------------------------------------------------

}

// Position class handler
function Position(x1,y1)
{
	this.x = x1;
	this.y = y1;
	
	this.getX : function() { return x;}
	this.getY : function() { return y;}
	
	this.movePos : function(x1, y1) 
	{ 
		x += x1; 
		y += y1;
	}
	
}


function makeProcessor(items) {
    
    
    // Data to track every frame
    this.isProcessing = false;
    this.processTimer = 0;
    this.recipeProgress = []; // of booleans
    
    // Data that is different for each processor
    this.x = x;
    this.y = y;
    this.timeToProcess;
    this.recipe = makeRecipe(itemTypes,resultType);
    
    // Required Behaviours
    this.setup = function() {
        // TODO: makes the sprites and frame and stuff
    }
    
    this.update = function () {
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
    
    this.recipeComplete = function () {
        // TODO: Check if each bool in recipeProgress is true or not
        // returns a bool
    };

    this.checkMatch = function (itemDraggedIn) {
        // TODO: Check if the item added to processor fits an empty slot on recipe
    }
    
    this.showTimer = function () {
        // TODO: shows/updates the timer
        // maybe refactor
    }
    
    return this;
    
}