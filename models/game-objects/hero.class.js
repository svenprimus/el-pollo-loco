import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { Game } from '../utility/game.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Controls } from '../utility/controls.class.js';
import { ThrowableObject } from './throwable-object.class.js';
import { Collectable } from './collectables/collectable.class.js';
import { Enemy } from './enemies/enemy.class.js';

export class Hero extends MovableObject {
    world;
    statusBar;
    startIdleTime = 0;
    startDrinkTime = 0;
    cameraOffset = 0;
    speedX = 15;
    hp = 100;
    hpMax = 100;
    atk = 50;
    atkJump = 25;
    isAttackingAtr = false;
    isDrinkingAtr = false;
    isRunningAtr = false;
    throwables = [];
    easeLeftOut = 3;
    easeRightOut = 3;
    lastAttack = 0;
    lastCollected = 0;

    animations = [
        {
            condition: () => this.isDead(),
            animation: () => this.setAnimation(ImageLib.HERO.dead, 5, ImageLib.HERO.dead.length - 1),
        },
        {
            condition: () => this.isAttacking(),
            animation: () => this.setAnimation(ImageLib.HERO.attack, 5),
        },
        {
            condition: () => this.isHurt(),
            animation: () => this.setAnimation(ImageLib.HERO.hurt, 10),
        },
        {
            condition: () => this.isJumping(),
            animation: () => this.setAnimation(ImageLib.HERO.jump, 10),
        },
        {
            condition: () => this.isCollecting(),
            animation: () => this.setAnimation(ImageLib.HERO.collected, 6),
        },
        {
            condition: () => this.isDrinking(),
            animation: () => this.setAnimation(ImageLib.HERO.drink, 4),
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
        this.setSizeByHeight(2, ImageLib.HERO.wNatural, ImageLib.HERO.hNatural);
        this.reload();
        this.animate(ImageLib.HERO.idle, Game.FPS);
        this.resolve();
        this.applyGravity();
    }

    place(wCanvas) {
        this.y = this.ground - this.h;
        this.x = wCanvas / 8;
        this.cameraOffset = this.x;
        this.setOffset(ImageLib.HERO.offset, ImageLib.HERO.wNatural, ImageLib.HERO.hNatural);
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
        this.loadImages(ImageLib.HERO.collected);
    }

    // #region resolve
    resolve() {
        TimingHub.setInterval(
            () => {
                this.resolveControl();
                this.resolveAnimation(this.animations);
            },
            25,
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

    resolveAttack() {
        if (Controls.ATTACK) {
            this.attack();
        } else {
            this.stopAttacking();
        }
    }

    resolveJump() {
        if (Controls.UP) {
            this.jump(5);
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

    resolveCollision(othr) {
        if (false == this.isDead()) {
            const isViableEnemy = false === othr.hitByJump && othr instanceof Enemy;
            if (isViableEnemy && this.isCollidingFromTop(othr)) {
                othr.hit(this.atkJump);
                this.speedY = 5;
            } else if (isViableEnemy && this.isColliding(othr) && false === othr.isFleeing()) {
                this.hit(othr.atk);
            } else if (othr instanceof Collectable && this.isColliding(othr) && false === othr.collected) {
                this.collect(othr);
            }
        }
    }

    resolveSpawnpoint() {
        if (
            false === this.world.level.boss.hasSpawned &&
            this.x > this.world.level.boss.xStart - Level.wCanvas + this.cameraOffset
        ) {
            this.world.setStatusBarBoss();
            this.world.level.boss.spawn();
            this.world.level.enemies.forEach((enemy) => {
                enemy.flee();
            });
        }
    }
    // #endregion resolve

    /**
     * Play the given animation, if frequency is unchanged, otherwise restart animation with new frequency.
     * Resets idle time.
     * @param {array} images
     * @param {number} frequency
     */
    setAnimation(images, frequency, indexEnd = null) {
        this.startIdleTime = 0;
        this.restartAnimateIfChangedFrequency(images, 0, frequency, null, indexEnd);
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
        this.easeRightOut = 3;
        if (this.isAfterStart() && false === this.world.level.boss.isSpawning) {
            super.moveLeft();
            this.followCameraLeft();
        }
    }

    runRight() {
        this.isRunningAtr = true;
        this.reverseDirection = false;
        this.easeLeftOut = 3;
        if (this.isBeforeEnd() && false === this.world.level.boss.isSpawning) {
            this.resolveSpawnpoint();
            if (false === this.world.level.boss.isSpawning) {
                super.moveRight();
                this.followCameraRight();
            }
        }
    }

    stopRunning() {
        this.isRunningAtr = false;
    }

    attack() {
        if (
            false === this.isAttackingAtr &&
            this.throwables.length > 0 &&
            false == this.world.level.boss.isSpawning &&
            new Date().getTime() - this.lastAttack > 1000
        ) {
            this.lastAttack = new Date().getTime();
            this.throw();
            this.isAttackingAtr = true;
        }
    }

    collect(othr) {
        if (othr instanceof Collectable) {
            this.throwables.push(new ThrowableObject(this, this.hCanvas));
            othr.collected = true;
            this.lastCollected = new Date().getTime();
        }
        // TODO: instance of bottle or coin
    }

    throw() {
        this.world.level.thrownAmmo.push(this.throwables.shift());
        this.world.level.thrownAmmo[this.world.level.thrownAmmo.length - 1].throw(
            this.x + this.w / 2,
            this.y + this.h / 2,
            this.isRunning() ? this.speedX : 0,
            this.reverseDirection
        );
    }

    reload() {
        for (let i = 0; i < 5; i++) {
            this.throwables.push(new ThrowableObject(this, this.hCanvas));
        }
    }

    stopAttacking() {
        this.isAttackingAtr = false;
    }

    drink() {
        if (this.startDrinkTime === 0) {
            this.startDrinkTime = new Date().getTime();
        }
        const timeNow = new Date().getTime();
        if (timeNow - this.startDrinkTime > 1000) {
            this.hp = Math.min(this.hp + 10, this.hpMax);
            this.startDrinkTime = 0;
            this.statusBar.setPercentage((100 * this.hp) / this.hpMax);
        }
        this.isDrinkingAtr = true;
    }

    stopDrinking() {
        this.isDrinkingAtr = false;
        this.startDrinkTime = 0;
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

    isCollecting() {
        return new Date().getTime() - this.lastCollected < 500;
    }

    isIdleLong() {
        if (this.startIdleTime === 0) {
            this.startIdleTime = new Date().getTime();
        }
        const timeNow = new Date().getTime();
        return timeNow - this.startIdleTime > 10000;
    }

    isAfterStart() {
        if (this.world.level.boss.hasSpawned) {
            return this.x > this.world.level.boss.xStart - Level.wCanvas;
        } else {
            return this.x > Level.START + (Level.wCanvas - this.w - this.cameraOffset + this.speedX + 1);
        }
    }

    isBeforeEnd() {
        if (this.world.level.boss.hasSpawned) {
            return this.x < this.world.level.boss.xStart - this.w;
        } else {
            return this.x < Level.END - Level.wCanvas + this.cameraOffset - this.speedX;
        }
    }
    // #endregion conditions

    followCameraRight() {
        const distanceToLeftStartingBorder = -this.x + this.cameraOffset;

        this.easeRightOut = Math.max(this.easeRightOut - 0.2, 1);
        // fix camera slowly to bossfight area, or follow character
        this.world.cameraX = this.world.level.boss.hasSpawned
            ? Math.min(this.world.cameraX + 0.1, -1 * (this.world.level.boss.xStart - Level.wCanvas))
            : Math.max(this.world.cameraX - this.easeRightOut * this.speedX - 10, distanceToLeftStartingBorder);
    }

    followCameraLeft() {
        const distanceToRightStartingBorder = -this.x + Level.wCanvas - this.w - this.cameraOffset;
        this.easeLeftOut = Math.max(this.easeLeftOut - 0.2, 1);
        // fix camera slowly to bossfight area, or follow character
        this.world.cameraX = this.world.level.boss.hasSpawned
            ? Math.min(this.world.cameraX + 0.1, -1 * (this.world.level.boss.xStart - Level.wCanvas))
            : Math.min(this.world.cameraX + this.easeLeftOut * this.speedX + 10, distanceToRightStartingBorder);
    }
}
