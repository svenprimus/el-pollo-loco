import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { Game } from '../utility/game.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Controls } from '../utility/controls.class.js';

export class Hero extends MovableObject {
    world;
    startIdleTime = 0;
    cameraOffset = 0;
    speedX = 15;
    hp = 100;
    hpMax = 100;
    atk = 50;
    isAttackingAtr = false;
    isDrinkingAtr = false;
    isRunningAtr = false;

    animations = [
        {
            condition: () => this.isDead(),
            animation: () => this.setAnimation(ImageLib.HERO.dead, 5),
        },
        {
            condition: () => this.isHurt(),
            animation: () => this.setAnimation(ImageLib.HERO.hurt, 10),
        },
        {
            condition: () => this.isAttacking(),
            animation: () => this.setAnimation(ImageLib.HERO.attack, 5),
        },
        {
            condition: () => this.isJumping(),
            animation: () => this.setAnimation(ImageLib.HERO.jump, 10),
        },
        {
            condition: () => this.isDrinking(),
            animation: () => this.setAnimation(ImageLib.HERO.drink, 5),
        },
        {
            condition: () => this.isRunning(),
            animation: () => this.setAnimation(ImageLib.HERO.walk, Game.FPS),
        },
        {
            condition: () => this.isIdleLong(),
            animation: () => this.setIdleAnimation(ImageLib.HERO.idleLong, 5),
        },
        {
            condition: () => this.isIdle(),
            animation: () => this.setIdleAnimation(ImageLib.HERO.idle, 5),
        },
    ];

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.HERO.idle[0]);
        this.loadImagesToCache();
        this.setSize(hCanvas);
        this.animate(ImageLib.HERO.idle, Game.FPS);
        this.resolve();
        this.applyGravity();
    }

    place(wCanvas, hCanvas) {
        this.y = this.ground - this.h;
        this.x = wCanvas / 8;
        this.cameraOffset = this.x;
    }

    setSize(hCanvas) {
        this.h = hCanvas / 2;
        this.w = ImageLib.HERO.wNatural / (ImageLib.HERO.hNatural / this.h);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.HERO.idle);
        this.loadImages(ImageLib.HERO.idleLong);
        this.loadImages(ImageLib.HERO.walk);
        this.loadImages(ImageLib.HERO.jump);
        this.loadImages(ImageLib.HERO.hurt);
        this.loadImages(ImageLib.HERO.dead);
        this.loadImages(ImageLib.HERO.drink);
        this.loadImages(ImageLib.HERO.attack);
    }

    // #region resolve
    resolve() {
        TimingHub.setInterval(
            () => {
                this.resolveControl();
                this.resolveAnimation();
            },
            Game.FPS,
            this
        );
    }

    resolveControl() {
        if (false === this.isDead()) {
            this.resolveAttack();
            this.resolveJump();
            this.resolveDrinking();
            this.resolveRunning();
        } else {
            this.fallOut();
        }
    }

    resolveAnimation() {
        for (let state of this.animations) {
            if (state.condition()) {
                state.animation();
                break;
            }
        }
    }

    resolveAttack() {
        if (Controls.ATTACK) {
            this.attack();
        } else {
            this.stopAttacking();
        }
    }

    resolveJump() {
        if (Controls.UP) {
            this.jump(25);
        } else if (1 === this.jumpCount) {
            this.extraJumpAvailable = true;
        }
    }

    resolveDrinking() {
        if (Controls.DOWN && false === Controls.UP && false === Controls.ATTACK) {
            this.drink();
        } else {
            this.stopDrinking();
        }
    }

    resolveRunning() {
        if (Controls.LEFT && false === Controls.RIGHT) {
            this.runLeft();
        } else if (Controls.RIGHT && false === Controls.LEFT) {
            this.runRight();
        } else {
            this.stopRunning();
        }
    }
    // #endregion resolve

    /**
     * Play the given animation, if frequency is unchanged, otherwise restart animation with new frequency.
     * Resets idle time.
     * @param {array} images
     * @param {number} frequency
     */
    setAnimation(images, frequency) {
        this.startIdleTime = 0;
        this.restartAnimateIfChangedFrequency(images, 0, frequency);
    }

    /**
     * Play the given animation for idle states, if frequency is unchanged, otherwise restart animation
     * with new frequency and keeps idle timer.
     * @param {array} images
     * @param {number} frequency
     */
    setIdleAnimation(images, frequency) {
        this.restartAnimateIfChangedFrequency(images, 0, frequency);
    }

    // #region actions
    runLeft() {
        this.isRunningAtr = true;
        this.reverseDirection = true;
        if (this.isAfterStart()) {
            super.moveLeft();
            const distanceToRightStartingBorder = -this.x + this.world.canvas.width - this.w - this.cameraOffset;
            this.world.cameraX = Math.min(this.world.cameraX + this.speedX + 10, distanceToRightStartingBorder);
        }
    }

    runRight() {
        this.isRunningAtr = true;
        this.reverseDirection = false;
        if (this.isBeforeEnd()) {
            super.moveRight();
            const distanceToLeftStartingBorder = -this.x + this.cameraOffset;
            this.world.cameraX = Math.max(this.world.cameraX - this.speedX - 10, distanceToLeftStartingBorder);
        }
    }

    stopRunning() {
        this.isRunningAtr = false;
    }

    attack() {
        this.isAttackingAtr = true;
    }

    stopAttacking() {
        this.isAttackingAtr = false;
    }

    drink() {
        this.isDrinkingAtr = true;
    }

    stopDrinking() {
        this.isDrinkingAtr = false;
    }
    // #endregion actions

    // #region conditions
    isAttacking() {
        return this.isAttackingAtr;
    }

    isDrinking() {
        return this.isDrinkingAtr;
    }

    isRunning() {
        return this.isRunningAtr;
    }

    isIdleLong() {
        if (this.startIdleTime === 0) {
            this.startIdleTime = new Date().getTime();
        }
        const timeNow = new Date().getTime();
        return timeNow - this.startIdleTime > 10000;
    }

    isIdle() {
        return false === this.isJumping();
    }

    isAfterStart() {
        return this.x > Level.START + (this.world.canvas.width - this.w - this.cameraOffset + this.speedX + 1);
    }

    isBeforeEnd() {
        return this.x < Level.END - this.world.canvas.width + this.cameraOffset - this.speedX;
    }
    // #endregion conditions
}
