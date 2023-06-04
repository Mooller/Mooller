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

        this.load.spritesheet("cow", "../recources/cow-walking_sheet.png", {
            frameWidth: 318,
            frameHeight: 243
        });
        this.load.spritesheet("cow2", "../recources/cow-walking_sheet_marcada.png", {
            frameWidth: 318,
            frameHeight: 243
        });
    }

    create() {

        var cownimation = {
            key: "cowAnimation",
            frames: this.anims.generateFrameNumbers("cow", {
                start: 0,
                end: 25,
                first: 0
            }),
            frameRate: 20,
            repeat: -1
        };
        var cownimation2 = {
            key: "cowAnimation2",
            frames: this.anims.generateFrameNumbers("cow2", {
                start: 0,
                end: 25,
                first: 0
            }),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(cownimation);
        this.anims.create(cownimation2);



        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        this.add.image(500, 400, 'fonsBack').setDepth(2);
        this.add.image(500, 400, 'fonsFront').setDepth(3);

        this.add.image(160, 70, 'marc').setDepth(2).setScale(0.4);
        this.add.image(500, 70, 'marc').setDepth(2).setScale(0.4);
        this.add.image(840, 70, 'marc').setDepth(2).setScale(0.4);

        this.baques = this.physics.add.staticGroup();
        this.badbaques = this.physics.add.staticGroup();
        this.craerBadBaca();
        this.crearBaca();


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
            badbaca.setPosition(badbaca.x - badbaca.move, badbaca.y);
            if (badbaca.x < -50) {
                badbaca.move *= -1
                badbaca.scaleX *= -1;
            }
            else if (badbaca.x > 1100) {
                badbaca.move *= -1;
                badbaca.scaleX *= -1;
            }
        });

        this.baques.children.iterate((baca) => {
            baca.setPosition(baca.x - baca.move, baca.y);
            if (baca.x < -50) {
                baca.move *= -1
                baca.scaleX *= -1;
            }
            else if (baca.x > 1100) {
                baca.move *= -1;
                baca.scaleX *= -1;
            }
        });
    }

    craerBadBaca() {
        let randomY = Phaser.Math.Between(500, 750);
        this.badbaques.create(1100, randomY, "cow2").play("cowAnimation2").setScale((randomY * 0.0008 - 0.3));
        let badbaca = this.badbaques.getLast(true);
        badbaca.setInteractive();
        badbaca.move = Phaser.Math.Between(0.5, 1);
        badbaca.on('pointerup', () => this.matarBaca('badbaca', badbaca))
        if (randomY >= 500 && randomY <= 600) {
            badbaca.setDepth(2);
        }
        else {
            badbaca.setDepth(5);
        }
    }

    crearBaca() {
        let randomY = Phaser.Math.Between(500, 800);
        this.baques.create(1100, randomY, "cow").play("cowAnimation").setScale((randomY * 0.0008 - 0.3));
        let baca = this.baques.getLast(true);
        baca.setInteractive();
        baca.move = Phaser.Math.Between(1, 5);
        baca.on('pointerup', () => this.matarBaca('baca', baca))
        if (randomY >= 500 && randomY <= 600) {
            baca.setDepth(2);
        }
        else {
            baca.setDepth(5);
        }
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

            let randomNumBaques = Phaser.Math.Between(3, 5);

            for (var i = 0; i < randomNumBaques; i++) {
                let prob = Phaser.Math.Between(1, 2);
                if (prob == 1) {
                    this.crearBaca();
                }
                else {
                    this.craerBadBaca();
                }
            }

        }, 100);
    }
}