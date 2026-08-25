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

    setSize(hDivider, wNatural, hNatural) {
        this.h = this.hCanvas / hDivider;
        this.w = wNatural / (hNatural / this.h);
    }

    setSpeed(factor) {
        this.speedX = Math.random() * factor;
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
