class Chick extends Enemy {
    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.mob_2.walk[2]);
        this.loadImagesToCache();

        this.h = hCanvas / 16;
        this.w = ImageLib.ENEMY.mob_2.wNatural / (ImageLib.ENEMY.mob_2.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom - Math.random() * 10;
        this.x = wCanvas / 3 + Math.random() * wCanvas;
        this.speedX = Math.random() * 2;
        this.idHandler = this.moveLeftSteady(() => this.statusHandler());
        this.animate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_2.walk);
        this.loadImages(ImageLib.ENEMY.mob_2.dead);
    }

    statusHandler() {
        if (this.isDead() || this.x + this.w < 0) {
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
