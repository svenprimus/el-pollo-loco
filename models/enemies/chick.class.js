class Chick extends Enemy {
    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.mob_2.walk[0]);
        this.loadImagesToCache();

        this.h = hCanvas / 16;
        this.w = ImageLib.ENEMY.mob_2.wNatural / (ImageLib.ENEMY.mob_2.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom - Math.random() * 10;
        this.x = wCanvas / 3 + Math.random() * wCanvas;
        this.speedX = Math.random() * 2;
        this.moveLeftSteady(() => this.randomFury());
        this.animate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_2.walk);
        this.loadImages(ImageLib.ENEMY.mob_2.dead);
    }

    randomFury() {
        if (Math.random() > 0.99) {
            this.speedX = 4;
            setTimeout(() => {
                this.speedX = Math.random() * 2;
            }, 750);
        }
    }
}
