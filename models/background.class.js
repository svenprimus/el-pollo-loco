class Background extends DrawableObject {
    static wIndex = null;
    static LAYERS = null;
    static NATURAL_WIDTH = 1920;
    static NATURAL_HEIGHT = 1080;
    y = 0;

    constructor(path, hCanvas) {
        super().loadImage(path);
        this.w = 1920 / (1080 / hCanvas);
        this.h = hCanvas;
    }

    place(amountPerLayer) {
        if (0 !== amountPerLayer) {
            if (null == Background.wIndex) {
                Background.wIndex = -1 * amountPerLayer;
                Background.LAYERS = amountPerLayer;
            }
            // shift draw position by canvas width after all layers have been planted
            const index = Math.floor(Background.wIndex++ / Background.LAYERS);
            this.x = index > 0 ? index * this.w - 1 : index * this.w + 1;
        }
    }
}
