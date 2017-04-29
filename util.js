"use strict";

// File for random functions without a proper place yet.

// Groups buttons together for mass toggling
function groupButtons() {
    // Create group
    let buttons = game.group();
    
    // Add all arguments to group
    for(let btn in arguments) {
        buttons.addChild(arguments[btn]);
    }
    
    // Toggle On
    buttons.enable = () => {
        buttons.children.forEach(btn => {
            btn.enabled = true;
        })
    };
    
    // Toggle Off
    buttons.disable = () => {
        buttons.children.forEach(btn => {
            btn.enabled = false;
        })
    };
    
    // Returns a storeable reference
    return buttons;
}