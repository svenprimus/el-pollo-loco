import { MovableObject } from '../../world/movable-object.class.js';

export class Enemy extends MovableObject {
    hitByJump = false;
    hitByAmmo = false;
    isBelow = false;
    diedBySalsa = false;

    constructor(hCanvas) {
        super(hCanvas);
    }

    setSize(hCanvas, hDivider, wNatural, hNatural) {
        this.h = hCanvas / hDivider;
        this.w = wNatural / (hNatural / this.h);
    }

    setSpeed(factor) {
        this.speedX = Math.random() * factor;
    }

    isDeadBySalsa() {
        return this.diedBySalsa;
    }
}
