import { Collectable } from './collectable.class.js';
import { ImageLib } from '../../utility/image-lib.class.js';
import { ThrowableObject } from '../throwable-object.class.js';

/**
 * A collectable Bottle.
 * @class
 */
export class Bottle extends Collectable {
    /**
     * Create a new Bottle.
     * @param {number} hCanvas - height of canvas 
     */
    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.AMMO.collectable.imgs[0]);
        this.reverseDirection = Math.round(Math.random());
        this.loadImagesToCache();
        this.setSizeByHeight(8, ImageLib.AMMO.collectable.wNatural, ImageLib.AMMO.collectable.hNatural);
        this.animate(ImageLib.AMMO.collectable.imgs, Math.round(4 + Math.random() * 4));
    }

    /**
     * Place Bottle evenly spread across level.
     */
    place() {
        super.place();
        this.setOffset(
            ImageLib.AMMO.collectable.offset,
            ImageLib.AMMO.collectable.wNatural,
            ImageLib.AMMO.collectable.hNatural
        );
    }

    /**
     * Pushes new throwable object to hero.
     * @param {Hero} hero - related Hero 
     */
    collect(hero) {
        this.collected = true;
        hero.throwables.push(new ThrowableObject(hero.hCanvas));
        hero.statusBottles.collect();
        hero.lastBottledUp = new Date().getTime();
    }

    /**
     * Load related animation sprites into cache.
     */
    loadImagesToCache() {
        this.loadImages(ImageLib.AMMO.collectable.imgs);
    }
}
