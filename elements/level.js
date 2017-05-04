
function Level(levelNumber) {
    this.scene = new PIXI.Container();
    this.levelNumber = levelNumber;
    this.processors = [];
    this.conveyorBelt = null;
    this.setup = () => {};
    this.update = () => {};
}