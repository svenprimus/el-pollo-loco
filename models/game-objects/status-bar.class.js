import { DrawableObject } from '../world/drawable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';

/**
 * A status (health) bar for hero or boss.
 * @class
 */
export class StatusBar extends DrawableObject {
    isBoss = false;
    
    /**
     * Create a new statusbar
     * @param {number} wCanvas - width of canvas
     * @param {number} hCanvas - height of canvas
     * @param {MovableObject} movableObject - object to be connected with
     * @param {number} y - vertical position
     * @param {boolean} isBoss - true if target is a boss
     */
    constructor(wCanvas, hCanvas, movableObject, y, isBoss) {
        super(hCanvas).loadImage(isBoss ? ImageLib.STATUSBAR.boss.imgs[5] : ImageLib.STATUSBAR.hp.imgs[5]);
        this.y = y;
        this.setSizeByWidth(3, ImageLib.STATUSBAR.hp.wNatural, ImageLib.STATUSBAR.hp.hNatural);
        this.x = isBoss ? wCanvas - y - this.w : y;
        this.isBoss = isBoss;
        this.reverseDirection = isBoss;
        this.resizeOnSmallCanvasWidth(wCanvas);
        this.loadImagesToCache();
        this.setPercentage((100 * movableObject.hp) / movableObject.hpMax);
    }

    /**
     * Load related animation sprites into cache.
     */
    loadImagesToCache() {
        this.loadImages(ImageLib.STATUSBAR.hp.imgs);
        this.loadImages(ImageLib.STATUSBAR.boss.imgs);
    }

    /**
     * Set statusbar sprite according to healthvalue
     * @param {number} percentage 
     */
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

    /**
     * In case of very narrow canvas, the statusbar will adjust so that two bars fit next to each other.
     * @param {number} wCanvas - width of canvas 
     */
    resizeOnSmallCanvasWidth(wCanvas) {
        const fromLeft = this.y;
        const totalBarWidth = this.w * 2;
        const totalSpaceWidth = fromLeft * 2;
        const totalWidth = totalBarWidth + totalSpaceWidth;
        if (totalWidth > wCanvas) {
            if (totalBarWidth > wCanvas) {
                this.w = wCanvas / 2;
            }
            this.x = this.isBoss ? wCanvas - this.w : 0;
        }
    }
}
