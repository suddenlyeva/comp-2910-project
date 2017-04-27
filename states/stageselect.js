function openStageSelect() {
    game.backgroundColor = 0x005555;

    var stages = [stage1, stage2, stage3, stage4, stage5];
    var stageGroup = game.group();
    var stageBtns = [];
    for(var i = 0; i < stages.length; i++) {
        stageBtns.push(game.circle(20, "blue"));
        stageGroup.addChild(stageBtns[i]);
        stageBtns[i].position.set(300, i * 40 + 40);
        stageBtns[i].interact = true;

        stageBtns[i].release = () => {
            game.stage.remove(stageGroup);
            game.state = stages[i];
        };
    }
}

function stageSelect() {
}
