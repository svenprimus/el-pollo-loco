import { MovableObject } from '../world/movable-object.class.js';
import { Level } from '../world/level.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';
import { Controls } from '../utility/controls.class.js';
import { ThrowableObject } from './throwable-object.class.js';
import { StartLimiter } from './start-limiter.class.js';
import { Collectable } from './collectables/collectable.class.js';
import { Bottle } from './collectables/bottle.class.js';
import { Coin } from './collectables/coin.class.js';
import { LostCoin } from './lost-coin.class.js';
import { Enemy } from './enemies/enemy.class.js';

/**
 * Creats a hero.
 * @class
 */
export class Hero extends MovableObject {
    world;
    statusBar;
    statusCoins;
    statusBottles;
    throwables = [];

    speedX = 15;
    hp = 100;
    hpMax = 100;
    atk = 90;
    atkJump = 50;

    isAttackingAtr = false;
    isDrinkingAtr = false;
    isRunningAtr = false;
    isWinner = false;

    camOffset = 0;
    camMax = 0;
    camMin = 0;
    bossSpawnX = 0;
    lastIdleTime = 0;
    lastDrinkTime = 0;
    lastAttack = 0;
    lastBottledUp = 0;

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

    /**
     * Creates a new Hero
     * @param {number} hCanvas - height of canvas
     */
    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.HERO.idle[0]);
        this.loadImagesToCache();
        this.loadSounds();
        this.setSizeByHeight(2, ImageLib.HERO.wNatural, ImageLib.HERO.hNatural);
        this.reload();
        this.animate(ImageLib.HERO.idle, Game.FPS);
        this.resolve();
        this.applyGravity();
    }

    /**
     * Place the Hero to x coordinate 0 an set max/min camera values.
     */
    place() {
        this.setOffset(ImageLib.HERO.offset, ImageLib.HERO.wNatural, ImageLib.HERO.hNatural);
        this.y = this.ground - this.h;
        this.x = 0;
        this.camOffset = Level.BG_WIDTH / 8;
        this.camMax = Level.wCanvas - Level.END;
        this.camMin = Level.BG_WIDTH - 1;
        this.bossSpawnX = Level.END - Math.min(Level.BG_WIDTH, Level.wCanvas) + this.camOffset;
    }

    // #region resolve
    /**
     * Start interval to resolve Action by control and animation.
     */
    resolve() {
        TimingHub.setInterval(() => {
            this.resolveControl();
            this.resolveAnimation(this.animations);
        }, 25);
    }

    /**
     * Resolve actions.
     */
    resolveControl() {
        if (false === this.isDead()) {
            this.resolveAttack();
            this.resolveJump();
            this.resolveDrinking();
            this.resolveRunning();
        } else {
            this.hop();
        }
    }

    /**
     * Resolve attack.
     */
    resolveAttack() {
        if (Controls.ATTACK) {
            this.attack();
        } else {
            this.stopAttacking();
        }
    }

    /**
     * Resolve jump / double jump.
     */
    resolveJump() {
        if (Controls.UP) {
            if (this.jump(5)) {
                AudioHub.stop(AudioLib.HERO.walk);
                AudioHub.playFromStart(AudioLib.HERO.jump);
            }
        } else if (1 === this.jumpCount) {
            this.extraJumpAvailable = true;
        }
    }

    /**
     * Resolve Drinking.
     */
    resolveDrinking() {
        if (Controls.DOWN && false === Controls.UP && false === Controls.ATTACK) {
            this.drink();
        } else {
            this.stopDrinking();
        }
    }

    /**
     * Resolve running.
     */
    resolveRunning() {
        if (Controls.LEFT && false === Controls.RIGHT) {
            this.runLeft();
        } else if (Controls.RIGHT && false === Controls.LEFT) {
            this.runRight();
        } else {
            this.stopRunning();
        }
    }

    /**
     * Resolve collsition with other object.
     * @param {MovableObject} othr - object with potential collision
     */
    resolveCollision(othr) {
        if (false == this.isDead()) {
            const isViableEnemy = false === othr.hitByJump && othr instanceof Enemy;
            if (isViableEnemy && this.isCollidingFromTop(othr)) {
                othr.hit(this.atkJump);
                AudioHub.playFromStart(AudioLib.HERO.bounce);
                this.speedY = 5;
            } else if (isViableEnemy && this.isColliding(othr) && !othr.isFleeing() && !this.isHurt()) {
                this.hit(othr.atk);
                this.loseCoin();
            } else if (othr instanceof Collectable && this.isColliding(othr) && false === othr.collected) {
                this.collect(othr);
            }
        }
    }

    /**
     * Resolve spawn point of boss.
     */
    resolveSpawnpoint() {
        if (false === this.world.level.boss.hasSpawned && this.x >= this.bossSpawnX) {
            this.world.setStatusBarBoss();
            this.world.level.boss.spawn();
            this.world.level.startLimiter.setNewBorder(this.bossSpawnX - this.camOffset - 1);
            this.world.level.enemies.forEach((enemy) => {
                enemy.flee();
            });
        }
    }
    // #endregion resolve

    /**
     * Play the given animation, if frequency is unchanged, otherwise restart animation with new frequency.
     * Resets idle time.
     * @param {string[]} images - path of animation sprites
     * @param {number} frequency - frames per second to iterate through sprites
     * @param {indexEnd} - optional end index of animation
     */
    setAnimation(images, frequency, indexEnd = null) {
        this.lastIdleTime = 0;
        this.restartAnimateIfChanged(images, 0, frequency, null, indexEnd);
    }

    /**
     * Play the given animation for idle states, if frequency is unchanged, otherwise restart animation
     * with new frequency and keeps idle timer.
     * @param {string[]} images - path of animation sprites
     * @param {number} frequency - frames per second to iterate through sprites
     */
    setIdleAnimation(images, frequency) {
        this.restartAnimateIfChanged(images, 0, frequency);
    }

    // #region actions
    /**
     * Run left if possible and follow camera.
     */
    runLeft() {
        this.setRunning();
        this.reverseDirection = true;
        if (this.isAfterStart() && false === this.world.level.boss.isSpawning) {
            this.moveLeft();
            this.world.followCamLeft();
        } else if (false === this.isAfterStart()) {
            this.isAfterStart();
            this.world.level.startLimiter.sayHey();
        }
    }

    /**
     * Actually move left if possible.
     */
    moveLeft() {
        if (this.getFutureLeft() <= StartLimiter.BORDER) {
            this.x = StartLimiter.BORDER;
        } else {
            super.moveLeft();
        }
    }

    /**
     * Run right if possible and follow camera.
     */
    runRight() {
        this.setRunning();
        this.reverseDirection = false;
        if (this.isBeforeEnd() && false === this.world.level.boss.isSpawning) {
            this.resolveSpawnpoint();
            if (false === this.world.level.boss.isSpawning) {
                this.moveRight();
                this.world.followCamRight();
            }
        }
    }

    /**
     * Actually move right if possible.
     */
    moveRight() {
        super.moveRight();
    }

    /**
     * Set running property and play sound.
     */
    setRunning() {
        this.isRunningAtr = true;
        if (false === this.isJumping()) {
            AudioHub.play(AudioLib.HERO.walk);
        }
    }

    /**
     * Unset running property and stop sound.
     */
    stopRunning() {
        AudioHub.stop(AudioLib.HERO.walk);
        this.isRunningAtr = false;
    }

    /**
     * Set attacking property and play sound. Can only attack once per second.
     */
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
        } else if (this.throwables.length === 0) {
            this.statusBottles.shake();
        }
    }

    /**
     * Unset attacking property.
     */
    stopAttacking() {
        this.isAttackingAtr = false;
    }

    /**
     * Collect a bottle or coin.
     * @param {MovableObject} othr - object to collect: instance of Bottle or Coin
     */
    collect(othr) {
        if (othr instanceof Bottle || othr instanceof Coin) {
            othr.collect(this);
        }
    }

    /**
     * Spend an available bottle to throw it. Shifts the bottle into thrownAmmo, that will be cleared later by Level.
     */
    throw() {
        AudioHub.playFromStart(AudioLib.HERO.attack);
        this.statusBottles.spend();
        this.world.level.thrownAmmo.push(this.throwables.shift());
        this.world.level.thrownAmmo[this.world.level.thrownAmmo.length - 1].throw(
            this.x + this.w / 2,
            this.y + this.h / 2,
            this.isRunning() ? this.speedX : 0,
            this.reverseDirection
        );
    }

    /**
     * Lose a coin (with animation) and puts it into cleanable array for Level.
     */
    loseCoin() {
        if (this.statusCoins.count > 0) {
            const lostCoin = new LostCoin(Level.hCanvas);
            lostCoin.lose(this.x + this.w / 2, this.y + this.h / 2);
            this.world.level.lostCoins.push(lostCoin);
            this.statusCoins.lose();
        }
        if (this.isDead()) {
            AudioHub.stop(AudioLib.HERO.walk);
        }
    }

    /**
     * Creates 5 available ammonition.
     */
    reload() {
        for (let i = 0; i < 5; i++) {
            this.throwables.push(new ThrowableObject(this.hCanvas));
        }
    }

    /**
     * Drink if not jumping. Tracks time and heals every second.
     */
    drink() {
        if (this.lastDrinkTime === 0 && false === this.isJumping()) {
            this.lastDrinkTime = new Date().getTime();
            AudioHub.play(AudioLib.HERO.drink);
        }
        const timeNow = new Date().getTime();
        if (timeNow - this.lastDrinkTime > 1000) {
            this.hp = Math.min(this.hp + 10, this.hpMax);
            this.lastDrinkTime = new Date().getTime();
            this.statusBar.setPercentage((100 * this.hp) / this.hpMax);
        }
        this.isDrinkingAtr = true;
    }

    /**
     * Stop drinking and reset time.
     */
    stopDrinking() {
        AudioHub.stopReset(AudioLib.HERO.drink);
        this.isDrinkingAtr = false;
        this.lastDrinkTime = 0;
    }

    /**
     * Set win property.
     */
    win() {
        this.isWinner = true;
    }
    // #endregion actions

    // #region conditions
    /**
     * Is attacking?
     * @returns {boolean} isAttackingAtr - true if attacking
     */
    isAttacking() {
        return this.isAttackingAtr;
    }

    /**
     * Is drinking?
     * @returns {boolean} - true if drinking or winner (winner keep drinking)
     */
    isDrinking() {
        return this.isDrinkingAtr || this.isWinner;
    }

    /**
     * Is running?
     * @returns {boolean} - true if running
     */
    isRunning() {
        return this.isRunningAtr;
    }

    /**
     * Is collecting?
     * @returns {boolean} - true if collected within the last 500ms
     */
    isCollecting() {
        return new Date().getTime() - this.lastBottledUp < 500;
    }

    /**
     * Is sleeping?
     * @returns {boolean} - true if idle for more than 10s
     */
    isIdleLong() {
        if (this.lastIdleTime === 0) {
            this.lastIdleTime = new Date().getTime();
        }
        const isIdleLong = new Date().getTime() - this.lastIdleTime > 10000;
        if (isIdleLong) {
            AudioHub.play(AudioLib.HERO.idleLong);
        }
        return isIdleLong;
    }

    /**
     * Is after start?
     * @returns {boolean} - true after start of level
     */
    isAfterStart() {
        return this.x > StartLimiter.BORDER;
    }

    /**
     * Is before end?
     * @returns {boolean} - true if not reached end of level
     */
    isBeforeEnd() {
        return this.x < Level.END - 1 - this.w;
    }
    // #endregion conditions

    /**
     * Load related animation sprites into cache.
     */
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

    /**
     * Load Hero sounds into cache.
     */
    loadSounds() {
        super.loadSounds(AudioLib.HERO);
    }
}
