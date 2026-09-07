import { ImageLib } from '../utility/image-lib.class.js';
import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';

/**
 * A visual marker of the left end of the level.
 * @class
 */
export class StartLimiter extends MovableObject {
    hpMax = 1;
    static BORDER;

    /**
     * Construct a new StartLimiter
     * @param {number} hCanvas - height of canvas
     */
    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.BG.stop.imgs[0]);
        this.loadImagesToCache();
        AudioHub.loadSound(AudioLib.GAME.catrina);
        this.setSizeByWidth(2, ImageLib.BG.stop.wNatural, ImageLib.BG.stop.hNatural);
        this.animate(ImageLib.BG.stop.imgs, 4);
    }

    /**
     * Place the marker.
     */
    place() {
        this.x = Level.START + 1;
        this.y = this.ground - this.h + this.getHFromPer(3);
        StartLimiter.BORDER = this.x + this.w;
    }

    /**
     * Set new position for the marker.
     * @param {number} border
     */
    setNewBorder(border) {
        this.x = border - this.w;
        StartLimiter.BORDER = border;
    }

    /**
     * Load related animation sprites into cache.
     */
    loadImagesToCache() {
        this.loadImages(ImageLib.BG.stop.imgs);
    }

    sayHey() {
        AudioHub.play(AudioLib.GAME.catrina);
    }
}
