class Hero extends MovableObject {
    constructor(wCanvas, hCanvas) {
        const img = super(hCanvas).loadImage(ImageLib.HERO.idle[0]);

        this.h = hCanvas / 2;
        this.w = ImageLib.HERO.wNatural / (ImageLib.HERO.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom;
        this.x = wCanvas / 8;
    }
}