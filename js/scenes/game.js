class GameScene extends Phaser.Scene {
    constructor() {
        super(GameScene);
        this.ch = null;
        this.baques = null;
        this.badbaques = null;

        this.deadCow1 = null;
        this.deadCow2 = null;
        this.textPoints = null;
        this.points = 0;
    }

    preload() {
        this.load.image('ch', '../recources/crosshair.png');
        this.load.image('fonsBack', '../recources/Fons_joc_Bakc.png');
        this.load.image('fonsFront', '../recources/Fons_joc_Frotn.png');
        this.load.image('baca', '../recources/vaka.gif');
        this.load.image('badbaca', '../recources/gifgit.gif');
        this.load.audio('deadcow1', '../recources/audio/dead_cow_1.mp3');
        this.load.audio('deadcow2', '../recources/audio/dead_cow_2.mp3');
    }

    create() {
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        this.add.image(500, 400, 'fonsBack').setDepth(2);
        this.add.image(500, 400, 'fonsFront').setDepth(3)

        this.baques = this.physics.add.staticGroup();
        this.baques.create(500, 550, 'baca').setScale(0.2);
        this.baques.children.iterate((baca) => {
            baca.setInteractive();
            baca.on('pointerup', () => this.matarBaca('baca', baca))
            baca.setDepth(2);
        })

        this.badbaques = this.physics.add.staticGroup();
        this.badbaques.create(50, 520, 'badbaca').setScale(0.2);
        this.badbaques.children.iterate((badbaca) => {
            badbaca.setInteractive();
            badbaca.on('pointerup', () => this.matarBaca('badbaca', badbaca))
            badbaca.setDepth(5);
        })

        this.ch = this.physics.add.sprite(300, 300, 'ch').setDepth(10);
        this.ch.setScale(0.25);

        this.deadCow1 = this.sound.add('deadcow1');
        this.deadCow2 = this.sound.add('deadcow2');

        this.textPoints = this.add.text(0, 0, 'Punts: 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setDepth(30);
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

        if (tipus == "baca") {
            this.points--;
            this.textPoints.setText("Punts: " + this.points);
        }
        else if (tipus == "badbaca") {
            this.points++;
            this.textPoints.setText("Punts: " + this.points);
        }
        obj.destroy();
    }
}