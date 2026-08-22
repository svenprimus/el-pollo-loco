import { DrawableObject } from '../world/drawable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';

export class StatusBar extends DrawableObject {
    constructor(hCanvas, percentage) {
        super(hCanvas).loadImage(ImageLib.STATUSBAR.hp.imgs[5]);
        this.x = hCanvas * 0.05;
        this.y = this.x;
        this.w = hCanvas / 3;
        this.h = ImageLib.STATUSBAR.hp.hNatural / (ImageLib.HERO.wNatural / this.w);
        this.loadImagesToCache();
        this.setPercentage(percentage);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.STATUSBAR.hp.imgs);
    }

    setPercentage(percentage) {
        const index = Math.round(((ImageLib.STATUSBAR.hp.imgs.length - 1) * percentage) / 100);
        this.playSingleImage(ImageLib.STATUSBAR.hp.imgs, index);
    }
}
