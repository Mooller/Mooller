class GameScene extends Phaser.Scene {
    constructor() {
        super(GameScene);
        this.ch = null;
    }

    preload() {
        this.load.image('ch', '../recources/crosshair.png');
    }

    create() {
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        this.ch = this.physics.add.sprite(300, 300, 'ch');
        this.ch.setScale(0.25);


    }

    update() {
        this.ch.setPosition(this.input.x, this.input.y);
    }
}