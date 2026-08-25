export class DrawableObject {
    img;
    imgCache = {};
    imgCurrent = 0;
    x = 0;
    y = 0;
    w = 150;
    h = 100;
    hCanvas = 0;
    reverseDirection = false;

    constructor(hCanvas) {
        this.y = hCanvas; // initially place objects below viewable range
        this.hCanvas = hCanvas;
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
        if (this.hpMax > 0) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, 2, 2);
            ctx.stroke();
        }
    }

    /**
     * Iterate and set img-attribute repeatedly through sequence of images.
     * @param {array} images - Sequence of image paths for current animation
     */
    playAnimation(images) {
        this.imgCurrent = (this.imgCurrent + 1) % images.length;
        const path = images[this.imgCurrent];
        this.img = this.imgCache[path];
    }

    playAnimationUntil(images, indexEnd) {
        this.imgCurrent = Math.min(this.imgCurrent + 1, indexEnd);
        const path = images[this.imgCurrent];
        this.img = this.imgCache[path];
    }

    /**
     * Load a single image from array into current img.
     * @param {array} images
     * @param {number} index
     */
    playSingleImage(images, index) {
        this.imgCurrent = index;
        const path = images[this.imgCurrent];
        this.img = this.imgCache[path];
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

    setSizeByHeight(divider, wNatural, hNatural) {
        this.h = this.hCanvas / divider;
        this.w = wNatural / (hNatural / this.h);
    }

    setSizeByWidth(divider, wNatural, hNatural) {
        this.w = this.hCanvas / divider;
        this.h = hNatural / (wNatural / this.w);
    }
}
