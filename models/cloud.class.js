class Cloud extends MovableObject {
    static wIndex = 0;
    w = 1920 / 4;
    h = 1080 / 4;
    world;

    constructor(path, wCanvas, hCanvas) {
        super().loadImage(path);
        this.x = (Cloud.wIndex++ * wCanvas) / 2 + Math.random() * wCanvas; // ability to overlap
        this.y = (Math.random() * hCanvas) / 4;
        this.moveLeftSteady(() => this.loopThroughCanvas());
        this.speedX = Math.random() * 0.5;
    }

    loopThroughCanvas() {
        if (this.x + this.w < 0) {
            this.x = world.cameraX + world.canvas.width + this.w;
        }
    }
}
