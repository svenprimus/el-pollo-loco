import { MovableObject } from '../world/movable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';

/**
 * A throwable object that can impact.
 * @class
 */
export class ThrowableObject extends MovableObject {
    isImpacting = false;
    isFinished = false;
    isCollided = false;
    hpMax = 1;

    /**
     * Constructs a ThrowableObject.
     * @param {number} hCanvas - height of canvas
     */
    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.AMMO.midair.imgs[0]);
        this.loadImagesToCache();
        AudioHub.loadSound(AudioLib.AMMO.impact);
        this.setSizeByHeight(6, ImageLib.AMMO.midair.wNatural, ImageLib.AMMO.midair.hNatural);
        this.applyGravity();
        this.animate(ImageLib.AMMO.midair.imgs);
    }

    /**
     * Load related animation sprites into cache.
     */
    loadImagesToCache() {
        this.loadImages(ImageLib.AMMO.midair.imgs);
        this.loadImages(ImageLib.AMMO.impact.imgs);
        this.loadImages(ImageLib.AMMO.collectable.imgs);
    }

    /**
     * Throw the object from starting point. On impact start impact animation and stop after 1000ms.
     * @param {number} x - starting coordinate
     * @param {number} y - starting coordinate
     * @param {number} relativeSpeed - starting speed (should consider hero speed)
     * @param {boolean} isReversed - true: throw left, false: throw right
     */
    throw(x, y, relativeSpeed, isReversed) {
        this.setDimension(x, y, relativeSpeed, isReversed);
        const idInterval = TimingHub.setInterval(() => {
            if (false === this.isJumping() || this.isCollided) {
                this.impact(idInterval);
            } else {
                this.moveLeft();
                this.restartAnimateIfChanged(ImageLib.AMMO.midair.imgs, 0);
            }
        }, 1000 / Game.FPS);
    }

    /**
     * Play impact animation and play audio. Mark as finished (to be cleaned up by Level).
     * @param {number} idInterval - impact animation interval to be stopped after impact animation
     */
    impact(idInterval) {
        if (false === this.isImpacting) {
            this.isImpacting = true;
            this.speedX = 0;
            AudioHub.playFromStart(AudioLib.AMMO.impact);
            this.restartAnimateIfChanged(ImageLib.AMMO.impact.imgs, 0, 2 * ImageLib.AMMO.impact.imgs.length);
            TimingHub.setTimeout(() => {
                TimingHub.stopInterval(idInterval);
                TimingHub.stopInterval(this.idGravity);
                this.isFinished = true;
            }, 400);
        }
    }

    /**
     * Resolve collsition from projectile and enemy.
     * @param {MovableObject} enemy - enemy that may have been hit
     * @param {number} damage - damage to apply on impact with enemy
     */
    resolveCollision(enemy, damage) {
        if (false == enemy.hitByAmmo && this.isCollidingForAmmo(enemy)) {
            enemy.hit(damage);
            enemy.diedBySalsa = enemy.isDead();
            this.isCollided = true;
        }
    }

    /**
     * Return finished state of object.
     * @returns true if object finished its job
     */
    hasFinished() {
        return this.isFinished;
    }

    /**
     * Set dimentions and placement of object.
     * @param {number} x - starting coordinate
     * @param {number} y - starting coordinate
     * @param {number} relativeSpeed - starting speed (should consider hero speed)
     * @param {boolean} isReversed - true: throw left, false: throw right
     */
    setDimension(x, y, relativeSpeed, isReversed) {
        const factor = isReversed ? 1 : -1;

        this.x = x - this.w / 2;
        this.y = y;
        this.setOffset(ImageLib.AMMO.midair.offset, ImageLib.AMMO.midair.wNatural, ImageLib.AMMO.midair.hNatural);

        this.speedY = 5;
        this.speedX = factor * 20 + factor * relativeSpeed;
    }
}
