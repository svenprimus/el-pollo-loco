import { TimingHub } from '../../utility/timing-hub.class.js';
import { MovableObject } from '../../world/movable-object.class.js';
import { World } from '../../world/world.class.js';
import { Level } from '../../world/level.class.js';

export class Collectable extends MovableObject {
    static spread = 0;
    hp = 1;
    hpMax = 1;
    collected = false;
    isCollecting = false;

    constructor(hCanvas) {
        super(hCanvas);
        Collectable.spread = 0;
    }

    place() {
        this.x = this.getDefaultX(this.getSection());
        this.y = this.getDefaultY() - Math.random() * this.getHFromPer(2);
    }

    collect(animation, frequency, timeout = 1000) {
        if (false === this.isCollecting) {
            this.isCollecting = true;
            this.restartAnimateIfChanged(animation, 0, frequency);
            TimingHub.setTimeout(() => {
                this.collected = true;
            }, timeout);
        }
    }

    hasFinished() {
        return this.collected;
    }

    getSection() {
        const sections = Math.floor(Level.END / Level.BG_WIDTH);
        return Collectable.spread++ % sections;
    }

    getDefaultX(section) {
        return section * Level.BG_WIDTH + Math.random() * Level.BG_WIDTH;
    }

    getDefaultY() {
        return this.ground - this.h;
    }
}
