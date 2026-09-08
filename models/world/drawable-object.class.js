/**
 * Object that can be drawn into the canvas.
 * @class
 */
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

    /**
     * Construct a new DrawableObject
     * @param {number} hCanvas - height of canvas
     */
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
     * @param {context} ctx - 2d context of canvas
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        } catch (e) {}
    }

    /**
     * Draw a visible frame around the object.
     * @param {context} ctx - 2d context of canvas
     */
    drawFrame(ctx) {
        if (this.hpMax > 0) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.stroke();

            this.drawMarker(ctx, this.x, this.y);
        }
    }

    /**
     * Draw a frame with custom bounds into the canvas.
     * @param {context} ctx - 2d context of canvas
     * @param {Dimension} bounds
     */
    drawCustomFrame(ctx, bounds) {
        if (this.hpMax > 0) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(bounds.x, bounds.y, bounds.w, bounds.h);
            ctx.stroke();
        }
    }

    /**
     * Draw a short line (marker) into canvas.
     * @param {context} ctx - 2d context of canvas
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     * @param {string} color - color of marker
     * @param {boolean} isVertical - true: vertical marker, false: horizontal marker
     */
    drawMarker(ctx, x, y, color = 'red', isVertical = true) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = color;
        ctx.rect(x, y, isVertical ? 1 : 10, isVertical ? 10 : 1);
        ctx.stroke();
    }

    /**
     * Write a string with preset style (Font 'Titan One') into the canvas.
     * @param {string} text - Text to write
     * @param {context} ctx - 2d context of canvas
     * @param {number} x - coordinates
     * @param {number} y - coordinates
     * @param {number} h - height
     */
    writeWithPresetStyle(text, ctx, x, y, h) {
        ctx.save();
        ctx.font = `${h}px Titan One`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
        ctx.restore();
    }

    /**
     * Iterate and set img-attribute repeatedly through sequence of images.
     * @param {string[]} images - Sequence of image paths for current animation
     */
    playAnimation(images) {
        this.imgCurrent = (this.imgCurrent + 1) % images.length;
        const path = images[this.imgCurrent];
        this.img = this.imgCache[path];
    }

    /**
     * Play an animation until the end index has been reached.
     * @param {string[]} images - Sequence of image paths for current animation
     * @param {number} indexEnd - index to to end animation
     */
    playAnimationUntil(images, indexEnd) {
        this.imgCurrent = Math.min(this.imgCurrent + 1, indexEnd);
        const path = images[this.imgCurrent];
        this.img = this.imgCache[path];
    }

    /**
     * Load a single image from array into current img.
     * @param {string[]} images - Sequence of image paths for current animation
     * @param {number} index - Index from sequence to be loaded into current img.
     */
    playSingleImage(images, index) {
        this.imgCurrent = index;
        const path = images[this.imgCurrent];
        this.img = this.imgCache[path];
    }

    /**
     * Create a new instance for image of given path.
     * @param {string} path - of image to be instantiated
     * @returns {Image} instance
     */
    getNewImage(path) {
        const img = new Image();
        img.src = path;
        return img;
    }

    /**
     * Get height from percentage relative to canvas.
     * @param {number} percent - percent of canvas height.
     * @returns {number} - pixels
     */
    getHFromPer(percent) {
        return (this.hCanvas * percent) / 100;
    }

    /**
     * Set this width and height relative to canvas height and keep ratio.
     * @param {number} divider  - divide canvas height by divider
     * @param {number} wNatural - natural width of image
     * @param {number} hNatural - natural height of image
     */
    setSizeByHeight(divider, wNatural, hNatural) {
        this.h = this.hCanvas / divider;
        this.w = wNatural / (hNatural / this.h);
    }

    /**
     * Set this width and height relative to canvas width and keep ratio.
     * @param {number} divider  - divide canvas width by divider
     * @param {number} wNatural - natural width of image
     * @param {number} hNatural - natural height of image
     */
    setSizeByWidth(divider, wNatural, hNatural) {
        this.w = this.hCanvas / divider;
        this.h = hNatural / (wNatural / this.w);
    }
}
