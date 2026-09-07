import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Coin } from '../game-objects/collectables/coin.class.js';

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
    lostCoins = [];
    isFinished = false;
    isEndSequenceQueued = false;

    constructor(
        wCanvas,
        hCanvas,
        hero,
        boss,
        enemies,
        coinWallAmount,
        coinBowAmount,
        collectables,
        cloudsPerLayer,
        clouds,
        bgPerPattern,
        bgPatternPerLayer,
        backgrounds,
        startLimiter
    ) {
        Level.wCanvas = wCanvas;
        Level.hCanvas = hCanvas;
        this.hero = hero;
        this.boss = boss;
        this.enemies = enemies;
        Coin.wallAmount = coinWallAmount;
        Coin.bowAmount = coinBowAmount;
        this.collectables = collectables;
        this.clouds = clouds;
        this.cloudsPerLayer = cloudsPerLayer;
        this.bgPerPattern = bgPerPattern;
        this.bgPatternPerLayer = bgPatternPerLayer;
        this.backgrounds = backgrounds;
        this.startLimiter = startLimiter;
        Level.START = -1 * Level.BG_WIDTH;
        Level.END = Level.BG_WIDTH * bgPatternPerLayer * bgPerPattern - bgPerPattern * Level.BG_WIDTH - 2;
        this.placeObjects();
        this.startCleaningTasks();
        this.startLevelStateLoop();
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
        this.cleanObjects(this.lostCoins);
    }

    startLevelStateLoop() {
        TimingHub.setInterval(() => {
            this.checkLevelState();
            if (false === this.isEndSequenceQueued) {
                if (this.boss.hasSpawned && false === this.boss.isDead() && false === this.hero.isDead()) {
                    AudioHub.stop(AudioLib.GAME.ambient);
                    AudioHub.play(AudioLib.GAME.ambientBoss);
                } else if (AudioHub.hasEnded(AudioLib.GAME.win) && AudioHub.hasEnded(AudioLib.GAME.lose)) {
                    AudioHub.play(AudioLib.GAME.ambient);
                    AudioHub.stop(AudioLib.GAME.ambientBoss);
                }
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

    /**
     * Returns game stats of scored points.
     * @returns {object} - scored: amount of scored points, total: total possible points, percentage: score in %
     */
    getScore() {
        const scored = this.hero.statusCoins.count;
        const total = Coin.totalCoinCount;
        return { scored: scored, total: total, percentage: Math.round((100 * scored) / total) };
    }

    checkLevelState() {
        if (false === this.isFinished) {
            if (this.boss.isDead() && false === this.hero.isDead()) {
                this.isFinished = true;
                this.showWinnerScreen();
            } else if (this.hero.isDead()) {
                this.isFinished = true;
                this.showLoserScreen();
            }
        }
    }

    showWinnerScreen() {
        const score = this.getScore();
        this.hero.win();
        this.isEndSequenceQueued = true;
        TimingHub.setTimeout(() => {
            AudioHub.stopAll();
            AudioHub.playFromStart(AudioLib.GAME.win);
            this.isEndSequenceQueued = false;
        }, 1000);

        console.log('WON! Score: ', score.scored, ' / ', score.total, ' (', score.percentage, '%)!');
    }

    showLoserScreen() {
        const score = this.getScore();
        this.isEndSequenceQueued = true;
        TimingHub.setTimeout(() => {
            AudioHub.stopAll();
            AudioHub.playFromStart(AudioLib.GAME.lose);
            this.isEndSequenceQueued = false;
        }, 1000);

        console.log('LOST! Score: ', score.scored, ' / ', score.total, ' (', score.percentage, '%)!');
    }
}
