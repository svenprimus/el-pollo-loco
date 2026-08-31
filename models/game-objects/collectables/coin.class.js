import { Collectable } from './collectable.class.js';
import { ImageLib } from '../../utility/image-lib.class.js';
import { Level } from '../../world/level.class.js';

export class Coin extends Collectable {
    static WALL_SIZE = 3;
    static wallAmount = 0;
    static wallItems = 0;
    static wallLastX = 0;
    static wallLastY = 0;
    static wallCount = 0;

    static BOW_SIZE = 4;
    static bowAmount = 0;
    static bowItems = 0;
    static bowLastX = 0;
    static bowLastY = 0;
    static bowCount = 0;
    static bowReverse = false;

    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.COIN.rotate[2]);
        this.resetStatics();
        this.loadImagesToCache();
        this.setSizeByHeight(8, ImageLib.COIN.wNatural, ImageLib.COIN.hNatural);
        this.animate(ImageLib.COIN.rotate, Math.round(4 + Math.random() * 4));
        this.isGravityAllowed = false;
        this.applyGravity();
    }

    place() {
        const section = this.getSection();

        if (Coin.wallCount < Coin.wallAmount) {
            this.placeWall(section);
        } else if (Coin.bowCount < Coin.bowAmount) {
            this.placeBow(section);
        } else {
            super.place();
            this.y -= (Math.random() * Level.hCanvas) / 1.5;
        }
        this.setOffset(ImageLib.COIN.offset, ImageLib.COIN.wNatural, ImageLib.COIN.hNatural);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.COIN.rotate);
    }

    placeWall(section) {
        if (Coin.wallItems > 0 && Coin.wallItems < Coin.WALL_SIZE) {
            this.x = Coin.wallLastX;
            this.y = Coin.wallLastY + this.h;
        } else {
            Coin.wallItems = 0;
            this.x = this.getDefaultX(section);
            this.y = this.getDefaultY() - Level.hCanvas / 3 - (Math.random() * Level.hCanvas) / 2.35;
        }
        this.snapshotWall();
    }

    placeBow(section) {
        if (Coin.bowItems > 0 && Coin.bowItems < Coin.BOW_SIZE) {
            this.x = Coin.bowLastX + this.w * 0.35 * Coin.bowItems * Coin.bowReverse;
            this.y = Coin.bowLastY - this.h * (Coin.BOW_SIZE - Coin.bowItems) * 0.35;
        } else {
            Coin.bowItems = 0;
            this.x = this.getDefaultX(section);
            this.y = this.getDefaultY() - (Math.random() * Level.hCanvas) / 2;
            Coin.bowReverse = Math.round(Math.random()) === 0 ? 1 : -1;
        }
        this.snapshotBow();
    }

    collect(hero) {
        if (false === this.isCollecting) {
            super.collect(ImageLib.COIN.rotate, 40, 1500);
            hero.statusCoins.collect();
            this.hop();
            this.isGravityAllowed = true;
            this.stopGravity(1500);
        }
    }

    snapshotWall() {
        Coin.wallLastX = this.x;
        Coin.wallLastY = this.y;
        Coin.wallItems++;
        Coin.wallCount = Coin.wallItems === Coin.WALL_SIZE ? Coin.wallCount + 1 : Coin.wallCount;
    }

    snapshotBow() {
        Coin.bowLastX = this.x;
        Coin.bowLastY = this.y;
        Coin.bowItems++;
        Coin.bowCount = Coin.bowItems === Coin.BOW_SIZE ? Coin.bowCount + 1 : Coin.bowCount;
    }

    resetStatics() {
        Coin.wallItems = 0;
        Coin.wallLastX = 0;
        Coin.wallLastY = 0;
        Coin.wallCount = 0;
        Coin.bowItems = 0;
        Coin.bowLastX = 0;
        Coin.bowLastY = 0;
        Coin.bowCount = 0;
    }
}
