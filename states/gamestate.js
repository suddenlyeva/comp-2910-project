function GameState(game) {
    this.initialized = false;
    this.scene = game.group();
    this.buttons = game.group();
    this.scene.addChild(this.buttons);
    this.initialize = function() {};
    this.open = function() {};
    this.run = function() {};
    this.disableButtons = function() {
        this.buttons.children.forEach(btn => {
            btn.enabled = false;
        });
    };
    this.enableButtons = function() {
        this.buttons.children.forEach(btn => {
            btn.enabled = true;
        });
    };
}