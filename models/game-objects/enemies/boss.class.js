import { Enemy } from './enemy.class.js';
import { ImageLib } from '../../utility/image-lib.class.js';
import { AudioLib } from '../../utility/audio-lib.class.js';
import { AudioHub } from '../../utility/audio-hub.class.js';
import { Level } from '../../world/level.class.js';
import { TimingHub } from '../../utility/timing-hub.class.js';

export class Boss extends Enemy {
    statusBar;
    hp = 500;
    hpMax = 500;
    atk = 5;
    lastAlert = 0;
    isRunningAtr = false;
    isAttackingAtr = false;
    isAttackFinished = false;
    isSpawning = false;
    hasSpawned = false;
    speedX = 3;

    animations = [
        {
            condition: () => this.isDead(),
            animation: () => this.setAnimation(ImageLib.ENEMY.boss_1.dead, 6, ImageLib.ENEMY.boss_1.dead.length - 1),
        },
        {
            condition: () => this.isAttacking(),
            animation: () => this.setAnimation(ImageLib.ENEMY.boss_1.attack, 8),
        },
        {
            condition: () => this.isHurt(),
            animation: () => this.setAnimation(ImageLib.ENEMY.boss_1.hurt, 6),
        },
        {
            condition: () => this.isRunning(),
            animation: () => this.setAnimation(ImageLib.ENEMY.boss_1.walk, 4),
        },
        {
            condition: () => this.isIdle(),
            animation: () => this.setAnimation(ImageLib.ENEMY.boss_1.alert, 8),
        },
    ];

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.ENEMY.boss_1.walk[0]);
        this.loadImagesToCache();
        this.loadSounds(AudioLib.ENEMY.boss_1);
        this.setSizeByHeight(1.8, ImageLib.ENEMY.boss_1.wNatural, ImageLib.ENEMY.boss_1.hNatural);
        this.animate(ImageLib.ENEMY.boss_1.alert, 2);
        this.resolve();
        this.applyGravity();
    }

    place() {
        this.x = Level.END;
        this.ground = this.ground + this.getHFromPer(1);
        this.y = this.ground - this.h;
        this.setOffset(ImageLib.ENEMY.boss_1.offset, ImageLib.ENEMY.boss_1.wNatural, ImageLib.ENEMY.boss_1.hNatural);
    }

    resolve() {
        TimingHub.setInterval(
            () => {
                this.statusHandler();
                this.resolveAnimation(this.animations);
            },
            25
        );
    }

    statusHandler() {
        if (this.hasSpawned) {
            if (this.isDead()) {
                this.hop();
                if (false === this.isAboveCanvasBottom()) {
                    TimingHub.stopInterval(this.idAnimate);
                }
            } else {
                this.steadyAttack();
            }
        }
    }

    steadyAttack() {
        if (new Date().getTime() - this.lastAlert > 3000) {
            if (false === this.reverseDirection && this.x > Level.END - Math.min(Level.BG_WIDTH, Level.wCanvas)) {
                this.pursue();
            } else if (this.x < Level.END - this.w) {
                this.attackAndReturn();
            } else {
                this.reverseDirection = false;
                this.isRunningAtr = false;
                this.isAttackFinished = false;
                this.lastAlert = new Date().getTime();
            }
        }
    }

    pursue() {
        AudioHub.play(AudioLib.ENEMY.boss_1.walk);
        this.speedX = 5;
        this.moveLeft();
        this.isRunningAtr = true;
        this.isAttackFinished = false;
    }

    attackAndReturn() {
        if (false === this.isAttackingAtr && false === this.isAttackFinished) {
            this.attack();
        } else if (this.isAttackFinished) {
            AudioHub.play(AudioLib.ENEMY.boss_1.walk);
            this.moveRight();
            this.isRunningAtr = true;
            this.reverseDirection = true;
        }
    }

    spawn() {
        if (false === this.isSpawning && false === this.hasSpawned) {
            this.isRunningAtr = true;
            this.isSpawning = true;
            AudioHub.play(AudioLib.ENEMY.boss_1.spawn);
            this.startSpawnMovement();
        }
    }
    startSpawnMovement() {
        const id = this.moveLeftSteady(() => {
            if (this.x < Level.END - this.w) {
                this.isRunningAtr = false;
                this.isSpawning = false;
                this.hasSpawned = true;
                this.lastAlert = new Date().getTime();
                this.attack();
                TimingHub.stopInterval(id);
            }
        });
    }

    attack() {
        if (false === this.isAttackingAtr) {
            AudioHub.play(AudioLib.ENEMY.boss_1.attack);
            const id = TimingHub.setTimeout(() => {
                this.isAttackingAtr = false;
                this.isAttackFinished = true;
            }, 1000);
            this.isAttackingAtr = true;
        }
    }

    // TODO may move to MovableObject
    isRunning() {
        return this.isRunningAtr;
    }

    isAttacking() {
        return this.isAttackingAtr;
    }

    /**
     * Play the given animation, if frequency is unchanged, otherwise restart animation with new frequency.
     * Resets idle time.
     * @param {array} images
     * @param {number} frequency
     */
    setAnimation(images, frequency, indexEnd = null) {
        this.restartAnimateIfChanged(images, 0, frequency, null, indexEnd);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.boss_1.walk);
        this.loadImages(ImageLib.ENEMY.boss_1.alert);
        this.loadImages(ImageLib.ENEMY.boss_1.attack);
        this.loadImages(ImageLib.ENEMY.boss_1.hurt);
        this.loadImages(ImageLib.ENEMY.boss_1.dead);
    }
}
