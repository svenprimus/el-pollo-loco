import { Level } from '../models/world/level.class.js';
import { Hero } from '../models/game-objects/hero.class.js';
import { Boss } from '../models/game-objects/enemies/boss.class.js';
import { Chicken } from '../models/game-objects/enemies/chicken.class.js';
import { Hatchling } from '../models/game-objects/enemies/hatchling.class.js';
import { Cloud } from '../models/game-objects/cloud.class.js';
import { Background } from '../models/game-objects/background.class.js';
import { ImageLib } from '../models/utility/image-lib.class.js';

export function createLevel_1(wCanvas, hCanvas) {
    // prettier-ignore
    return new Level(
        wCanvas, 
        hCanvas,
        new Hero(wCanvas, hCanvas),
        new Boss(wCanvas, hCanvas),
        [
            new Chicken(wCanvas, hCanvas), 
            new Chicken(wCanvas, hCanvas), 
            new Chicken(wCanvas, hCanvas),
            new Chicken(wCanvas, hCanvas),
            new Chicken(wCanvas, hCanvas),
            new Chicken(wCanvas, hCanvas),
            new Chicken(wCanvas, hCanvas),
            new Chicken(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
            new Hatchling(wCanvas, hCanvas),
        ],
        2,
        [
            new Cloud(ImageLib.BG.clouds[0], wCanvas, hCanvas), 
            new Cloud(ImageLib.BG.clouds[1], wCanvas, hCanvas),
            new Cloud(ImageLib.BG.clouds[0], wCanvas, hCanvas), 
            new Cloud(ImageLib.BG.clouds[1], wCanvas, hCanvas),
            new Cloud(ImageLib.BG.clouds[0], wCanvas, hCanvas), 
            new Cloud(ImageLib.BG.clouds[1], wCanvas, hCanvas),
            new Cloud(ImageLib.BG.clouds[0], wCanvas, hCanvas), 
            new Cloud(ImageLib.BG.clouds[1], wCanvas, hCanvas),
        ],
        4,
        [
            new Background(ImageLib.BG.air, hCanvas),
            new Background(ImageLib.BG.layer_3[1], hCanvas),
            new Background(ImageLib.BG.layer_2[1], hCanvas),
            new Background(ImageLib.BG.layer_1[1], hCanvas),

            new Background(ImageLib.BG.air, hCanvas),
            new Background(ImageLib.BG.layer_3[0], hCanvas),
            new Background(ImageLib.BG.layer_2[0], hCanvas),
            new Background(ImageLib.BG.layer_1[0], hCanvas),

            new Background(ImageLib.BG.air, hCanvas),
            new Background(ImageLib.BG.layer_3[1], hCanvas),
            new Background(ImageLib.BG.layer_2[1], hCanvas),
            new Background(ImageLib.BG.layer_1[1], hCanvas),

            new Background(ImageLib.BG.air, hCanvas),
            new Background(ImageLib.BG.layer_3[0], hCanvas),
            new Background(ImageLib.BG.layer_2[0], hCanvas),
            new Background(ImageLib.BG.layer_1[0], hCanvas),
        ]
    );
}
