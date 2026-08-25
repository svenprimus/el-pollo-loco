import { Enemy } from './enemy.class.js';
import { TimingHub } from '../../utility/timing-hub.class.js';
import { ImageLib } from '../../utility/image-lib.class.js';
import { Level } from '../../world/level.class.js';
import { World } from '../../world/world.class.js';

export class Hatchling extends Enemy {
    static spread = -1;
    hp = 20;
    hpMax = 20;
    atk = 1;

    animations = [
        {
            condition: () => this.isDeadBySalsa(),
            animation: () => this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_2.drum, 0, this.speedX * 5),
        },
        {
            condition: () => this.isDead(),
            animation: () => this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_2.dead, 0, this.speedX * 5),
        },
        {
            condition: () => this.isIdle(),
            animation: () => this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_2.walk, 2, this.speedX * 5),
        },
    ];

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.ENEMY.mob_2.walk[2]);
        Hatchling.spread = -1; // used in place() after all hatchlings have been created
        this.loadImagesToCache();
        this.setSize(16, ImageLib.ENEMY.mob_2.wNatural, ImageLib.ENEMY.mob_2.hNatural);
        this.setOffset(ImageLib.ENEMY.mob_2.offset, ImageLib.ENEMY.mob_2.wNatural, ImageLib.ENEMY.mob_2.hNatural);
        this.setSpeed(2);
        this.animate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
        this.resolve();
        this.applyGravity();
    }

    place() {
        const sections = Math.floor(Level.END / World.BG_WIDTH);
        Hatchling.spread = Hatchling.spread + 2 >= sections ? 1 : (Hatchling.spread + 2) % sections;

        this.x = Hatchling.spread * World.BG_WIDTH + Math.random() * 50 + 0.8 * World.BG_WIDTH;
        this.y = this.ground - this.h - Math.random() * 15;
    }

    resolve() {
        this.idHandler = this.moveLeftSteady(() => this.statusHandler());
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_2.walk);
        this.loadImages(ImageLib.ENEMY.mob_2.dead);
        this.loadImages(ImageLib.ENEMY.mob_2.drum);
    }

    statusHandler() {
        if (this.isDead() || this.x + this.w < Level.START) {
            TimingHub.stopInterval(this.idAnimate);
            TimingHub.stopInterval(this.idHandler);
            this.fallOut();
        } else {
            this.randomFury();
        }
        this.resolveAnimation(this.animations);
    }

    randomFury() {
        if (Math.random() > 0.99) {
            this.speedX = 4 + this.speedFlee;
            this.restartAnimate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
            TimingHub.setTimeout(() => {
                this.speedX = Math.random() * 2 + this.speedFlee;
                this.restartAnimate(ImageLib.ENEMY.mob_2.walk, this.speedX * 5);
            }, 750);
        }
    }
}
