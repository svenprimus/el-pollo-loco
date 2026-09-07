import { TimingHub } from '../../utility/timing-hub.class.js';
import { MovableObject } from '../../world/movable-object.class.js';
import { Level } from '../../world/level.class.js';

/**
 * Collectable object.
 * @class
 */
export class Collectable extends MovableObject {
    static spread = 0;
    hp = 1;
    hpMax = 1;
    collected = false;
    isCollecting = false;

    /**
     * Create a new Collectable item
     * @param {number} hCanvas - height of canvas
     */
    constructor(hCanvas) {
        super(hCanvas);
        Collectable.spread = 0;
    }

    /**
     * Place evenly spread across sections on random position.
     */
    place() {
        this.x = this.getDefaultX(this.getSection());
        this.y = this.getDefaultY() - Math.random() * this.getHFromPer(2);
    }

    /**
     * Collect item and play collect animation.
     * @param {string[]} images - array of image pathes belonging to an animation sequence
     * @param {number} frequency - optional frames per seconds to iterate through the animation
     * @param {number} timeout - timeout to mark finish marker
     */
    collect(animation, frequency, timeout = 1000) {
        if (false === this.isCollecting) {
            this.isCollecting = true;
            this.restartAnimateIfChanged(animation, 0, frequency);
            TimingHub.setTimeout(() => {
                this.collected = true;
            }, timeout);
        }
    }

    /**
     * Is finished?
     * @returns {boolean} collected - true if object has done its job
     */
    hasFinished() {
        return this.collected;
    }

    /**
     * Get section to be placed in, based on current spread.
     * @returns {number} - section
     */
    getSection() {
        const sections = Math.floor(Level.END / Level.BG_WIDTH);
        return Collectable.spread++ % sections;
    }

    /**
     * Returns a random X based on section.
     * @param {number} section
     * @returns {number} - random x-coordinate based on section
     */
    getDefaultX(section) {
        return section * Level.BG_WIDTH + Math.random() * Level.BG_WIDTH;
    }

    /**
     * Returns the ground level.
     * @returns {number} - ground level
     */
    getDefaultY() {
        return this.ground - this.h;
    }
}
