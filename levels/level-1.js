import { Level } from '../models/world/level.class.js';
import { Hero } from '../models/game-objects/hero.class.js';
import { Bottle } from '../models/game-objects/collectables/bottle.class.js';
import { Coin } from '../models/game-objects/collectables/coin.class.js';
import { Boss } from '../models/game-objects/enemies/boss.class.js';
import { Chicken } from '../models/game-objects/enemies/chicken.class.js';
import { Hatchling } from '../models/game-objects/enemies/hatchling.class.js';
import { Cloud } from '../models/game-objects/cloud.class.js';
import { Background } from '../models/game-objects/background.class.js';
import { StartLimiter } from '../models/game-objects/start-limiter.class.js';
import { ImageLib } from '../models/utility/image-lib.class.js';

/**
 * Creates a new Level.
 * @param {number} wCanvas - width of canvas 
 * @param {number} hCanvas - height of canvas 
 * @returns {Level} - Level Object
 */
export function createLevel_1(wCanvas, hCanvas) {
    // prettier-ignore
    return new Level(
        wCanvas, 
        hCanvas,
        createCharacters(hCanvas),
        createCollectables(hCanvas), 
        createAmbients(hCanvas),
    );
}

/**
 * Creates new instances of living characters.
 * @param {number} hCanvas - height of Canvas
 * @returns {{hero: Hero, boss: Boss, enemies: Enemy[]}}
 */
function createCharacters(hCanvas) {
    let enemies = [];
    for (let i = 0; i < 13; i++) {
        enemies.push(new Chicken(hCanvas));
    }
    for (let i = 0; i < 15; i++) {
        enemies.push(new Hatchling(hCanvas));
    }
    return { hero: new Hero(hCanvas), boss: new Boss(hCanvas), enemies: enemies };
}

/**
 * Creates new instances of collectables and sets number of coin patterns.
 * @param {number} hCanvas - height of Canvas
 * @returns {{coinWallAmount: number, coinBowAmount: number, collectables: Collectable[]}}
 */
function createCollectables(hCanvas) {
    let collectables = [];
    for (let i = 0; i < 10; i++) {
        collectables.push(new Bottle(hCanvas));
    }
    for (let i = 0; i < 35; i++) {
        collectables.push(new Coin(hCanvas));
    }
    return { coinWallAmount: 2, coinBowAmount: 4, collectables: collectables };
}

/**
 * Create Clouds and Backgrounds
 * @param {number} hCanvas - height of Canvas
 * @returns {{
 * cloudsPerPattern: number,
 * clouds: Clouds[],
 * bgPerPattern: number,
 * bgPatternPerLayer: number,
 * backgrounds: Background[],
 * startLimiter: StartLimiter}}
 */
function createAmbients(hCanvas) {
    const clouds = createClouds(hCanvas);
    const bgs = createBackgrounds(hCanvas);
    return {
        cloudsPerPattern: clouds.cloudsPerPattern,
        clouds: clouds.clouds,
        bgPerPattern: bgs.bgPerPattern,
        bgPatternPerLayer: bgs.bgPatternPerLayer,
        backgrounds: bgs.backgrounds,
        startLimiter: new StartLimiter(hCanvas),
    };
}

/**
 * Return the number of clouds per pattern and a Cloud array.
 * @param {number} hCanvas - height of Canvas
 * @returns {{cloudsPerPattern: number, clouds: Clouds[]}}
 */
function createClouds(hCanvas) {
    let clouds = [];
    for (let i = 0; i < 11; i++) {
        clouds.push(new Cloud(ImageLib.BG.clouds[0], hCanvas));
        clouds.push(new Cloud(ImageLib.BG.clouds[1], hCanvas));
    }
    return { cloudsPerPattern: 2, clouds: clouds };
}

/**
 * Return the number of backgrounds per pattern, pattern per layer and a Background array.
 * @param {number} hCanvas - height of Canvas
 * @returns {{ bgPerPattern: number, bgPatternPerLayer: number, backgrounds: Background[] }}
 */
function createBackgrounds(hCanvas) {
    const bgPerPattern = 2;
    const bgPatternPerLayer = 5;
    let backgrounds = [];
    for (let i = 0; i < bgPerPattern * bgPatternPerLayer; i++) {
        backgrounds.push(new Background(0, ImageLib.BG.air, hCanvas));
    }
    for (let i = 0; i < bgPatternPerLayer; i++) {
        backgrounds.push(new Background(1, ImageLib.BG.layer_3[1], hCanvas));
        backgrounds.push(new Background(1, ImageLib.BG.layer_3[0], hCanvas));
    }
    for (let i = 0; i < bgPatternPerLayer; i++) {
        backgrounds.push(new Background(2, ImageLib.BG.layer_2[1], hCanvas));
        backgrounds.push(new Background(2, ImageLib.BG.layer_2[0], hCanvas));
    }
    for (let i = 0; i < bgPatternPerLayer; i++) {
        backgrounds.push(new Background(3, ImageLib.BG.layer_1[1], hCanvas));
        backgrounds.push(new Background(3, ImageLib.BG.layer_1[0], hCanvas));
    }
    return { bgPerPattern: bgPerPattern, bgPatternPerLayer: bgPatternPerLayer, backgrounds: backgrounds };
}
