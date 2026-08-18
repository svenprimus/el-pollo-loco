class Background extends DrawableObject {
    static wIndex = 0;
    LAYERS = 4;
    y = 0;

    constructor(path, hCanvas) {
        super().loadImage(path);

        this.w = 1920 / (1080 / hCanvas);
        this.h = hCanvas;
        // shift draw position by canvas width after all layers have been planted
        this.x = Math.floor(Math.floor(Background.wIndex++ / this.LAYERS) * this.w);
        console.log(this.x);
    }
}
