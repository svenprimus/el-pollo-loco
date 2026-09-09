import { StatusBar } from '../game-objects/status-bar.class.js';
import { StatusCoins, StatusBottles } from '../game-objects/status-collectables.class.js';
import { Background } from '../game-objects/background.class.js';
import { Level } from './level.class.js';
import { createLevel_1 } from '../../levels/level-1.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { AudioLib } from '../utility/audio-lib.class.js';

/**
 * Creats a World. Class to load leven, draw it, and update interactions.
 * @class
 */
export class World {
    canvas;
    ctx;
    camX = 0;
    level;

    /**
     * Constructs new World.
     */
    constructor() {
        this.setDimensions();
        this.loadLevel();
        this.setStatusBarHero();
        this.draw();
        this.checkCollisions();
    }

    /**
     * Start interval to check collisions every 25ms.
     */
    checkCollisions() {
        TimingHub.setInterval(() => {
            this.checkCollisionWithMobs();
            this.checkCollisionWithBoss();
            this.checkCollisionWithCollectables();
        }, 25);
    }

    /**
     * Check and resolve collision for each enemy with hero and projectile.
     */
    checkCollisionWithMobs() {
        this.level.enemies.forEach((enemy) => {
            this.level.hero.resolveCollision(enemy);
            this.level.thrownAmmo.forEach((ammo) => {
                ammo.resolveCollision(enemy, this.level.hero.atk);
            });
        });
    }

    /**
     * Check and resolve collision from hero and projectile with boss.
     */
    checkCollisionWithBoss() {
        if (false === this.level.boss.isSpawning) {
            this.level.hero.resolveCollision(this.level.boss);
            this.level.thrownAmmo.forEach((ammo) => {
                ammo.resolveCollision(this.level.boss, this.level.hero.atk);
            });
        }
    }

    /**
     * Check and resolve collision from hero with collectable.
     */
    checkCollisionWithCollectables() {
        this.level.collectables.forEach((collectable) => {
            this.level.hero.resolveCollision(collectable);
        });
    }

    /**
     * Draw all drawbleObjects into canvas as fast as possible.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMovingObjects();
        this.drawFixedObjects();
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draw all objects move relative to the canvas.
     */
    drawMovingObjects() {
        this.ctx.translate(this.camX, 0);
        this.addToMap(this.level.backgrounds);
        this.addToMap(this.level.clouds);
        this.addToMap(this.level.startLimiter);
        this.addToMap(this.level.hero);
        this.addToMap(this.level.collectables);
        this.addToMap(this.level.enemies);
        this.addToMap(this.level.boss);
        this.addToMap(this.level.thrownAmmo);
        this.addToMap(this.level.lostCoins);
        this.ctx.translate(-this.camX, 0);
    }

    /**
     * Draw all objects that stay fixed relative to canvas.
     */
    drawFixedObjects() {
        this.addToMap(this.level.hero.statusCoins);
        this.addToMap(this.level.hero.statusBottles);
        this.addToMap(this.level.hero.statusBar);
        this.addToMap(this.level.boss.statusBar);
    }

    /**
     * Add (draw) given object or objects to map.
     * @param {DrawableObject|DrawableObject[]} drawbles - one or multiple objects to be added to map
     */
    addToMap(drawbles) {
        if (drawbles) {
            if (Array.isArray(drawbles)) {
                drawbles.forEach((o) => {
                    this.drawObject(o);
                });
            } else {
                this.drawObject(drawbles);
            }
        }
    }

    /**
     * Draw a single object on the map.
     * @param {DrawableObject} drawble - to be drawn on map
     */
    drawObject(drawble) {
        if (drawble.reverseDirection) {
            this.flipImage(drawble);
        }
        drawble.draw(this.ctx);
        if (drawble.reverseDirection) {
            this.flipImageBack(drawble);
        }
    }

    /**
     * Flip image horizontally.
     * @param {DrawableObject} drawble
     */
    flipImage(drawble) {
        this.ctx.save();
        this.ctx.translate(drawble.w, 0);
        this.ctx.scale(-1, 1);
    }

    /**
     * Restore image direction horizontally.
     * @param {DrawableObject} drawble
     */
    flipImageBack(drawble) {
        drawble.x *= -1;
        this.ctx.restore();
    }

    /**
     * Set canvas, button sizes and background width.
     */
    setDimensions() {
        this.ctx = canvas.getContext('2d');
        this.setCanvasSize();
        this.setButtonSize();
        Level.BG_WIDTH = Math.round(Background.NATURAL_WIDTH / (Background.NATURAL_HEIGHT / this.canvas.height));
    }

