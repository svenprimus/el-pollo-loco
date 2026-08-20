class Chick extends Enemy {
    static spread = -1;
    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.mob_2.walk[2]);
        this.loadImagesToCache();

        this.h = hCanvas / 16;
        this.w = ImageLib.ENEMY.mob_2.wNatural / (ImageLib.ENEMY.mob_2.hNatural / this.h);
        this.speedX = Math.random() * 2;
        this.idHandler = this.moveLeftSteady(() => this.statusHandler());
        this.animate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
    }

    place(wCanvas, hCanvas) {
        const sections = Math.floor(Level.END / World.BG_WIDTH);
        Chick.spread = (Chick.spread + 2) >= sections ? 1 : (Chick.spread + 2) % sections;

        this.x = Chick.spread * World.BG_WIDTH + (Math.random() * 50) + 0.8 * World.BG_WIDTH;
        this.y = hCanvas - this.h - this.groundFromBottom - Math.random() * 15;
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_2.walk);
        this.loadImages(ImageLib.ENEMY.mob_2.dead);
    }

    statusHandler() {
        if (this.isDead() || this.x + this.w < Level.START) {
            clearStoppableInterval(this.idAnimate);
            clearStoppableInterval(this.idHandler);
        } else {
            this.randomFury();
        }
    }

    randomFury() {
        if (Math.random() > 0.99) {
            this.speedX = 4;
            this.restartAnimate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
            setStoppableTimeout(() => {
                this.speedX = Math.random() * 2;
                this.restartAnimate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
            }, 750);
        }
    }
}
