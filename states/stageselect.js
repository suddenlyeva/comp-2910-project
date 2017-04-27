function openStageSelect() {
    game.backgroundColor = 0x005555;

    var stageGroup = game.group();
    var stageBtns = [];
    for(var i = 0; i < STAGES.length; i++) {
        stageBtns.push(game.circle(50, "blue"));
        stageGroup.addChild(stageBtns[i]);
        stageBtns[i].position.set(300, i * 60 + 60);
        stageBtns[i].interact = true;

    }
    // headache
    // doesn't work inside the for loop
    // WHY
    stageBtns[0].tap = () => {
        game.stage.remove(stageGroup);
        game.state = STAGES[0];
    };
    stageBtns[1].tap = () => {
        game.stage.remove(stageGroup);
        game.state = STAGES[1];
    };
    stageBtns[2].tap = () => {
        game.stage.remove(stageGroup);
        game.state = STAGES[2];
    };
    stageBtns[3].tap = () => {
        game.stage.remove(stageGroup);
        game.state = STAGES[3];
    };
    stageBtns[4].tap = () => {
        game.stage.remove(stageGroup);
        game.state = STAGES[4];
    };

    game.state = stageSelect;
}

function stageSelect() {
}
