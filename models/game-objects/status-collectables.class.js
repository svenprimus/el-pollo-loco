import { DrawableObject } from '../world/drawable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';

export class StatusCoins extends DrawableObject {
    constructor(hCanvas, statusBar) {
        super(hCanvas).loadImage(ImageLib.STATUSBAR.icons.coin);
        this.y = statusBar.y + statusBar.h;
        this.x = statusBar.x
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
    }
}


export class StatusBottles extends DrawableObject {
    constructor(hCanvas, statusBar) {
        super(hCanvas).loadImage(ImageLib.STATUSBAR.icons.bottle);
        this.y = statusBar.y + statusBar.h;
        this.x = statusBar.x + statusBar.w / 2;
        this.setSizeByWidth(12, ImageLib.STATUSBAR.icons.wNatural, ImageLib.STATUSBAR.icons.hNatural);
    }
}
