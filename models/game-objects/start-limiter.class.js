import { ImageLib } from '../utility/image-lib.class.js';
import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';

export class StartLimiter extends MovableObject {
    hpMax = 1;
    static BORDER;

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.BG.stop.imgs[0]);
        this.loadImagesToCache();
        this.setSizeByWidth(2, ImageLib.BG.stop.wNatural, ImageLib.BG.stop.hNatural);
        this.animate(ImageLib.BG.stop.imgs, 4);
    }

    place() {
        this.x = Level.START + 1;
        this.y = this.ground - this.h + this.getHFromPer(3);
        StartLimiter.BORDER = this.x + this.w;

    }

    setNewBorder(border) {
        this.x = border - this.w;
        StartLimiter.BORDER = border;
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.BG.stop.imgs);
    }
}
