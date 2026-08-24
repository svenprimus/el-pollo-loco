import { MovableObject } from '../../world/movable-object.class.js';

export class Enemy extends MovableObject {
    hitByJump = false;
    isBelow = false;

    constructor(hCanvas) {
        super(hCanvas);
        // TODO: use or remove
    }
}
