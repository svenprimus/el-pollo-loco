import { World } from './world.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';

export class Level {
    static START;
    static END;
    static wCanvas = 0;
    static hCanvas = 0;
    hero;
    boss;
    enemies;
    cloudsPerLayer = 0;
    clouds;
    bgsPerLayer = 0;
    backgrounds;
    thrownAmmo = [];

    constructor(wCanvas, hCanvas, hero, boss, enemies, cloudsPerLayer, clouds, bgsPerLayer, backgrounds) {
        Level.wCanvas = wCanvas;
        Level.hCanvas = hCanvas;
        this.hero = hero;
        this.boss = boss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.cloudsPerLayer = cloudsPerLayer;
        this.bgsPerLayer = bgsPerLayer;
        this.backgrounds = backgrounds;
        Level.START = -1 * World.BG_WIDTH;
        Level.END = (World.BG_WIDTH * (backgrounds.length - bgsPerLayer)) / bgsPerLayer;

        this.placeObjects();
        this.resolveAmmo();
    }

    placeObjects() {
        this.hero.place(Level.wCanvas, Level.hCanvas);
        this.boss.place(Level.wCanvas, Level.hCanvas);
        this.enemies.forEach((enemy) => {
            enemy.place(Level.wCanvas, Level.hCanvas);
        });
        this.clouds.forEach((cloud) => {
            cloud.place(Level.hCanvas, this.cloudsPerLayer);
        });
        this.backgrounds.forEach((bg) => {
            bg.place(this.bgsPerLayer);
        });
    }

    resolveAmmo() {
        TimingHub.setInterval(
            () => {
                for (let i = this.thrownAmmo.length - 1; i >= 0; i--) {
                    if (this.thrownAmmo[i].isFinished) {
                        this.thrownAmmo.splice(i, 1);
                    }
                }
            },
            100,
            this
        );
    }
}
