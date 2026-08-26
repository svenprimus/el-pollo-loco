import { MovableObject } from '../../world/movable-object.class.js';
import { Level } from '../../world/level.class.js';
import { TimingHub } from '../../utility/timing-hub.class.js';


export class Enemy extends MovableObject {
    hitByJump = false;
    hitByAmmo = false;
    isBelow = false;
    diedBySalsa = false;
    speedFlee = 0;
    isFinished = false;
    isFinalizing = false;

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

    hasFinished() {
        if (false === this.isFinalizing) {
            if (this.isDead() || this.x + this.w < Level.START || this.isFleeing()) {
                this.isFinalizing = true;
                TimingHub.setTimeout(() => {
                    this.isFinished = true;
                }, 10000);
            }
        }
        return this.isFinished;
    }
}
