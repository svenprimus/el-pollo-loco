import { DrawableObject } from './drawable-object.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';
import { Level } from './level.class.js';

export class MovableObject extends DrawableObject {
    speedX = 0.15;
    speedY = 0;
    acceleration = 0.5;
    isGravityAllowed = true;

    died = false;
    jumpCount = 0;
    extraJumpAvailable = false;
    hp;
    hpMax;
    atk;
    ground = 0;
    idGravity;
    idAnimate;
    lastAnimateFreq = 0;
    lastHit = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    rX = 0;
    rY = 0;
    rW = 0;
    rH = 0;

    constructor(hCanvas) {
        super(hCanvas);
        this.ground = hCanvas - hCanvas * 0.11;
    }

    /**
     * Start animation of current animation sequence given by images-attribute.
     */
    animate(images, frequency = 10, fn = null, indexEnd = null) {
        this.lastAnimateFreq = frequency;
        this.idAnimate = TimingHub.setInterval(
            () => {
                if (fn !== null) {
                    fn();
                } else if (indexEnd !== null) {
                    this.playAnimationUntil(images, indexEnd);
                } else {
                    this.playAnimation(images);
                }
            },
            1000 / frequency,
            this
        );
    }

    restartAnimate(images, frequency = 10, fn = null, indexEnd = null) {
        if (TimingHub.stopInterval(this.idAnimate)) {
            this.animate(images, frequency, fn, indexEnd);
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
    restartAnimateIfChangedFrequency(images, idFirst, frequency = 10, fn = null, indexEnd = null) {
        if (
            (this.lastAnimateFreq !== frequency && TimingHub.isIntervalSet(this.idAnimate)) ||
            this.img !== this.imgCache[images[this.imgCurrent]]
        ) {
            this.playSingleImage(images, idFirst);
            this.restartAnimate(images, frequency, fn, indexEnd);
        }
    }

    /**
     * Change vertical position by speedX and acceleration. The speedX gets reduced by acceleration.
     */
    applyGravity() {
        // TODO: throwable still does not clean all intervals (more?)
        this.idGravity = TimingHub.setInterval(
            () => {
                if (this.isGravityApplicable()) {
                    this.y = this.isDead()
                        ? this.y - (this.speedY * Level.hCanvas) / 100
                        : Math.min(this.y - (this.speedY * Level.hCanvas) / 100, this.ground - this.h);
                    this.speedY -= this.acceleration;
                }
            },
            1000 / Game.FPS,
            this
        );
    }

    stopGravity(timeout = 0) {
        const idTimeout = TimingHub.setTimeout(() => {
            TimingHub.stopInterval(this.idGravity);
            TimingHub.clearTimeout(idTimeout);
        }, timeout);
    }

    isGravityApplicable() {
        return (
            (this.isJumping() || this.isDead() || this.isJumpStarted()) &&
            this.isAboveCanvasBottom() &&
            this.isGravityAllowed
        );
    }

    hop() {
        if (false === this.died) {
            this.died = true;
            this.speedY = 4;
        }
    }

    /**
     * Adds 'speedX' by percentage to canvas to x position.
     */
    moveRight() {
        this.x += this.getSpeedInPixel();
    }

    /**
     * Reduce 'speedX' by percentage to canvas from x position.
     */
    moveLeft() {
        this.x -= this.getSpeedInPixel();
    }

    getSpeedInPixel() {
        return (Level.wCanvas * this.speedX) / 1000;
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
    jump(percentImpulse) {
        if (0 === this.jumpCount || this.extraJumpAvailable) {
            this.jumpCount++;
            this.speedY = percentImpulse;
            this.y--; // othewise immediatley isJumping will return false and reset double jump
            if (this.extraJumpAvailable) {
                this.extraJumpAvailable = false;
            }
        }
    }

    /**
     * Reduces amount of this hp by given damage and stores last hit time.
     * @param {number} damage - damage from hit
     */
    hit(damage) {
        this.lastHit = new Date().getTime();
        this.hp = Math.max(this.hp - damage, 0);
        if (this.statusBar) {
            this.statusBar.setPercentage((100 * this.hp) / this.hpMax);
        }
    }

    /**
     * Check if this object collides with other object
     * @param {MovableObject} othr - Object to check collision with
     * @returns
     */
    isColliding(othr) {
        this.updateRealDimension(othr);
        const collided =
            this.rX + this.rW > othr.rX &&
            othr.rX + othr.rW > this.rX &&
            this.rY + this.rH > othr.rY &&
            othr.rY + othr.rH > this.rY;
        return collided;
    }

    isCollidingFromTop(othr) {
        this.updateRealDimension(othr);
        othr.hitByJump =
            othr.isBelow &&
            this.rX + this.rW > othr.rX &&
            othr.rX + othr.rW > this.rX &&
            this.rY + this.rH > othr.rY &&
            this.rY + this.rH < othr.rY + othr.rH;
        othr.isBelow = this.rY + this.rH < othr.rY;

        if (othr.hitByJump) {
            TimingHub.setTimeout(() => {
                othr.hitByJump = false;
            }, 1000);
        }
        return othr.hitByJump;
    }

    isCollidingForAmmo(othr) {
        this.updateRealDimension(othr);
        othr.hitByAmmo =
            this.rX + this.rW > othr.rX &&
            othr.rX + othr.rW > this.rX &&
            this.rY + this.rH > othr.rY &&
            othr.rY + othr.rH > this.rY;

        if (othr.hitByAmmo) {
            TimingHub.setTimeout(() => {
                othr.hitByAmmo = false;
            }, 1000);
        }
        return othr.hitByAmmo;
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

    isJumpStarted() {
        return this.speedY > 0;
    }

    isAboveCanvasBottom() {
        return this.y < this.hCanvas;
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

    drawRealFrame(ctx) {
        const real = this.getRealDimension(this);
        if (this.hpMax > 0) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(real.x, real.y, real.w, real.h);
            ctx.stroke();
        }
    }

    setOffset(offset, wNatural, hNatural) {
        this.offset.top = (offset.top * this.h) / hNatural;
        this.offset.bottom = (offset.bottom * this.h) / hNatural;
        this.offset.right = (offset.right * this.w) / wNatural;
        this.offset.left = (offset.left * this.w) / wNatural;
    }

    updateRealDimension(othr) {
        const realThis = this.getRealDimension(this);
        const realOthr = this.getRealDimension(othr);
        this.rX = realThis.x;
        this.rY = realThis.y;
        this.rW = realThis.w;
        this.rH = realThis.h;

        othr.rX = realOthr.x;
        othr.rY = realOthr.y;
        othr.rW = realOthr.w;
        othr.rH = realOthr.h;
    }

    getRealDimension(mo) {
        return {
            x: mo.x + mo.offset.left,
            y: mo.y + mo.offset.top,
            w: mo.w - mo.offset.left - mo.offset.right,
            h: mo.h - mo.offset.top - mo.offset.bottom,
        };
    }

    setSpeed(factor) {
        this.speedX = Math.random() * factor;
    }
}
