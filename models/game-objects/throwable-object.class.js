import { MovableObject } from '../world/movable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';

export class ThrowableObject extends MovableObject {
    hero;
    isImpacting = false;
    isFinished = false;
    hpMax = 1;

    constructor(hero, hCanvas) {
        super(hCanvas).loadImage(ImageLib.AMMO.midair.imgs[0]);
        this.hero = hero;
        this.loadImagesToCache();
        this.setSize(hCanvas);
        this.applyGravity();
        this.animate(ImageLib.AMMO.midair.imgs);
    }

    setSize(hCanvas) {
        this.h = hCanvas / 6;
        this.w = ImageLib.AMMO.midair.wNatural / (ImageLib.AMMO.midair.hNatural / this.h);
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
        this.speedY = 25;
        this.speedX = factor * 20 + factor * relativeSpeed;

        const idInterval = TimingHub.setInterval(() => {
            if (false === this.isJumping()) {
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
                this.isFinished = true;
            }, 1000 / ImageLib.AMMO.impact.imgs.length);
        }
    }
}
