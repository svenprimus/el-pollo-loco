import { StatusBar } from '../game-objects/status-bar.class.js';
import { StatusCoins, StatusBottles } from '../game-objects/status-collectables.class.js';
import { Background } from '../game-objects/background.class.js';
import { Cloud } from '../game-objects/cloud.class.js';
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
        this.setDimensions(canvas);
        this.loadLevel(this);
        this.setStatusBarHero();
        this.draw();
        this.checkCollisions();
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // moving objects
        this.ctx.translate(this.camX, 0);
        this.addToMap(this.level.backgrounds);
        this.addToMap(this.level.startLimiter);
        this.addToMap(this.level.hero);
        this.addToMap(this.level.collectables);
        this.addToMap(this.level.enemies);
        this.addToMap(this.level.boss);
        this.addToMap(this.level.thrownAmmo);
        this.addToMap(this.level.clouds);

        // TODO: remove markers
        this.level.hero.drawMarker(this.ctx, Level.START + 1, 0);
        this.level.hero.drawMarker(this.ctx, 0, 0, 'purple');
        this.level.hero.drawMarker(this.ctx, Level.END, 0);
        this.level.hero.drawMarker(this.ctx, 0, this.level.hero.ground, 'green', false);
        this.level.hero.drawMarker(this.ctx, Level.END - Math.min(Level.BG_WIDTH, Level.wCanvas), 0, 'black');
        this.level.hero.drawMarker(
            this.ctx,
            Level.END - Math.min(Level.BG_WIDTH, Level.wCanvas) + this.level.hero.camOffset,
            0,
            'green'
        );

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
        drawble.drawFrame(this.ctx);
        if (drawble instanceof MovableObject) {
            drawble.drawCustomFrame(this.ctx, drawble.getRealDimension(drawble));
        }
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
        this.canvas.width = window.innerWidth * 0.9;
        this.canvas.height = window.innerHeight * 0.8;
        Level.BG_WIDTH = Background.NATURAL_WIDTH / (Background.NATURAL_HEIGHT / this.canvas.height);
    }

    setCamX(x) {
        this.camX = Math.round(x);
        AudioHub.setCamX(this.camX);
    }
    
    loadLevel(world) {
        this.level = createLevel_1(this.canvas.width, this.canvas.height, world);
        this.level.hero.world = this;
        Cloud.world = this;
        this.setCamX(this.level.hero.camOffset);
        this.level.hero.applyLevelSmallerThanCanvasFix();
    }

    setStatusBarHero() {
        const pos = this.canvas.height * 0.05;
        this.level.hero.statusBar = new StatusBar(this.canvas.width, canvas.height, this.level.hero, pos, false);
        this.level.hero.statusCoins = new StatusCoins(this.canvas.height, this.level.hero);
        this.level.hero.statusBottles = new StatusBottles(this.canvas.height, this.level.hero);
    }

    setStatusBarBoss() {
        const y = this.canvas.height * 0.05;
        this.level.boss.statusBar = new StatusBar(this.canvas.width, this.canvas.height, this.level.boss, y, true);
    }
}
