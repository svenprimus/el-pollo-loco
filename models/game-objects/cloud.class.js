import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';
import { ImageLib } from '../../models/utility/image-lib.class.js';

/**
 * Moving Cloud
 * @class
 */
export class Cloud extends MovableObject {
    static wIndex = null;
    w = ImageLib.BG.wNatural / 4;
    h = ImageLib.BG.hNatural / 4;
    xAbsolute = 0;

    /**
     * Create a new cloud with random speed.
     * @param {string} path - path of sprite
     * @param {number} hCanvas - height of canvas
     */
    constructor(path, hCanvas) {
        super(hCanvas).loadImage(path);
        Cloud.wIndex = null; // used in place after all clouds have been created
        this.setSizeByHeight(3, ImageLib.BG.wNatural, ImageLib.BG.hNatural);
        this.resolve();
        this.setSpeed(0.5);
    }

    /**
     * Place spread Cloud under consideration of other clouds.
     * @param {number} amountPerSection - number ob Cloud objects to be spread per section
     */
    place(amountPerSection) {
        if (0 !== amountPerSection) {
            if (null == Cloud.wIndex) {
                Cloud.wIndex = -1 * amountPerSection;
            }
            const index = Math.floor(Cloud.wIndex++ / amountPerSection);
            this.x = Level.BG_WIDTH * index + Math.random() * Level.BG_WIDTH;
            this.xAbsolute = this.x;
            this.y = (Math.random() * this.hCanvas) / 4;
        }
    }

    /**
     * Steadily move left and restart from end of level, when moved outside.
     */
    resolve() {
        this.moveLeftSteady(() => {
            this.loopThroughLevel();
        });
    }

    /**
     * Set position to end of level.
     */
    loopThroughLevel() {
        if (this.x + this.w < Level.START) {
            this.x = Level.END;
        }
    }
}
