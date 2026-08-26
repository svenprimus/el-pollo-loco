import { Enemy } from './enemy.class.js';
import { Game } from '../../utility/game.class.js';
import { TimingHub } from '../../utility/timing-hub.class.js';
import { ImageLib } from '../../utility/image-lib.class.js';
import { Level } from '../../world/level.class.js';
import { World } from '../../world/world.class.js';

export class Chicken extends Enemy {
    static spread = 0;
    idHandler;
    hp = 50;
    hpMax = 50;
    atk = 2.5;

    animations = [
        {
            condition: () => this.isDeadBySalsa(),
            animation: () => this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.drum, 0, this.speedX * 5),
        },
        {
            condition: () => this.isDead(),
            animation: () => this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.dead, 0, this.speedX * 5),
        },
        {
            condition: () => this.isJumping(),
            animation: () => this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.jump, 0, this.speedX * 5),
        },
        {
            condition: () => this.isIdle(),
            animation: () => this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.walk, 2, this.speedX * 5),
        },
    ];

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.ENEMY.mob_1.walk[2]);
        Chicken.spread = 0; // used in place() after all chicken have been created
        this.loadImagesToCache();
        this.setSizeByHeight(8, ImageLib.ENEMY.mob_1.wNatural, ImageLib.ENEMY.mob_1.hNatural);
        this.setSpeed(2);
        this.animate(ImageLib.ENEMY.mob_1.walk, this.speedX * 5);
        this.resolve();
        this.applyGravity();
    }

    place() {
        const sections = Math.floor(Level.END / World.BG_WIDTH);
        const section = Chicken.spread++ % sections;
        if (0 === section) {
            this.x = World.BG_WIDTH / 2 + Math.random() * World.BG_WIDTH;
        } else {
            this.x = section * World.BG_WIDTH + Math.random() * World.BG_WIDTH;
        }
        this.y = this.ground - this.h - Math.random() * 15;
        this.setOffset(ImageLib.ENEMY.mob_1.offset, ImageLib.ENEMY.mob_1.wNatural, ImageLib.ENEMY.mob_1.hNatural);
    }

    resolve() {
        this.idHandler = this.moveLeftSteady(() => this.statusHandler(), Game.FPS, this);
    }

    statusHandler() {
        if (this.isDead() || this.x + this.w < Level.START) {
            TimingHub.stopInterval(this.idAnimate);
            TimingHub.stopInterval(this.idHandler);
            this.stopGravity(1500);
            this.hop();
        } else {
            this.randomJump();
        }
        this.resolveAnimation(this.animations);
    }

    randomJump() {
        if (Math.random() > 0.99 && !this.isJumping()) {
            const funFactor = Math.random() * 3 + 3;
            this.speedX = funFactor + this.speedFlee;
            this.jump(funFactor);
            this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.jump, 0, this.speedX * 5);
            this.startResetTimeout();
        }
    }

    startResetTimeout() {
        TimingHub.setTimeout(() => {
            this.speedX = Math.random() * 2 + this.speedFlee;
        }, 1000);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_1.walk);
        this.loadImages(ImageLib.ENEMY.mob_1.jump);
        this.loadImages(ImageLib.ENEMY.mob_1.dead);
        this.loadImages(ImageLib.ENEMY.mob_1.drum);
    }
}
