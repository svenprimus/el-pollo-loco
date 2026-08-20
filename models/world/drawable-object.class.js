export class DrawableObject {
    img;
    imgCache = {};
    imgCurrent = 0;
    x = 0;
    y = 0;
    w = 150;
    h = 100;
    static FPS;
    constructor(hCanvas) {
        this.y = hCanvas; // initially place objects below viewable range
    }

    /**
     * Load image into cache.
     * @param {string} path - path of image
     */
    loadImage(path) {
        this.img = this.getNewImage(path);
    }

    /**
     * Load given images into cache.
     * @param {array} imgPaths - array of image paths
     */
    loadImages(imgPaths) {
        imgPaths.forEach((path) => {
            this.imgCache[path] = this.getNewImage(path);
        });
    }

    /**
     * Draw the object into the canvas.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image, ', this.img.src);
        }
    }

    /**
     * Draw a visible frame around the object.
     * @param {context} ctx - 2d context of canvas
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.llineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();
    }

    /**
     * Create a new instance for image of given path.
     * @param {string} path - of image to be instantiated
     * @returns image instance
     */
    getNewImage(path) {
        const img = new Image();
        img.src = path;
        return img;
    }
}
