import { MovableObject } from '../../world/movable-object.class.js';

export class Enemy extends MovableObject {
    hitByJump = false;
    hitByAmmo = false;
    isBelow = false;
    diedBySalsa = false;
    speedFlee = 0;

    constructor(hCanvas) {
        super(hCanvas);
    }

    isDeadBySalsa() {
        return this.diedBySalsa;
    }

    flee() {
        this.speedX = 15;
        this.speedFlee = 15;
    }

    isFleeing() {
        return this.speedFlee > 0;
    }
}
