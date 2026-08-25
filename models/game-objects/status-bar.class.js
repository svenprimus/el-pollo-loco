import { DrawableObject } from '../world/drawable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';

export class StatusBar extends DrawableObject {
    isBoss = false;
    constructor(wCanvas, hCanvas, movableObject, y, isBoss) {
        super(hCanvas).loadImage(isBoss ? ImageLib.STATUSBAR.boss.imgs[5] : ImageLib.STATUSBAR.hp.imgs[5]);
        this.y = y;
        this.setSizeByWidth(3, ImageLib.STATUSBAR.hp.wNatural, ImageLib.STATUSBAR.hp.hNatural);
        this.x = isBoss ? wCanvas - y - this.w : y;
        this.isBoss = isBoss;
        this.reverseDirection = isBoss;
        this.loadImagesToCache();
        this.setPercentage((100 * movableObject.hp) / movableObject.hpMax);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.STATUSBAR.hp.imgs);
        this.loadImages(ImageLib.STATUSBAR.boss.imgs);
    }

    setPercentage(percentage) {
        const index = Math.min(
            Math.ceil(
                (((this.isBoss ? ImageLib.STATUSBAR.hp.imgs.length : ImageLib.STATUSBAR.hp.imgs.length) - 1) *
                    percentage) /
                    100
            ),
            ImageLib.STATUSBAR.hp.imgs.length - 1
        );
        this.playSingleImage(this.isBoss ? ImageLib.STATUSBAR.boss.imgs : ImageLib.STATUSBAR.hp.imgs, index);
    }
}
