import { World } from './world.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';

export class Level {
    static START;
    static END;
    static wCanvas = 0;
    static hCanvas = 0;
    hero;
    boss;
    enemies = [];
    collectables = [];
    cloudsPerLayer = 0;
    clouds = [];
    bgsPerLayer = 0;
    backgrounds = [];
    thrownAmmo = [];

    constructor(wCanvas, hCanvas, hero, boss, enemies, collectables, cloudsPerLayer, clouds, bgsPerLayer, backgrounds) {
        Level.wCanvas = wCanvas;
        Level.hCanvas = hCanvas;
        this.hero = hero;
        this.boss = boss;
        this.enemies = enemies;
        this.collectables = collectables;
        this.clouds = clouds;
        this.cloudsPerLayer = cloudsPerLayer;
        this.bgsPerLayer = bgsPerLayer;
        this.backgrounds = backgrounds;
        Level.START = -1 * World.BG_WIDTH;
        Level.END = (World.BG_WIDTH * (backgrounds.length - bgsPerLayer)) / bgsPerLayer;

        this.placeObjects();
        this.cleanObjects(this.thrownAmmo);
        this.cleanObjects(this.enemies);
        this.cleanObjects(this.collectables);
    }

    /**
     * Place game objects onto their desired destination on the map.
     */
    placeObjects() {
        this.hero.place(Level.wCanvas, Level.hCanvas);
        this.boss.place(Level.wCanvas, Level.hCanvas);
        this.enemies.forEach((enemy) => {
            enemy.place(Level.wCanvas, Level.hCanvas);
        });
        this.collectables.forEach((collectable) => {
            collectable.place(Level.wCanvas, Level.hCanvas);
        });
        this.clouds.forEach((cloud) => {
            cloud.place(this.cloudsPerLayer);
        });
        this.backgrounds.forEach((bg) => {
            bg.place(this.bgsPerLayer);
        });
    }

    /**
     * Iterates through given array and removes all elements, that return hasFinished() true.
     * @param {array} objectArray - Object must implement a hasFinished() method
     */
    cleanObjects(objectArray) {
        TimingHub.setInterval(
            () => {
                for (let i = objectArray.length - 1; i >= 0; i--) {
                    if (objectArray[i].hasFinished()) {
                        objectArray.splice(i, 1);
                    }
                }
            },
            100,
            this
        );
    }
}
