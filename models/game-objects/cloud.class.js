import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';
import { World } from '../world/world.class.js';
import { ImageLib } from '../../models/utility/image-lib.class.js';

export class Cloud extends MovableObject {
    static wIndex = null;
    w = ImageLib.BG.wNatural / 4;
    h = ImageLib.BG.hNatural / 4;
    static world;

    constructor(path, hCanvas) {
        super(hCanvas).loadImage(path);
        Cloud.wIndex = null; // used in place after all clouds have been created
        this.resolve();
        this.setSpeed();
    }

    place(amountPerLayer) {
        if (0 !== amountPerLayer) {
            if (null == Cloud.wIndex) {
                Cloud.wIndex = -1 * amountPerLayer;
            }
            const index = Math.floor(Cloud.wIndex++ / amountPerLayer);
            this.x = World.BG_WIDTH * index + Math.random() * World.BG_WIDTH;
            this.y = (Math.random() * this.hCanvas) / 4;
        }
    }

    resolve() {
        this.moveLeftSteady(() => {
            this.loopThroughCanvas();
        });
    }

    setSpeed() {
        this.speedX = Math.random() * 0.05;
    }

    loopThroughCanvas() {
        if (this.x + this.w < Level.START) {
            this.x = Cloud.world.cameraX + Level.wCanvas + this.w;
        }
    }
}
