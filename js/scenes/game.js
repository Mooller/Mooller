class GameScene extends Phaser.Scene {
    constructor() {
        super(GameScene);
        this.ch = null;
        this.baques = null;
        this.badbaques = null;
    }

    preload() {
        this.load.image('ch', '../recources/crosshair.png');
        this.load.image('fons', '../recources/Fons_joc.png');
        this.load.image('baca', '../recources/vaka.gif');
        this.load.image('badbaca', '../recources/gifgit.gif');
    }

    create() {
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        this.add.image(500, 400, 'fons');

        this.baques = this.physics.add.staticGroup();
        this.baques.create(300, 600, 'baca').setScale(0.2);

        this.badbaques = this.physics.add.staticGroup();
        this.badbaques.create(400, 600, 'badbaca').setScale(0.2);

        this.ch = this.physics.add.sprite(300, 300, 'ch');
        this.ch.setScale(0.25);
    }

    update() {
        this.ch.setPosition(this.input.x, this.input.y);
    }
}