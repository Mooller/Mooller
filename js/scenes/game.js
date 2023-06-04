class GameScene extends Phaser.Scene {
    constructor() {
        super(GameScene);
        this.ch = null;
        this.baques = null;
        this.badbaques = null;

        this.deadCow1 = null;
        this.deadCow2 = null;
        this.paw = null;

        this.textPoints = null;
        this.points = 0;
        this.move = 1;
        this.vides = 5;
    }

    preload() {
        this.load.image('ch', '../recources/crosshair.png');
        this.load.image('fonsBack', '../recources/Fons_joc_Bakc.png');
        this.load.image('fonsFront', '../recources/Fons_joc_Frotn.png');
        this.load.image('baca', '../recources/vaka.gif');
        this.load.image('badbaca', '../recources/gifgit.gif');
        this.load.image('marc', '../recources/Marcs.png');
        this.load.audio('deadcow1', '../recources/audio/dead_cow_1.mp3');
        this.load.audio('deadcow2', '../recources/audio/dead_cow_2.mp3');
        this.load.audio('paw', '../recources/audio/paw.mp3');
    }

    create() {
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        this.add.image(500, 400, 'fonsBack').setDepth(2);
        this.add.image(500, 400, 'fonsFront').setDepth(3);

        this.add.image(160, 70, 'marc').setDepth(2).setScale(0.4);
        this.add.image(500, 70, 'marc').setDepth(2).setScale(0.4);
        this.add.image(840, 70, 'marc').setDepth(2).setScale(0.4);

        this.baques = this.physics.add.staticGroup();
        this.baques.create(500, 550, 'baca').setScale(0.2);
        this.baques.children.iterate((baca) => {
            baca.setInteractive();
            baca.on('pointerup', () => this.matarBaca('baca', baca))
            baca.setDepth(2);
        });

        this.badbaques = this.physics.add.staticGroup();
        this.badbaques.create(1100, 700, 'badbaca').setScale(0.2);
        this.badbaques.children.iterate((badbaca) => {
            badbaca.setInteractive();
            badbaca.on('pointerup', () => this.matarBaca('badbaca', badbaca))
            badbaca.setDepth(5);
        });

        this.ch = this.physics.add.sprite(300, 300, 'ch').setDepth(10);
        this.ch.setScale(0.25);

        this.deadCow1 = this.sound.add('deadcow1');
        this.deadCow2 = this.sound.add('deadcow2');
        this.paw = this.sound.add('paw');

        this.textPoints = this.add.text(100, 50, 'Punts: 0', { fontFamily: 'Lilita One, Arial, Helvetica, sans-serif', fontSize: 30 }).setDepth(30);
        this.textTime = this.add.text(460, 50, '00:00', { fontFamily: 'Lilita One, Arial, Helvetica, sans-serif', fontSize: 30 }).setDepth(30);
        this.textLives = this.add.text(780, 50, 'Vides 5/5', { fontFamily: 'Lilita One, Arial, Helvetica, sans-serif', fontSize: 30 }).setDepth(30);

        this.input.on('pointerup', () => { this.shoot() });
    }

    update() {
        this.ch.setPosition(this.input.x, this.input.y);

        this.badbaques.children.iterate((badbaca) => {
            badbaca.setPosition(badbaca.x - this.move, badbaca.y);
            if (badbaca.x < -50) {
                this.move = -1
                badbaca.flipX = true;
            }
            else if (badbaca.x > 1100) {
                this.move = 1;
                badbaca.flipX = false;
            }
        });



    }

    shoot() {
        this.paw.play();
    }

    matarBaca(tipus, obj) {

        setTimeout(() => {
            var rng = Phaser.Math.Between(1, 2);
            if (rng == 1) {
                this.deadCow1.play();
            }
            else {
                this.deadCow2.play();
            }

            if (tipus == "baca") {
                this.points--;
                this.vides--;
                this.textPoints.setText("Punts: " + this.points);
                this.textLives.setText("Vides " + this.vides + "/5");
            }
            else if (tipus == "badbaca") {
                this.points++;
                this.textPoints.setText("Punts: " + this.points);
            }
            obj.destroy();
        }, 100);
    }
}