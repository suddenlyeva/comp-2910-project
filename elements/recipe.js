"use strict";

// ItemTypes array of ingdeints, resultType is recipe Output
function Recipe(itemTypes, resultType) {
	
	// Returns the Number of Ingredients in Recipe
	this.GetListCount = () => {
		return itemTypes.length;
	}
	
    // Takes an array
    this.recipe = itemTypes;
    this.result = resultType;
}