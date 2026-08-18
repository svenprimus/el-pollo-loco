class Boss extends Enemy {
    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.boss_1.walk[0]);

        this.h = hCanvas / 1.8;
        this.w = ImageLib.ENEMY.boss_1.wNatural / (ImageLib.ENEMY.boss_1.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom;

         // TODO: spawn point relative to hero
        this.x = wCanvas - this.w;
    }
}
