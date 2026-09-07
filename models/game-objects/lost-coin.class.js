import { MovableObject } from '../world/movable-object.class.js';
import { ImageLib } from '../utility/image-lib.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Game } from '../utility/game.class.js';

/**
 * Visualisation for lost coins.
 * @class
 */
export class LostCoin extends MovableObject {
    isFinished = false;

    /**
     * Create a new lost coin.
     * @param {number} hCanvas - height of canvas
     */
    constructor(hCanvas) {
        super(hCanvas).loadImage(ImageLib.COIN.rotate[2]);
        this.loadImages(ImageLib.COIN.rotate);
        this.setSizeByHeight(9, ImageLib.COIN.wNatural, ImageLib.COIN.hNatural);
        this.applyGravity();
        this.animate(ImageLib.COIN.rotate, Math.round(25 + Math.random() * 25));
    }

    /**
     * Start losing animation of a coin from given position with random direction.
     * @param {number} x - starting coordinate
     * @param {number} y - starting coordinate
     */
    lose(x, y) {
        this.setDimension(x, y);
        const idInterval = TimingHub.setInterval(() => {
            this.moveLeft();
            TimingHub.setTimeout(() => {
                TimingHub.stopInterval(idInterval);
                TimingHub.stopInterval(this.idGravity);
                this.isFinished = true;
            }, 1500);
        }, 1000 / Game.FPS);
    }

    /**
     * Mark as finished to be cleaned up.
     * @returns {boolean} finished state
     */
    hasFinished() {
        return this.isFinished;
    }

    /**
     * Set starting position and a random speed / direction.
     * @param {number} x - starting coordinate
     * @param {number} y - starting coordinate
     */
    setDimension(x, y) {
        const factor = Math.round(Math.random()) > 0 ? 1 : -1;
        this.x = x - this.w / 2;
        this.y = y;
        this.speedY = 6;
        this.speedX = factor * Math.random() * 10 + factor;
    }
}
