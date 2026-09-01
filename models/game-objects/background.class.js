import { ImageLib } from '../../models/utility/image-lib.class.js';
import { DrawableObject } from '../world/drawable-object.class.js';
import { Level } from '../world/level.class.js';

export class Background extends DrawableObject {
    static NATURAL_WIDTH = ImageLib.BG.wNatural;
    static NATURAL_HEIGHT = ImageLib.BG.hNatural;
    y = 0;

    static lastPos = 0;
    static lastLayer = -1;
    layer = 0;
    posIndex = 0;
    xAbsolute = 0;

    constructor(layer, path, hCanvas) {
        super(hCanvas).loadImage(path);
        this.setSize(hCanvas);

        if (Background.lastLayer !== layer) {
            Background.lastPos = 0;
        } else {
            Background.lastPos++;
            this.posIndex = Background.lastPos;
        }
        this.layer = layer;
        Background.lastLayer = layer;
    }

    place() {
        Background.lastPos = 0;
        Background.lastLayer = -1;
        this.x = Math.round((this.posIndex - 1) * this.w);
        this.xAbsolute = this.x;
    }

    setSize() {
        this.w = Math.round(Level.BG_WIDTH);
        this.h = this.hCanvas;
    }
}
