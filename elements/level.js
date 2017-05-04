
function Level(levelNumber) {
    this.scene = new PIXI.Container();
    this.levelNumber = levelNumber;
    this.processors = [];
    this.setup = () => {};
    this.update = () => {};
}