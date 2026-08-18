class Boss extends Enemy {
    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.boss_1.walk[0]);
        this.loadImagesToCache();

        this.h = hCanvas / 1.8;
        this.w = ImageLib.ENEMY.boss_1.wNatural / (ImageLib.ENEMY.boss_1.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom + 15;

        // TODO: spawn point relative to hero
        this.x = wCanvas - this.w;
        this.animate(ImageLib.ENEMY.boss_1.alert, 5);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.boss_1.walk);
        this.loadImages(ImageLib.ENEMY.boss_1.alert);
        this.loadImages(ImageLib.ENEMY.boss_1.attack);
        this.loadImages(ImageLib.ENEMY.boss_1.hurt);
        this.loadImages(ImageLib.ENEMY.boss_1.dead);
    }
}
