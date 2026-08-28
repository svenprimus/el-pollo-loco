import { DrawableObject } from '../world/drawable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { MovableObject } from '../world/movable-object.class.js';
export class StatusCoins extends MovableObject {
    count = 0;

    constructor(hCanvas, statusBar) {
        super(hCanvas).loadImage(ImageLib.COIN.rotate[0]);
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
        this.y = statusBar.y + statusBar.h;
        this.x = statusBar.x;
        this.loadImages(ImageLib.COIN.rotate);
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
        this.restartAnimate(ImageLib.COIN.rotate, 30, null, 4);
        // this.animate(ImageLib.COIN.rotate, 30, null, 4);
    }
}

export class StatusBottles extends DrawableObject {
    count = 0; // length of hero array

    constructor(hCanvas, statusBar) {
        super(hCanvas).loadImage(ImageLib.STATUSBAR.icons.bottle);
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
        this.y = statusBar.y + statusBar.h;
        this.x = statusBar.x + statusBar.w / 2 + this.w - this.w / 1.25;
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
}
