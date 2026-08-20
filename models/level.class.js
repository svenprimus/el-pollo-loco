class Level {
    static START;
    static END;
    wCanvas = 0;
    hCanvas = 0;
    hero;
    boss;
    enemies;
    cloudsPerLayer = 0;
    clouds;
    bgsPerLayer = 0;
    backgrounds;

    constructor(wCanvas, hCanvas, hero, boss, enemies, cloudsPerLayer, clouds, bgsPerLayer, backgrounds) {
        this.wCanvas = wCanvas;
        this.hCanvas = hCanvas;
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
    }

    placeObjects() {
        this.hero.place(this.wCanvas, this.hCanvas);
        this.boss.place(this.wCanvas, this.hCanvas);
        this.enemies.forEach((enemy) => {
            enemy.place(this.wCanvas, this.hCanvas);
        });
        this.clouds.forEach((cloud) => {
            cloud.place(this.hCanvas, this.cloudsPerLayer);
        });
        this.backgrounds.forEach((bg) => {
            bg.place(this.bgsPerLayer);
        });
    }
}
