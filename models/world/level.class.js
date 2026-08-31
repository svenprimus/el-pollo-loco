import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';

export class Level {
    static START;
    static END;
    static BG_WIDTH;
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
    startLimiter;
    thrownAmmo = [];

    constructor(
        wCanvas,
        hCanvas,
        hero,
        boss,
        enemies,
        collectables,
        cloudsPerLayer,
        clouds,
        bgsPerLayer,
        backgrounds,
        startLimiter
    ) {
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
        this.startLimiter = startLimiter;
        Level.START = -1 * Level.BG_WIDTH;
        Level.END = (Level.BG_WIDTH * (backgrounds.length - bgsPerLayer)) / bgsPerLayer;
        this.placeObjects();
        this.startCleaningTasks();
        this.startAmbientSoundLoop();
        AudioHub.loadSound(AudioLib.GAME.ambient);
        AudioHub.loadSound(AudioLib.GAME.ambientBoss);
    }

    /**
     * Place game objects onto their desired destination on the map.
     */
    placeObjects() {
        this.hero.place();
        this.boss.place();
        this.enemies.forEach((enemy) => {
            enemy.place();
        });
        this.collectables.forEach((collectable) => {
            collectable.place();
        });
        this.clouds.forEach((cloud) => {
            cloud.place(this.cloudsPerLayer);
        });
        this.backgrounds.forEach((bg) => {
            bg.place(this.bgsPerLayer);
        });
        this.startLimiter.place();
    }

    startCleaningTasks() {
        this.cleanObjects(this.thrownAmmo);
        this.cleanObjects(this.enemies);
        this.cleanObjects(this.collectables);
    }

    startAmbientSoundLoop() {
        TimingHub.setInterval(() => {
            if (this.boss.hasSpawned && false === this.boss.isDead()) {
                AudioHub.stop(AudioLib.GAME.ambient);
                AudioHub.play(AudioLib.GAME.ambientBoss);
            } else {
                AudioHub.play(AudioLib.GAME.ambient);
                AudioHub.stop(AudioLib.GAME.ambientBoss);
            }
        }, 500);
    }

    /**
     * Iterates through given array and removes all elements, that return hasFinished() true.
     * @param {array} objectArray - Object must implement a hasFinished() method
     */
    cleanObjects(objectArray) {
        TimingHub.setInterval(() => {
            for (let i = objectArray.length - 1; i >= 0; i--) {
                if (objectArray[i].hasFinished()) {
                    TimingHub.stopInterval(objectArray[i].idAnimate);
                    objectArray.splice(i, 1);
                }
            }
        }, 100);
    }
}
