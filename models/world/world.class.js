import { StatusBar } from '../game-objects/status-bar.class.js';
import { Background } from '../game-objects/background.class.js';
import { Cloud } from '../game-objects/cloud.class.js';
import { createLevel_1 } from '../../levels/level-1.js';
import { TimingHub } from '../utility/timing-hub.class.js';
export class World {
    canvas;
    ctx;
    cameraX = 0;
    level;
    statusBar = new StatusBar();
    static BG_WIDTH = 0; // width of one background (can be larger than canvas width)

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        World.BG_WIDTH = Background.NATURAL_WIDTH / (Background.NATURAL_HEIGHT / canvas.height);

        // TODO we could do this, but requires reload as it is
        // this.canvas.width = window.innerWidth * 0.9;
        // this.canvas.height = window.innerHeight * 0.9;
        this.loadLevel();
        this.draw();
        this.level.hero.world = this;
        Cloud.world = this;
        this.checkCollisions();
    }

    checkCollisions() {
        TimingHub.setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.level.hero.isColliding(enemy)) {
                    this.level.hero.hit(enemy.atk);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.addToMap(this.level.backgrounds);

        // this.ctx.translate(-this.cameraX, 0);
        // Space for fixed objects
        // this.addToMap(this.statusBar);
        // this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.level.hero);
        this.addToMap(this.level.enemies);
        this.addToMap(this.level.boss);
        this.addToMap(this.level.thrownAmmo);
        this.addToMap(this.level.clouds);
        this.ctx.translate(-this.cameraX, 0);

        const self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * Add (draw) given object or objects to map.
     * @param {DrawableObject|DrawableObject[]} drawbles - one or multiple objects to be added to map
     */
    addToMap(drawbles) {
        if (Array.isArray(drawbles)) {
            drawbles.forEach((o) => {
                this.drawObject(o);
            });
        } else {
            this.drawObject(drawbles);
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

    loadLevel() {
        this.level = createLevel_1(this.canvas.width, this.canvas.height);
    }
}
