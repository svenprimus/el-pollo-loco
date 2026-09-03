import { StatusBar } from '../game-objects/status-bar.class.js';
import { StatusCoins, StatusBottles } from '../game-objects/status-collectables.class.js';
import { Background } from '../game-objects/background.class.js';
import { Level } from './level.class.js';
import { createLevel_1 } from '../../levels/level-1.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { MovableObject } from './movable-object.class.js';
export class World {
    canvas;
    ctx;
    camX = 0;
    level;

    constructor(canvas) {
        this.setDimensions();
        this.loadLevel(this);
        this.setStatusBarHero();
        this.draw();
        this.checkCollisions();
        this.checkLevelState(); // TODO endscreen
    }

    checkCollisions() {
        TimingHub.setInterval(() => {
            this.checkCollisionWithMobs();
            this.checkCollisionWithBoss();
            this.checkCollisionWithCollectables();
        }, 25);
    }

    checkCollisionWithMobs() {
        this.level.enemies.forEach((enemy) => {
            this.level.hero.resolveCollision(enemy);
            this.level.thrownAmmo.forEach((ammo) => {
                ammo.resolveCollision(enemy, this.level.hero.atk);
            });
        });
    }

    checkCollisionWithBoss() {
        if (false === this.level.boss.isSpawning) {
            this.level.hero.resolveCollision(this.level.boss);
            this.level.thrownAmmo.forEach((ammo) => {
                ammo.resolveCollision(this.level.boss, this.level.hero.atk);
            });
        }
    }

    checkCollisionWithCollectables() {
        this.level.collectables.forEach((collectable) => {
            this.level.hero.resolveCollision(collectable);
        });
    }

    checkLevelState() {
        const id = TimingHub.setInterval(() => {
            if (this.level.boss.isDead() && false === this.level.hero.isDead()) {
                console.log('WON! Score: ', this.level.getScore());
                TimingHub.stopInterval(id);
            } else if (this.level.hero.isDead()) {
                console.log('LOST! Score: ', this.level.getScore());
                TimingHub.stopInterval(id);
            }
        }, 500);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // moving objects
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

        // TODO: remove markers
        // this.level.hero.drawMarker(this.ctx, Level.START + 1, 0);
        // this.level.hero.drawMarker(this.ctx, 0, 0, 'purple');
        // this.level.hero.drawMarker(this.ctx, Level.END, 0);
        // this.level.hero.drawMarker(this.ctx, 0, this.level.hero.ground, 'green', false);
        // this.level.hero.drawMarker(this.ctx, Level.END - Math.min(Level.BG_WIDTH, Level.wCanvas), 0, 'black');
        // this.level.hero.drawMarker(
        //     this.ctx,
        //     Level.END - Math.min(Level.BG_WIDTH, Level.wCanvas) + this.level.hero.camOffset,
        //     0,
        //     'green'
        // );

        this.ctx.translate(-this.camX, 0);
        // fixed objects
        this.addToMap(this.level.hero.statusCoins);
        this.addToMap(this.level.hero.statusBottles);
        this.addToMap(this.level.hero.statusBar);
        this.addToMap(this.level.boss.statusBar);

        requestAnimationFrame(() => this.draw());
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
        // TODO: remove collision markers
        // drawble.drawFrame(this.ctx);
        // if (drawble instanceof MovableObject) {
        //     drawble.drawCustomFrame(this.ctx, drawble.getRealDimension(drawble));
        // }
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
     */
    flipImageBack(drawble) {
        drawble.x *= -1;
        this.ctx.restore();
    }

    setDimensions() {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.canvas.width = document.documentElement.clientWidth * (document.fullscreenElement ? 1 : 0.9);
        this.canvas.height = document.documentElement.clientHeight * (document.fullscreenElement ? 1 : 0.7);
        Level.BG_WIDTH = Math.round(Background.NATURAL_WIDTH / (Background.NATURAL_HEIGHT / this.canvas.height));
        document.documentElement.style.setProperty(
            '--size-btn-mobile',
            `${Math.min(this.canvas.width, this.canvas.height) * 0.1}px`
        );
        document.documentElement.style.setProperty('--size-btn-ui', `${this.canvas.height * 0.05}px`);
    }

    setCamX(x) {
        this.camX = Math.round(x);
        AudioHub.setCamX(this.camX);
        this.immerseBackgrounds();
    }

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

    followCamRight() {
        this.level.hero.camEaseRight = Math.max(this.level.hero.camEaseRight - 0.2, 1);
        const onRunnAdjust = this.camX - this.level.hero.camEaseRight * this.level.hero.getSpeedInPixel() - 10;
        const onRunnStatic = -this.level.hero.x + this.level.hero.camOffset;
        this.setCamX(
            this.level.boss.hasSpawned
                ? this.level.hero.camMax
                : Math.max(onRunnAdjust, onRunnStatic, this.level.hero.camMax)
        );
        this.applyLevelSmallerThanCanvasFix();
    }

    followCamLeft() {
        this.level.hero.camEaseLeft = Math.max(this.level.hero.camEaseLeft - 0.2, 1);
        const onRunnAdjust = this.camX + this.level.hero.camEaseLeft * this.level.hero.getSpeedInPixel() + 10;
        const onRunnStatic = -this.level.hero.x + Level.wCanvas - this.level.hero.w - this.level.hero.camOffset;
        this.setCamX(
            this.level.boss.hasSpawned
                ? this.level.hero.camMax
                : Math.min(onRunnAdjust, onRunnStatic, this.level.hero.camMin)
        );
        this.applyLevelSmallerThanCanvasFix();
    }

    applyLevelSmallerThanCanvasFix() {
        if (Level.wCanvas > Level.END) {
            this.setCamX(-1 * Level.START - 1);
            this.canvas.width = this.camX + Level.END;
        }
    }

    loadLevel(world) {
        this.level = createLevel_1(this.canvas.width, this.canvas.height, world);
        this.level.hero.world = this;
        this.setCamX(this.level.hero.camOffset);
        this.applyLevelSmallerThanCanvasFix();
    }

    setStatusBarHero() {
        const pos = this.canvas.height * 0.075;
        this.level.hero.statusBar = new StatusBar(this.canvas.width, canvas.height, this.level.hero, pos, false);
        this.level.hero.statusCoins = new StatusCoins(this.canvas.height, this.level.hero);
        this.level.hero.statusBottles = new StatusBottles(this.canvas.height, this.level.hero);
    }

    setStatusBarBoss() {
        const y = this.canvas.height * 0.075;
        this.level.boss.statusBar = new StatusBar(this.canvas.width, this.canvas.height, this.level.boss, y, true);
    }
}
