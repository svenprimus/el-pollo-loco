import { MovableObject } from '../world/movable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';

export class ThrowableObject extends MovableObject {
    hero;
    isImpacting = false;
    isFinished = false;
    isCollided = false;
    hpMax = 1;

    constructor(hero, hCanvas) {
        super(hCanvas).loadImage(ImageLib.AMMO.midair.imgs[0]);
        this.hero = hero;
        this.loadImagesToCache();
        this.setSizeByHeight(6, ImageLib.AMMO.midair.wNatural, ImageLib.AMMO.midair.hNatural);
        this.applyGravity();
        this.animate(ImageLib.AMMO.midair.imgs);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.AMMO.midair.imgs);
        this.loadImages(ImageLib.AMMO.impact.imgs);
        this.loadImages(ImageLib.AMMO.collectable.imgs);
    }

    throw(x, y, relativeSpeed, isReversed) {
        const factor = isReversed ? 1 : -1;

        this.x = x - this.w / 2;
        this.y = y;
        this.setOffset(ImageLib.AMMO.midair.offset, ImageLib.AMMO.midair.wNatural, ImageLib.AMMO.midair.hNatural);

        this.speedY = 5;
        this.speedX = factor * 20 + factor * relativeSpeed;

        const idInterval = TimingHub.setInterval(() => {
            if (false === this.isJumping() || this.isCollided) {
                this.impact(idInterval);
            } else {
                this.moveLeft();
                this.restartAnimateIfChangedFrequency(ImageLib.AMMO.midair.imgs, 0);
            }
        }, 1000 / Game.FPS);
    }

    impact(idInterval) {
        if (false === this.isImpacting) {
            this.isImpacting = true;
            this.speedX = 0;
            this.restartAnimateIfChangedFrequency(ImageLib.AMMO.impact.imgs, 0, 2 * ImageLib.AMMO.impact.imgs.length);
            TimingHub.setTimeout(() => {
                TimingHub.stopInterval(idInterval);
                TimingHub.stopInterval(this.idGravity);
                this.isFinished = true;
            }, 400);
        }
    }

    resolveCollision(enemy, damage) {
        if (false == enemy.hitByAmmo && this.isCollidingForAmmo(enemy)) {
            enemy.hit(damage);
            enemy.diedBySalsa = enemy.isDead();
            this.isCollided = true;
        }
    }

    hasFinished() {
        return this.isFinished;
    }
}
