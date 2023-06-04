class GameScene extends Phaser.Scene {
    constructor() {
        super(GameScene);
        this.ch = null;
        this.baques = null;
        this.badbaques = null;

        this.deadCow1 = null;
        this.deadCow2 = null;
    }

    preload() {
        this.load.image('ch', '../recources/crosshair.png');
        this.load.image('fons', '../recources/Fons_joc.png');
        this.load.image('baca', '../recources/vaka.gif');
        this.load.image('badbaca', '../recources/gifgit.gif');
        this.load.audio('deadcow1', '../recources/audio/dead_cow_1.mp3');
        this.load.audio('deadcow2', '../recources/audio/dead_cow_2.mp3');
    }

    create() {
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        this.add.image(500, 400, 'fons');

        this.baques = this.physics.add.staticGroup();
        this.baques.create(300, 600, 'baca').setScale(0.2);
        this.baques.children.iterate((baca) => {
            baca.setInteractive();
            baca.on('pointerup', () => this.matarBaca('baca', baca))
        })

        this.badbaques = this.physics.add.staticGroup();
        this.badbaques.create(400, 600, 'badbaca').setScale(0.2);
        this.badbaques.children.iterate((badbaca) => {
            badbaca.setInteractive();
            badbaca.on('pointerup', () => this.matarBaca('badbaca', badbaca))
        })

        this.ch = this.physics.add.sprite(300, 300, 'ch');
        this.ch.setScale(0.25);

        this.deadCow1 = this.sound.add('deadcow1');
        this.deadCow2 = this.sound.add('deadcow2');
    }

    update() {
        this.ch.setPosition(this.input.x, this.input.y);
    }

    matarBaca(tipus, obj) {
        var rng = Phaser.Math.Between(1, 2);
        if (rng == 1) {
            this.deadCow1.play();
        }
        else {
            this.deadCow2.play();
        }

        obj.destroy();
    }
}