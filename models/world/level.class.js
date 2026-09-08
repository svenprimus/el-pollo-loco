import { AudioLib } from '../utility/audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { Coin } from '../game-objects/collectables/coin.class.js';

/**
 * Level that contains all game objects, including backgrounds and Start/End limitations.
 * @class
 */
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
    cloudsPerPattern = 0;
    clouds = [];
    bgsPerLayer = 0;
    backgrounds = [];
    startLimiter;
    thrownAmmo = [];
    lostCoins = [];
    isFinished = false;
    isEndSequenceQueued = false;

    /**
     * Construct new Level.
     * @param {number} wCanvas - width of the canvas
     * @param {number} hCanvas - height of the canvas
     * @param {{hero: Hero, boss: Boss, enemies: Enemy[]}} characters
     * @param {{coinWallAmount: number, coinBowAmount: number, collectables: Collectable[]}} collectablesOptions
     * @param {{
     * cloudsPerPattern: number,
     * clouds: Clouds[],
     * bgPerPattern: number,
     * bgPatternPerLayer: number,
     * backgrounds: Background[],
     * startLimiter: StartLimiter}} ambients
     */
    constructor(wCanvas, hCanvas, characters, collectablesOptions, ambients) {
        Level.wCanvas = wCanvas;
        Level.hCanvas = hCanvas;
        this.setCharacters(characters);
        this.setCollectables(collectablesOptions);
        this.setAmbient(ambients);
        this.placeObjects();
        this.startCleaningTasks();
        this.startLevelStateLoop();
        AudioHub.loadSound(AudioLib.GAME.ambient);
        AudioHub.loadSound(AudioLib.GAME.ambientBoss);
    }

    /**
     * Set this levels living characters with default placement.
     * @param {{hero: Hero, boss: Boss, enemies: Enemy[]}} characters
     */
    setCharacters(characters) {
        this.hero = characters.hero;
        this.boss = characters.boss;
        this.enemies = characters.enemies;
    }

    /**
     * Set this levels collectables and coin patterns.
     * @param {{coinWallAmount: number, coinBowAmount: number, collectables: Collectable[]}} collectablesOptions
     */
    setCollectables(collectablesOptions) {
        Coin.wallAmount = collectablesOptions.coinWallAmount;
        Coin.bowAmount = collectablesOptions.coinBowAmount;
        this.collectables = collectablesOptions.collectables;
    }

    /**
     * Set this Cloud and Background instances.
     * @param {{
     * cloudsPerPattern: number,
     * clouds: Clouds[],
     * bgPerPattern: number,
     * bgPatternPerLayer: number,
     * backgrounds: Background[],
     * startLimiter: StartLimiter}} ambients
     */
    setAmbient(ambients) {
        this.clouds = ambients.clouds;
        this.cloudsPerPattern = ambients.cloudsPerPattern;
        this.bgPerPattern = ambients.bgPerPattern;
        this.bgPatternPerLayer = ambients.bgPatternPerLayer;
        this.backgrounds = ambients.backgrounds;
        this.startLimiter = ambients.startLimiter;
        Level.START = -1 * Level.BG_WIDTH;
        Level.END =
            Level.BG_WIDTH * ambients.bgPatternPerLayer * ambients.bgPerPattern -
            ambients.bgPerPattern * Level.BG_WIDTH -
            2;
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
            cloud.place(this.cloudsPerPattern);
        });
        this.backgrounds.forEach((bg) => {
            bg.place(this.bgsPerLayer);
        });
        this.startLimiter.place();
    }

    /**
     * Start all intervals from game objects that do cleanup timers and intervals that are not needed anymore.
     */
    startCleaningTasks() {
        this.cleanObjects(this.thrownAmmo);
        this.cleanObjects(this.enemies);
        this.cleanObjects(this.collectables);
        this.cleanObjects(this.lostCoins);
    }

    /**
     * Start observer loop that will processes win/lose and will play either ambient, boss, or win/lose sound.
     */
    startLevelStateLoop() {
        TimingHub.setInterval(() => {
            this.processLevelState();
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
     * @param {Object} objectArray - Object must implement a hasFinished() method
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
     * @returns {{
     * scored: number,
     * total: number,
     * percentage: number,
     * highscore: number
     * }} - scored: amount of scored points, total: total possible points, percentage: score in % and highscore in %
     */
    getSetScore() {
        const scored = this.hero.statusCoins.count;
        const total = Coin.totalCoinCount;
        const percentage = Math.round((100 * scored) / total);
        let highscore = Level.getHighscoreFromLocalStorage();
        if (percentage > highscore) {
            Level.setHighscoreToLocalStorage(percentage);
        }
        return { scored: scored, total: total, percentage: percentage, highscore: highscore };
    }

    /**
     * Retrievs highscore from local storage.
     * @returns {number} - highscore in percentage from local storage
     */
    static getHighscoreFromLocalStorage() {
        const highscore = localStorage.getItem('level-1.highscore');
        return highscore != null ? highscore : 0;
    }

    /**
     * Stores highscore into local storage.
     * @param {number} percentage
     */
    static setHighscoreToLocalStorage(percentage) {
        localStorage.setItem('level-1.highscore', percentage);
    }

    /**
     * Check and resolve winner- or loser-screen.
     */
    processLevelState() {
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

    /**
     * Setup winner - set hero winner attribute (for its animation), mark end sequence to be queued,
     * play a winner sound, and show the winner screen after 1s (time for ongoing sounds to finish).
     */
    showWinnerScreen() {
        this.hero.win();
        this.isEndSequenceQueued = true;
        TimingHub.setTimeout(() => {
            AudioHub.stopAll();
            AudioHub.playFromStart(AudioLib.GAME.win);
            this.renderWinnerScreen();
            this.isEndSequenceQueued = false;
        }, 1000);
    }

    /**
     * Setup loser - mark end sequence to be queued, play a loser sound,
     * and show the loser screen after 1s (time for ongoing sounds to finish).
     */
    showLoserScreen() {
        this.isEndSequenceQueued = true;
        TimingHub.setTimeout(() => {
            AudioHub.stopAll();
            AudioHub.playFromStart(AudioLib.GAME.lose);
            this.renderLoserScreen();
            this.isEndSequenceQueued = false;
        }, 1000);
    }

    /**
     * Render Winner Screen to overlay above canvas.
     */
    renderWinnerScreen() {
        Level.renderEndscreen('./assets/img/congrats.webp', './assets/img/tequila.webp', this.getSetScore());
    }

    /**
     * Render Loser Screen to overlay above canvas.
     */
    renderLoserScreen() {
        Level.renderEndscreen('./assets/img/muerto.webp', './assets/img/skull.webp', this.getSetScore());
    }

    /**
     * Render Endscreen with given data.
     * @param {string} msgImg - path to end image, e.g. containing a "congrats" message
     * @param {string} endImg - path to end image, e.g. containing a "skull" image
     * @param {{scored: number, total: number, percentage: number, highscore: number}} score - score object
     */
    static renderEndscreen(msgImg, endImg, score) {
        document.getElementById('overlay-endscreen').innerHTML = Level.getEndscreen(msgImg, endImg);
        const stars = Math.floor(score.percentage / (100 / 3));

        for (let i = 0; i < stars; i++) {
            document.getElementById(`star-${i}`).src = './assets/icons/star.svg';
        }
        document.getElementById('current-score').innerHTML =
            `Score: ${score.scored} / ${score.total} (${score.percentage} %)
            <br/>
            ${score.percentage > score.highscore ? 'NEW' : ''} Best: ${
                score.percentage > score.highscore ? score.percentage : score.highscore
            } %`;
    }

    /**
     * Template for Endscreen
     * @param {string} msgImg - path to end image, e.g. containing a "congrats" message
     * @param {string} endImg - path to end image, e.g. containing a "skull" image
     * @returns {string} - HTML string
     */
    static getEndscreen(msgImg, endImg) {
        return /*html*/ `
            <img class="end-message endscreen-animation" src="${msgImg}" alt="endscreen message" />
            <div class="score">
                <img id="star-0" class="optin-0" src="./assets/icons/star-empty.svg" alt="star image">
                <img id="star-1" class="optin-1" src="./assets/icons/star-empty.svg" alt="star image">
                <img id="star-2" class="optin-2" src="./assets/icons/star-empty.svg" alt="star image">
            </div>
            <p id="current-score" class="optin-3"></p>
            <img class="end-img optin-3" src="${endImg}" alt="Tequile poured into a shot glass" /> 
        `;
    }
}
