import { ImageLib } from '../utility/image-lib.class.js';
import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { MovableObject } from '../world/movable-object.class.js';
export class StatusCoins extends MovableObject {
    count = 0;

    constructor(hCanvas, hero) {
        super(hCanvas).loadImage(ImageLib.COIN.rotate[0]);
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
        this.y = hero.statusBar.y + hero.statusBar.h;
        this.x = hero.statusBar.x;
        this.loadImages(ImageLib.COIN.rotate);
        AudioHub.loadSound(AudioLib.COLLECTABLE.coin);
        this.animate(ImageLib.COIN.rotate, 30, null, 4);
    }

    draw(ctx) {
        super.draw(ctx);
        this.drawCount(ctx);
    }

    drawCount(ctx) {
        const x = this.x + this.w;
        const y = this.y + this.h / 2;
        const h = this.h / 2;
        this.writeWithPresetStyle(this.count.toString(), ctx, x, y, h);
    }

    collect() {
        this.count++;
        AudioHub.playFromStart(AudioLib.COLLECTABLE.coin);
        this.restartAnimate(ImageLib.COIN.rotate, 30, null, 4);
    }
}

export class StatusBottles extends MovableObject {
    count = 0; // length of hero array

    constructor(hCanvas, hero) {
        super(hCanvas).loadImage(ImageLib.STATUSBAR.icons.bottle[0]);
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
        this.y = hero.statusBar.y + hero.statusBar.h;
        this.x = hero.statusBar.x + hero.statusBar.w / 2 + this.w - this.w / 1.25;
        this.count = hero.throwables.length;
        this.loadImages(ImageLib.STATUSBAR.icons.bottle);
        AudioHub.loadSound(AudioLib.COLLECTABLE.bottle);
        this.animate(ImageLib.STATUSBAR.icons.bottle, 6, null, 3);
    }

    draw(ctx) {
        super.draw(ctx);
        this.drawCount(ctx);
    }

    drawCount(ctx) {
        const x = this.x + this.w / 1.25;
        const y = this.y + this.h / 2;
        const h = this.h / 2;
        this.writeWithPresetStyle(this.count.toString(), ctx, x, y, h);
    }

    collect() {
        this.count++;
        AudioHub.playFromStart(AudioLib.COLLECTABLE.bottle);
        this.restartAnimate(ImageLib.STATUSBAR.icons.bottle, 6, null, 3);
    }

    spend() {
        this.count = Math.max(this.count - 1, 0);
    }
}
