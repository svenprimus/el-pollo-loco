class Cloud extends MovableObject {
    static wIndex = null;
    w = 1920 / 4;
    h = 1080 / 4;
    world;

    constructor(path, wCanvas, hCanvas) {
        super().loadImage(path);

        this.moveLeftSteady(() => this.loopThroughCanvas());
        this.speedX = Math.random() * 0.5;
    }

    place(hCanvas, amountPerLayer) {
        if (0 !== amountPerLayer) {
            if (null == Cloud.wIndex) {
                Cloud.wIndex = -1 * amountPerLayer;
            }
            const index = Math.floor(Cloud.wIndex++ / amountPerLayer);
            this.x = World.BG_WIDTH * index + Math.random() * World.BG_WIDTH;
            this.y = (Math.random() * hCanvas) / 4;
        }
    }

    loopThroughCanvas() {
        if (this.x + this.w < Level.START) {
            this.x = world.cameraX + world.canvas.width + this.w;
        }
    }
}