    /**
     * Resizes the canvas and overlays based on fullscreen status. It can be used e.g. on changing device orientation.
     */
    setCanvasSize() {
        this.canvas = canvas;
        const cWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const cHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
        this.canvas.width = document.fullscreenElement ? cWidth : Math.min(cWidth * 0.6, 1920);
        this.canvas.height = document.fullscreenElement ? cHeight : Math.min(cHeight * 0.6, 1080);
        document.getElementById('canvas').style.borderRadius = document.fullscreenElement ? 0 : '50px';
        document.getElementById('overlay').style.borderRadius = document.fullscreenElement ? 0 : '50px';
    }

    /**
     * Set the button size variables according to canvas size.
     */
    setButtonSize() {
        const doc = document.documentElement;
        const cWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const cHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
        const mobileBase = getComputedStyle(doc).getPropertyValue('--size-btn-mobile-base-factor');
        const uiBase = getComputedStyle(doc).getPropertyValue('--size-btn-ui-base-factor');
        doc.style.setProperty('--size-btn-mobile', `${Math.min(cWidth, cHeight) * mobileBase}px`);
        doc.style.setProperty('--size-btn-ui', `${this.canvas.height * uiBase}px`);
    }

    /**
     * Set camera to new natural position and shift the backgrounds for immersion.
     * @param {number} x - View position
     */
    setCamX(x) {
        this.camX = Math.round(x);
        AudioHub.setCamX(this.camX);
        this.immerseBackgrounds();
    }

    /**
     * Shift the individual background-layer positions relative to level progress, unless in boss-fight.
     */
    immerseBackgrounds() {
        this.level.backgrounds.forEach((bg) => {
            if (bg.layer === 1) {
                bg.x = Math.round(bg.xAbsolute - this.camX * 0.8);
            } else if (bg.layer === 2) {
                bg.x = Math.round(bg.xAbsolute - this.camX * 0.6);
            }
        });

        if (false === this.level.boss.isSpawning && false === this.level.boss.hasSpawned) {
            this.level.clouds.forEach((cloud) => {
                cloud.x = cloud.xAbsolute - this.camX * 0.5;
            });
        }
    }

    /**
     * Resolve and set camera position when hero is moving right.
     */
    followCamRight() {
        const onRunnAdjust = this.camX - this.level.hero.getSpeedInPixel() - 5;
        const onRunnStatic = -this.level.hero.x + this.level.hero.camOffset;
        this.setCamX(
            this.level.boss.hasSpawned
                ? this.level.hero.camMax
                : Math.max(onRunnAdjust, onRunnStatic, this.level.hero.camMax)
        );
        this.applyLevelSmallerThanCanvasFix();
    }

    /**
     * Resolve and set camera position when hero is moving left.
     */
    followCamLeft() {
        const onRunnAdjust = this.camX + this.level.hero.getSpeedInPixel() + 5;
        const onRunnStatic = -this.level.hero.x + Level.wCanvas - this.level.hero.w - this.level.hero.camOffset;
        this.setCamX(
            this.level.boss.hasSpawned
                ? this.level.hero.camMax
                : Math.min(onRunnAdjust, onRunnStatic, this.level.hero.camMin)
        );
        this.applyLevelSmallerThanCanvasFix();
    }

    /**
     * Cut the canvas width if the screen is wider than the level.
     * Note: level backgrounds are calculated based on height, so we must not cut height.
     */
    applyLevelSmallerThanCanvasFix() {
        if (Level.wCanvas > Level.END) {
            this.setCamX(-1 * Level.START - 1);
            this.canvas.width = this.camX + Level.END;
        }
    }

    /**
     * Load level and assets, set cam.
     */
    loadLevel() {
        this.level = createLevel_1(this.canvas.width, this.canvas.height, this);
        this.level.hero.world = this;
        this.setCamX(this.level.hero.camOffset);
        this.applyLevelSmallerThanCanvasFix();
        AudioHub.loadOrResetSound(AudioLib.GAME.win);
        AudioHub.loadOrResetSound(AudioLib.GAME.lose);
    }

    /**
     * Update the hero status bars (health, coins, bottles).
     */
    setStatusBarHero() {
        const pos = this.canvas.height * 0.075;
        this.level.hero.statusBar = new StatusBar(this.canvas.width, canvas.height, this.level.hero, pos, false);
        this.level.hero.statusCoins = new StatusCoins(this.canvas.height, this.level.hero);
        this.level.hero.statusBottles = new StatusBottles(this.canvas.height, this.level.hero);
    }

    /**
     * Update the boss status bar.
     */
    setStatusBarBoss() {
        const y = this.canvas.height * 0.075;
        this.level.boss.statusBar = new StatusBar(this.canvas.width, this.canvas.height, this.level.boss, y, true);
    }
}
