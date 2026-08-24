import { Enemy } from './enemy.class.js';
import { ImageLib } from '../../utility/image-lib.class.js';
import { Level } from '../../world/level.class.js';

export class Boss extends Enemy {
    hp = 500;
    hpMax = 500;
    atk = 20;

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.ENEMY.boss_1.walk[0]);
        this.loadImagesToCache();
        this.setSize(1.8, ImageLib.ENEMY.boss_1.wNatural, ImageLib.ENEMY.boss_1.hNatural);

        this.animate(ImageLib.ENEMY.boss_1.alert, 5);
        this.resolve();
        this.applyGravity();
    }

    place(wCanvas) {
        this.x = Level.END - wCanvas;
        this.y = this.ground - this.h + 10;
    }

    resolve() {
        // TODO
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.boss_1.walk);
        this.loadImages(ImageLib.ENEMY.boss_1.alert);
        this.loadImages(ImageLib.ENEMY.boss_1.attack);
        this.loadImages(ImageLib.ENEMY.boss_1.hurt);
        this.loadImages(ImageLib.ENEMY.boss_1.dead);
    }
}
