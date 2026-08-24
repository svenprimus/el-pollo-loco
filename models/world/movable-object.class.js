import { DrawableObject } from './drawable-object.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';

export class MovableObject extends DrawableObject {
    speedX = 0.15;
    speedY = 0;
    acceleration = 2.5;
    died = false;
    jumpCount = 0;
    extraJumpAvailable = false;
    hp;
    hpMax;
    atk;
    lastHit = 0;
    ground = 0;
    idAnimate;
    animateFreq;

    constructor(hCanvas) {
        super(hCanvas);
        this.ground = hCanvas - hCanvas * 0.11;
    }

    /**
     * Start animation of current animation sequence given by images-attribute.
     */
    animate(images, frequency = 10, fn = null) {
        this.animateFreq = frequency;
        this.idAnimate = TimingHub.setInterval(
            () => {
                if (fn !== null) {
                    fn();
                } else {
                    this.playAnimation(images);
                }
            },
            1000 / frequency,
            this
        );
    }

    restartAnimate(images, frequency = 10, fn = null) {
        if (TimingHub.stopInterval(this.idAnimate)) {
            this.animate(images, frequency, fn);
        }
    }

    resolveAnimation(animations) {
        for (let state of animations) {
            if (state.condition()) {
                state.animation();
                break;
            }
        }
    }

    /**
     * If the frequency or images differ from previous ones, the animation will be restartet.
     * An initial image is loaded before animation starts. This can set initial state of transition, e.g. walk -> stand
     * @param {array} images
     * @param {number} idFirst
     * @param {number} frequency
     * @param {function} fn
     */
    restartAnimateIfChangedFrequency(images, idFirst, frequency = 10, fn = null) {
        if (
            (this.animateFreq !== frequency && TimingHub.isIntervalSet(this.idAnimate)) ||
            this.img !== this.imgCache[images[this.imgCurrent]]
        ) {
            this.playSingleImage(images, idFirst);
            this.restartAnimate(images, frequency, fn);
        }
    }

    /**
     * Change vertical position by speedX and acceleration. The speedX gets reduced by acceleration.
     */
    applyGravity() {
        TimingHub.setInterval(
            () => {
                if ((this.isJumping() || this.isDead() || this.jumpStarted()) && this.isAboveCanvasBottom()) {
                    this.y = this.isDead()
                        ? this.y - this.speedY
                        : Math.min(this.y - this.speedY, this.ground - this.h);
                    this.speedY -= this.acceleration;
                }
            },
            1000 / Game.FPS,
            this
        );
    }

    fallOut() {
        if (false === this.died) {
            this.died = true;
            this.speedY = 20;
        }
    }

    /**
     * Check if object is above height of visual ground.
     * @returns True if object is by definition in the air.
     */
    isJumping() {
        const isAbove = this.y + this.h < this.ground;
        if (false === isAbove) {
            this.jumpCount = 0;
            this.extraJumpAvailable = false;
        }
        return isAbove;
    }

    jumpStarted() {
        return this.speedY > 0;
    }

    isAboveCanvasBottom() {
        return this.y < this.hCanvas;
    }

    /**
     * Adds 'speedX' to x position.
     */
    moveRight() {
        this.x += this.speedX;
    }

    /**
     * Reduce 'speedX' from x position.
     */
    moveLeft() {
        this.x -= this.speedX;
    }

    /**
     * Moves the object to the left and eventually executes extra function.
     * @param {function} fn to execute in between after every move
     */
    moveLeftSteady(fn = null) {
        const id = TimingHub.setInterval(
            () => {
                this.moveLeft();
                if (fn !== null) {
                    fn();
                }
            },
            1000 / Game.FPS,
            this
        );
        return id;
    }

    /**
     * Add value to 'speedY'.
     */
    jump(impulse) {
        if (0 === this.jumpCount || this.extraJumpAvailable) {
            this.jumpCount++;
            this.speedY = impulse;
            this.y--; // othewise immediatley isJumping will return false and reset double jump
            if (this.extraJumpAvailable) {
                this.extraJumpAvailable = false;
            }
        }
    }

    /**
     * Check if this object collides with other object
     * @param {MovableObject} othr - Object to check collision with
     * @returns
     */
    isColliding(othr) {
        const collided =
            this.x + this.w > othr.x &&
            othr.x + othr.w > this.x &&
            this.y + this.h > othr.y &&
            othr.y + othr.h > this.y;
        return collided;
    }

    isCollidingFromTop(othr) {
        othr.hitByJump =
            othr.isBelow &&
            this.x + this.w > othr.x &&
            othr.x + othr.w > this.x &&
            this.y + this.h > othr.y &&
            this.y + this.h < othr.y + othr.h;
        othr.isBelow = this.y + this.h < othr.y;

        if (othr.hitByJump) {
            TimingHub.setTimeout(() => {
                othr.hitByJump = false;
            }, 1000);
        }
        return othr.hitByJump;
    }

    isCollidingForAmmo(othr) {
        othr.hitByAmmo =
            this.x + this.w > othr.x &&
            othr.x + othr.w > this.x &&
            this.y + this.h > othr.y &&
            othr.y + othr.h > this.y;

        if (othr.hitByAmmo) {
            TimingHub.setTimeout(() => {
                othr.hitByAmmo = false;
            }, 1000);
        }
        return othr.hitByAmmo;
    }

    /**
     * Reduces amount of this hp by given damage and stores last hit time.
     * @param {number} damage - damage from hit
     */
    hit(damage) {
        this.hp = Math.max(this.hp - damage, 0);
        this.lastHit = new Date().getTime();
    }

    isHurt() {
        const timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    /**
     * Check if object is dead.
     * @returns Remaining hp is equal or below 0
     */
    isDead() {
        return this.hp <= 0;
    }

    isIdle() {
        return false === this.isJumping();
    }
}
