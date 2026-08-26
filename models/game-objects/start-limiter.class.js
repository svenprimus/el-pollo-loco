import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';
import { ImageLib } from '../utility/image-lib.class.js';

export class StartLimiter extends MovableObject {
    hpMax = 1;
    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.BG.stop.imgs[0]);
        this.loadImagesToCache();
        this.setSizeByWidth(2, ImageLib.BG.stop.wNatural, ImageLib.BG.stop.hNatural);
        this.animate(ImageLib.BG.stop.imgs, 4);
    }

    place(hero) {
        this.x = hero.startLimit - this.w - hero.getSpeedInPixel();
        this.y = this.ground - this.h + 30;
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.BG.stop.imgs);
    }
}
