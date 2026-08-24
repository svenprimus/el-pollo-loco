import { DrawableObject } from '../world/drawable-object.class.js';
import { ImageLib } from '../../models/utility/image-lib.class.js';

export class Background extends DrawableObject {
    static wIndex = null;
    static LAYERS = null;
    static NATURAL_WIDTH = ImageLib.BG.wNatural;
    static NATURAL_HEIGHT = ImageLib.BG.hNatural;
    y = 0;

    constructor(path, hCanvas) {
        super(hCanvas).loadImage(path);
        Background.wIndex = null; // set at place() after all bg are created
        Background.LAYERS = null; // set at place() after all bg are created
        this.setSize(hCanvas);
    }

    place(amountPerLayer) {
        if (0 !== amountPerLayer) {
            if (null == Background.wIndex) {
                Background.wIndex = -1 * amountPerLayer;
                Background.LAYERS = amountPerLayer;
            }
            // shift draw position by canvas width after all layers have been planted
            const index = Math.floor(Background.wIndex++ / Background.LAYERS);
            this.x = index > 0 ? index * this.w - 1 : index * this.w + 1;
        }
    }

    setSize() {
        this.w = Background.NATURAL_WIDTH / (Background.NATURAL_HEIGHT / this.hCanvas);
        this.h = this.hCanvas;
    }
}
