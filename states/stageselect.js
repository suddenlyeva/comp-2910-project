"use strict";

function openStageSelect() {
    game.backgroundColor = 0x005555;

    let stageGroup = game.group();
    let stageBtns = [];
    for(let i = 0; i < STAGES.length; i++) {
        stageBtns.push(game.circle(50, "blue"));
        stageGroup.addChild(stageBtns[i]);
        stageBtns[i].position.set(300, i * 60 + 60);
        stageBtns[i].interact = true;

        stageBtns[i].tap = () => {
			for(let btn in stageBtns) {
				stageBtns[btn].enabled = false;
			}
            game.remove(stageGroup);
            game.state = STAGES[i];
        };
    }

    game.state = stageSelect;
}

function stageSelect() {
}
