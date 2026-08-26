import { MovableObject } from '../world/movable-object.class.js';
import { World } from '../world/world.class.js';
import { Level } from '../world/level.class.js';
import { ImageLib } from '../utility/image-lib.class.js';

export class Collectable extends MovableObject {
    static spread = 0;
    hpMax = 1;
    collected = false;

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.AMMO.collectable.imgs[0]);
        Collectable.spread = 0;
        this.reverseDirection = Math.round(Math.random());
        this.loadImagesToCache();
        this.setSizeByHeight(8, ImageLib.AMMO.collectable.wNatural, ImageLib.AMMO.collectable.hNatural);
        this.animate(ImageLib.AMMO.collectable.imgs, Math.round(4 + Math.random() * 4));
    }

    place() {
        const sections = Math.floor(Level.END / World.BG_WIDTH);
        const section = Collectable.spread++ % sections;

        this.x = section * World.BG_WIDTH + Math.random() * World.BG_WIDTH;
        this.y = this.ground - this.h - Math.random() * 20;
        this.setOffset(
            ImageLib.AMMO.collectable.offset,
            ImageLib.AMMO.collectable.wNatural,
            ImageLib.AMMO.collectable.hNatural
        );
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.AMMO.collectable.imgs);
    }

    hasFinished() {
        return this.collected;
    }
}
