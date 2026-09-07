import { ImageLib } from '../utility/image-lib.class.js';
import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { MovableObject } from '../world/movable-object.class.js';

/**
 * A status counter of collectable Coins.
 * @class
 */
export class StatusCoins extends MovableObject {
    count = 0;

    /**
     * Construct a coin counter below healthbar.
     * @param {number} hCanvas - height of canvas
     * @param {Hero} hero - hero to be attached to
     */
    constructor(hCanvas, hero) {
        super(hCanvas).loadImage(ImageLib.COIN.rotate[0]);
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
        this.y = hero.statusBar.y + hero.statusBar.h;
        this.x = hero.statusBar.x;
        this.loadImages(ImageLib.COIN.rotate);
        AudioHub.loadSound(AudioLib.COLLECTABLE.coin);
        this.animate(ImageLib.COIN.rotate, 30, null, 4);
    }

    /**
     * Draws the Coin image and current count.
     * @param {context} ctx - 2d context of canvas
     */
    draw(ctx) {
        super.draw(ctx);
        this.drawCount(ctx);
    }

    /**
     * Draws the current count.
     * @param {context} ctx - 2d context of canvas
     */
    drawCount(ctx) {
        const x = this.x + this.w;
        const y = this.y + this.h / 2;
        const h = this.h / 2;
        this.writeWithPresetStyle(this.count.toString(), ctx, x, y, h);
    }

    /**
     * Increase cound and play a one-time collect animation.
     */
    collect() {
        this.count++;
        AudioHub.playFromStart(AudioLib.COLLECTABLE.coin);
        this.restartAnimate(ImageLib.COIN.rotate, 0, 30, null, 4);
    }

    /**
     * Decrese count no less than zero.
     */
    lose() {
        this.count = Math.max(this.count - 1, 0);
    }
}

/**
 * A status counter of collectable Bottles.
 * @class
 */
export class StatusBottles extends MovableObject {
    count = 0; // length of hero array

    /**
     * Construct a bottle counter below healthbar, next to Coin counter.
     * @param {number} hCanvas - height of canvas
     * @param {Hero} hero - hero to be attached to
     */
    constructor(hCanvas, hero) {
        super(hCanvas).loadImage(ImageLib.STATUSBAR.icons.bottle[0]);
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
        this.y = hero.statusBar.y + hero.statusBar.h;
        this.x = hero.statusBar.x + hero.statusBar.w / 2 + this.w - this.w / 1.25;
        this.count = hero.throwables.length;
        this.loadImages(ImageLib.STATUSBAR.icons.bottle);
        AudioHub.loadSounds(AudioLib.COLLECTABLE.bottle);
        this.animate(ImageLib.STATUSBAR.icons.bottle, 6, null, 3);
    }

    /**
     * Draws the Bottle image and current count.
     * @param {context} ctx - 2d context of canvas
     */
    draw(ctx) {
        super.draw(ctx);
        this.drawCount(ctx);
    }

    /**
     * Draws the current count.
     * @param {context} ctx - 2d context of canvas
     */
    drawCount(ctx) {
        const x = this.x + this.w / 1.25;
        const y = this.y + this.h / 2;
        const h = this.h / 2;
        this.writeWithPresetStyle(this.count.toString(), ctx, x, y, h);
    }

    /**
     * Increase cound and play a one-time collect animation.
     */
    collect() {
        this.count++;
        AudioHub.playFromStart(AudioLib.COLLECTABLE.bottle.collect);
        this.restartAnimate(ImageLib.STATUSBAR.icons.bottle, 0, 6, null, 3);
    }

    /**
     * Decrese count no less than zero.
     */
    spend() {
        this.count = Math.max(this.count - 1, 0);
    }

    /**
     * Play sound and animation to be used when trying to access on empty bottle count.
     */
    shake() {
        AudioHub.play(AudioLib.COLLECTABLE.bottle.empty);
        this.restartAnimate(ImageLib.STATUSBAR.icons.bottle, 0, 6, null, 3);
    }
}
