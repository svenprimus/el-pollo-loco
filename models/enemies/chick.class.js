class Chick extends Enemy {
    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.mob_2.walk[0]);

        this.h = hCanvas / 16;
        this.w = ImageLib.ENEMY.mob_2.wNatural / (ImageLib.ENEMY.mob_2.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom;
        // TODO: spawn point relative to hero
        this.x = wCanvas / 3 + Math.random() * wCanvas; 
    }
}
