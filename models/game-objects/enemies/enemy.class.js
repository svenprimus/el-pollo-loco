import { MovableObject } from '../../world/movable-object.class.js';
import { Level } from '../../world/level.class.js';
import { TimingHub } from '../../utility/timing-hub.class.js';


/**
 * A small superset of methods used by enemies.
 * @class
 */
export class Enemy extends MovableObject {
    hitByJump = false;
    hitByAmmo = false;
    isBelow = false;
    diedBySalsa = false;
    speedFlee = 0;
    isFinished = false;
    isFinalizing = false;

    /**
     * Create a new Enemy
     * @param {number} hCanvas height of Canvas 
     */
    constructor(hCanvas) {
        super(hCanvas);
    }

    /**
     * Marks if died by salsa (used to display different animation).
     * @returns {boolean} true if died by salsa
     */
    isDeadBySalsa() {
        return this.diedBySalsa;
    }

    /**
     * Set high speed to flee (if boss spawns).
     */
    flee() {
        this.speedX = 15;
        this.speedFlee = 15;
    }

    /**
     * Is currently fleeing? 
     * @returns {boolean} true if currently fleeing
     */
    isFleeing() {
        return this.speedFlee > 0;
    }

    /**
     * Check marker if object can be cleaned up by level (if dead or moved outside level).
     * @returns {boolean} true if object has done its job
     */
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
