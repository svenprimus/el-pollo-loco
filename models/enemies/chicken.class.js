class Chicken extends Enemy {
    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.mob_1.walk[0]);
        this.loadImagesToCache();

        this.h = hCanvas / 8;
        this.w = ImageLib.ENEMY.mob_1.wNatural / (ImageLib.ENEMY.mob_1.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom - Math.random() * 15;
        this.x = wCanvas / 3 + Math.random() * wCanvas;
        this.speedX = Math.random() * 2;
        this.moveLeftSteady();
        this.animate(ImageLib.ENEMY.mob_1.walk, this.speedX * 5);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_1.walk);
        this.loadImages(ImageLib.ENEMY.mob_1.dead);
    }
}
