import { Enemy } from './enemy.class.js';
import { Game } from '../../utility/game.class.js';
import { TimingHub } from '../../utility/timing-hub.class.js';
import { ImageLib } from '../../utility/image-lib.class.js';
import { Level } from '../../world/level.class.js';
import { World } from '../../world/world.class.js';

export class Chicken extends Enemy {
    static spread = 0;
    isJumpingAtr = false;
    idHandler;
    hp = 50;
    hpMax = 50;
    atk = 10;

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.ENEMY.mob_1.walk[2]);
        Chicken.spread = 0; // used in place() after all chicken have been created
        this.loadImagesToCache();
        this.setSize(hCanvas);
        this.setSpeed();
        this.animate(ImageLib.ENEMY.mob_1.walk, this.speedX * 5);
        this.resolve();
        this.applyGravity();
    }

    place(wCanvas, hCanvas) {
        const sections = Math.floor(Level.END / World.BG_WIDTH);
        const section = Chicken.spread++ % sections;
        if (0 === section) {
            this.x = World.BG_WIDTH / 2 + Math.random() * World.BG_WIDTH;
        } else {
            this.x = section * World.BG_WIDTH + Math.random() * World.BG_WIDTH;
        }
        this.y = this.ground - this.h - Math.random() * 15;
    }

    setSize(hCanvas) {
        this.h = hCanvas / 8;
        this.w = ImageLib.ENEMY.mob_1.wNatural / (ImageLib.ENEMY.mob_1.hNatural / this.h);
    }

    setSpeed() {
        this.speedX = Math.random() * 2; // this is walking speed, not the animation speed
    }

    resolve() {
        this.idHandler = this.moveLeftSteady(() => this.statusHandler(), Game.FPS, this);
    }

    statusHandler() {
        if (this.isDead() || this.x + this.w < Level.START) {
            TimingHub.stopInterval(this.idAnimate);
            TimingHub.stopInterval(this.idHandler);
        } else {
            this.randomJump();
        }
    }

    randomJump() {
        if (Math.random() > 0.99 && !this.isJumping()) {
            this.speedX = 4;
            this.jump(20);
            this.isJumpingAtr = true;
            this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.jump, 0, this.speedX * 5);
            this.startResetTimeout();
        }
    }

    startResetTimeout() {
        TimingHub.setTimeout(() => {
            this.speedX = Math.random() * 2;
            this.isJumpingAtr = false;
            this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.walk, 2, this.speedX * 5);
        }, 1000);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_1.walk);
        this.loadImages(ImageLib.ENEMY.mob_1.jump);
        this.loadImages(ImageLib.ENEMY.mob_1.dead);
    }
}
