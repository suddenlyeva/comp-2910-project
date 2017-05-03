"use strict";

function Processor(recipeOrder) //the Recipe this Processor will produce 
{

	//two possible ways to pull list
	this.requiredIngredients = [recipeOrder.getIngredentsList()]; //Pulls list of item array?
	this.requiredIngredients = recipeOrder;
	
	this.numIngredients = requiredIngredients.length - 1;	// Total Number of Ingredients
	
	// based of the number of ingredients that are in the recipe
	this.recipeProgress = new Array(numIngredients);
	/* 
	//Forcefully initiates them to false
	for(var i = 0; i < requiredIngredeints.length; ++i)
	{
		recipeProgress[i] = false;
	}
	*/
	
	//defaults to 60 seconds for a processor the finished producing the item
	this.totalProcessTime = 60; 
	
	//current process duration
	this.processTimer = 0; 	
	
	this.position = new position(0,0);
	this.processorState
	
	this.OnSetup : function() 
	{
		
	}
	
	
	this.OnUpdate : function() 
	{
		
		if(!bRecipeCompletion)
		{
			
		}
		else	//if fully completed
		{
			
		}
		
	}
	
	
	//checks if dragged item is an item on the recipe
	this.itemCheck(droppedObj)
	{
		for(var i = 0; i < numIngredients; ++i)
		{
			if(requiredIngredients[i] === droppedObj.getName())
			{
				return true;
			}
		}
		return false;
	}
	this.bRecipeCompletion : function()
	{
		for (var i = 0; i < numIngredients; ++i)
		{
			if(requiredIngredients[i] === false)
				return false;
		}
		return true;
	}
	
}

//project defined position placeholder
function position(x1,y1)
{
	this.x = x1;
	this.y = y1;
	
	getX : function() { return x;}
	getY : function() { return y;}
	
	movePos : function(x1, y1) 
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