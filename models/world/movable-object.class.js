import { DrawableObject } from './drawable-object.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';
import { Level } from './level.class.js';

/**
 * Creats a MovableObject - an object that can be drawn on the canvas
 * and is able to change placement, animate and collide.
 * @class
 */
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

    /** @type {Offset} */
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

    soundDead = null;
    soundHurt = null;

    /**
     * Constructs a new MoveableObject.
     * @param {number} hCanvas - height of canvas
     */
    constructor(hCanvas) {
        super(hCanvas);
        this.ground = hCanvas - hCanvas * 0.11;
    }

    /**
     * Start animation or function of current animation sequence.
     * @param {string[]} images - array of image pathes belonging to an animation sequence
     * @param {number} frequency - optional frames per seconds to iterate through the animation
     * @param {function} fn - optional function to replace normal animation sequence
     * @param {number} indexEnd - optional end-index of animation sequence. If set, the animation will stop here.
     */
    animate(images, frequency = 10, fn = null, indexEnd = null) {
        this.lastAnimateFreq = frequency;
        this.idAnimate = TimingHub.setInterval(() => {
            if (fn !== null) {
                fn();
            } else if (indexEnd !== null) {
                this.playAnimationUntil(images, indexEnd);
            } else {
                this.playAnimation(images);
            }
        }, 1000 / frequency);
    }

    /**
     *
     * @param {string[]} images - array of image pathes belonging to an animation sequence
     * @param {number} idFirst - optional index of first image to be drawn by animation
     * @param {number} frequency - optional frames per seconds to iterate through the animation
     * @param {function} fn - optional function to replace normal animation sequence
     * @param {number} indexEnd - optional end-index of animation sequence. If set, the animation will stop here.
     */
    restartAnimate(images, idFirst = 0, frequency = 10, fn = null, indexEnd = null) {
        if (TimingHub.stopInterval(this.idAnimate)) {
            this.playSingleImage(images, idFirst);
            this.animate(images, frequency, fn, indexEnd);
        }
    }

    /**
     * @typedef {Object} Animation
     * @property {function} condition - function that returns a boolean
     * @property {function} animation - animation function to be executed, when condition is true
     */

    /**
     * Run through the Animation[] array and execute the first animation from which its condition is true.
     * @param {Animation[]} animations
     */
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
     * @param {string[]} images - array of image pathes belonging to an animation sequence
     * @param {number} idFirst - optional index of first image to be drawn by animation
     * @param {number} frequency - optional frames per seconds to iterate through the animation
     * @param {function} fn - optional function to replace normal animation sequence
     */
    restartAnimateIfChanged(images, idFirst, frequency = 10, fn = null, indexEnd = null) {
        if (
            (this.lastAnimateFreq !== frequency && TimingHub.isIntervalSet(this.idAnimate)) ||
            this.img !== this.imgCache[images[this.imgCurrent]]
        ) {
            this.playSingleImage(images, idFirst);
            this.restartAnimate(images, idFirst, frequency, fn, indexEnd);
        }
    }

    /**
     * Loads all sounds from given JSON object. Also stores valid / undefined dead and hurt sound for later use.
     * @param {JSON} basePath - the node in a JSON object that contains the keys which return the file-path of sounds.
     */
    loadSounds(basePath) {
        AudioHub.loadSounds(basePath);
        this.soundDead = basePath['dead'];
        this.soundHurt = basePath['hurt'];
    }

    /**
     * Start an interval to change vertical position by speedX and acceleration. The speedX gets reduced by acceleration.
     */
    applyGravity() {
        this.idGravity = TimingHub.setInterval(() => {
            if (this.isGravityApplicable()) {
                this.y = this.isDead()
                    ? this.y - (this.speedY * Level.hCanvas) / 100
                    : Math.min(this.y - (this.speedY * Level.hCanvas) / 100, this.ground - this.h);
                this.speedY -= this.acceleration;
            }
        }, 1000 / Game.FPS);
    }

    /**
     * Set a timeout after which to stop gravity for this instance.
     * @param {number} timeout
     */
    stopGravity(timeout = 0) {
        TimingHub.setTimeout(() => {
            TimingHub.stopInterval(this.idGravity);
        }, timeout);
    }

    /**
     * Check if gravity can be applied.
     * @returns gravity can be applied
     */
    isGravityApplicable() {
        return (
            (this.isJumping() || this.isDead() || this.isJumpStarted()) &&
            this.isAboveCanvasBottom() &&
            this.isGravityAllowed
        );
    }

    /**
     * Hop and die. Sets a small vertical speed and this died property.
     */
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

    /**
     * Returns the new x coordinate if we would move further right.
     * @returns {number} - x coordinates of next potential right movement iteration.
     */
    getFutureRight() {
        return this.x + this.getSpeedInPixel();
    }

    /**
     * Returns the new x coordinate if we would move further left.
     * @returns {number} - x coordinates of next potential left movement iteration.
     */
    getFutureLeft() {
        return this.x - this.getSpeedInPixel();
    }

    /**
     * Convert and return the speed to a number of pixel based on background width.
     * @returns  {number} - pixel per movement iteration
     */
    getSpeedInPixel() {
        return (Level.BG_WIDTH * this.speedX) / 1000;
    }

    /**
     * Start interval to steady move the object to the left and eventually executes extra function.
     * @param {function} fn - to execute in between after every move
     */
    moveLeftSteady(fn = null) {
        const id = TimingHub.setInterval(() => {
            this.moveLeft();
            if (fn !== null) {
                fn();
            }
        }, 1000 / Game.FPS);
        return id;
    }

    /**
     * Add value to 'speedY'. And note double jump availability.
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
        return this.speedY === percentImpulse;
    }

    /**
     * Reduces amount of this hp by given damage and stores last hit time / update statusbar.
     * If a sound is available, a death/hurt sound is played.
     * @param {number} damage - damage from hit
     */
    hit(damage) {
        this.lastHit = new Date().getTime();
        this.hp = Math.max(this.hp - damage, 0);
        if (this.statusBar) {
            this.statusBar.setPercentage((100 * this.hp) / this.hpMax);
        }
        if (this.isDead() && this.soundDead) {
            AudioHub.playFromStart(this.soundDead);
        } else if (this.soundHurt) {
            AudioHub.play(this.soundHurt);
        }
    }

    /**
     * Check if this object collides with other object by real frame.
     * @param {MovableObject} othr - Object to check collision with
     * @returns {boolean} - true if collided
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

    /**
     * Check if this object collides form top to bottom with other object by real frame.
     * If hit, it sets a 1s jump-hit immunity to the victim.
     * @param {MovableObject} othr - Object to check collision with
     * @returns {boolean} - true if collided
     */
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

    /**
     * Check if this projectile object collides with other object by real frame.
     * If hit, it sets a 1s projectile immunity to the victim.
     * @param {MovableObject} othr - Object to check collision with
     * @returns {boolean} - true if collided
     */
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
     * @returns {boolean} - True if object is by definition in the air.
     */
    isJumping() {
        const isAbove = this.y + this.h < this.ground;
        if (false === isAbove) {
            this.jumpCount = 0;
            this.extraJumpAvailable = false;
        }
        return isAbove;
    }

    /**
     * Check if a jump has been initiated.
     * @returns {boolean} - true if speed is > 0
     */
    isJumpStarted() {
        return this.speedY > 0;
    }

    /**
     * Check if object below Canvas.
     * @returns {boolean} - true if object is below Canvas.
     */
    isAboveCanvasBottom() {
        return this.y < this.hCanvas;
    }

    /**
     * Checks if object was hit within the last 500ms.
     * @returns {boolean} - true if object was hit within the last 500ms.
     */
    isHurt() {
        const timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    /**
     * Check if object is dead.
     * @returns {boolean} - Remaining hp is equal or below 0
     */
    isDead() {
        return this.hp <= 0;
    }

    /**
     * Checks if object is standing on the ground
     * @returns {boolean} - true if not jumping
     */
    isIdle() {
        return false === this.isJumping();
    }

    /**
     * Set the collision offsets based on natural size.
     * @param {Offset} offset
     * @param {number} wNatural
     * @param {number} hNatural
     */
    setOffset(offset, wNatural, hNatural) {
        this.offset.top = (offset.top * this.h) / hNatural;
        this.offset.bottom = (offset.bottom * this.h) / hNatural;
        this.offset.right = (offset.right * this.w) / wNatural;
        this.offset.left = (offset.left * this.w) / wNatural;
    }

    /**
     * Update the real dimensions of this and a further object.
     * Should be used before checking collision of those objects.
     * @param {MovableObject} othr
     */
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

    /**
     * Get the real dimension of given object.
     * @param {MovableObject} mo
     * @returns {Dimension} - dimension object
     */
    getRealDimension(mo) {
        return {
            x: mo.x + mo.offset.left,
            y: mo.y + mo.offset.top,
            w: mo.w - mo.offset.left - mo.offset.right,
            h: mo.h - mo.offset.top - mo.offset.bottom,
        };
    }

    /**
     * Set a random speed, randomized by given factor.
     * @param {number} factor
     */
    setSpeed(factor) {
        this.speedX = Math.random() * factor;
    }
}
