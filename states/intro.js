function intro() {
	game.wait(2000,() => {
        game.backgroundColor = 0x00aa00;
        game.state = openMainMenu;
	});
}
