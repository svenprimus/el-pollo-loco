import { MovableObject } from '../../world/movable-object.class.js';
import { World } from '../../world/world.class.js';
import { Level } from '../../world/level.class.js';

export class Collectable extends MovableObject {
    static spread = 0;
    hpMax = 1;
    collected = false;

    constructor(hCanvas) {
        super(hCanvas);
        Collectable.spread = 0;
    }

    place() {
        this.x = this.getDefaultX(this.getSection());
        this.y = this.getDefaultY() - Math.random() * 20;
    }

    hasFinished() {
        return this.collected;
    }

    getSection() {
        const sections = Math.floor(Level.END / World.BG_WIDTH);
        return Collectable.spread++ % sections;
    }

    getDefaultX(section) {
        return section * World.BG_WIDTH + Math.random() * World.BG_WIDTH;
    }

    getDefaultY() {
        return this.ground - this.h;
    }
}
