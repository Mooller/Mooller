var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    parent: 'game_area',
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene]
};



var game = new Phaser.Game(config);
