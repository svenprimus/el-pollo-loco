import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';
import { ImageLib } from '../../models/utility/image-lib.class.js';

export class Cloud extends MovableObject {
    static wIndex = null;
    w = ImageLib.BG.wNatural / 4;
    h = ImageLib.BG.hNatural / 4;
    xAbsolute = 0;

    constructor(path, hCanvas) {
        super(hCanvas).loadImage(path);
        Cloud.wIndex = null; // used in place after all clouds have been created
        this.setSizeByHeight(3, ImageLib.BG.wNatural, ImageLib.BG.hNatural);
        this.resolve();
        this.setSpeed(0.5);
    }

    place(amountPerLayer) {
        if (0 !== amountPerLayer) {
            if (null == Cloud.wIndex) {
                Cloud.wIndex = -1 * amountPerLayer;
            }
            const index = Math.floor(Cloud.wIndex++ / amountPerLayer);
            this.x = Level.BG_WIDTH * index + Math.random() * Level.BG_WIDTH;
            this.xAbsolute = this.x;
            this.y = (Math.random() * this.hCanvas) / 4;
        }
    }

    resolve() {
        this.moveLeftSteady(() => {
            this.loopThroughLevel();
        });
    }

    loopThroughLevel() {
        if (this.x + this.w < Level.START) {
            this.x = Level.END;
        }
    }
}
