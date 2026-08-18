function createLevel_1(wCanvas, hCanvas) {
    // prettier-ignore
    return new Level(
        new Hero(wCanvas, hCanvas),
        new Boss(wCanvas, hCanvas),
        [
            new Chicken(wCanvas, hCanvas), 
            new Chicken(wCanvas, hCanvas), 
            new Chicken(wCanvas, hCanvas),
            new Chick(wCanvas, hCanvas),
            new Chick(wCanvas, hCanvas),
            new Chick(wCanvas, hCanvas),
            new Chick(wCanvas, hCanvas),
        ],
        [
            new Cloud(ImageLib.BG.clouds[0], wCanvas, hCanvas), 
            new Cloud(ImageLib.BG.clouds[1], wCanvas, hCanvas)
        ],
        [
            new Background(ImageLib.BG.air, hCanvas),
            new Background(ImageLib.BG.layer_3[0], hCanvas),
            new Background(ImageLib.BG.layer_2[0], hCanvas),
            new Background(ImageLib.BG.layer_1[0], hCanvas),

            new Background(ImageLib.BG.air, hCanvas),
            new Background(ImageLib.BG.layer_3[1], hCanvas),
            new Background(ImageLib.BG.layer_2[1], hCanvas),
            new Background(ImageLib.BG.layer_1[1], hCanvas),
        ]
    );
}
