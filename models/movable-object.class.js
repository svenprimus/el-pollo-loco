class MovableObject extends DrawableObject {
    speedX = 0.15;
    speedY = 0;
    acceleration = 2.5;
    hp = 100;
    atk = 10;
    lastHit = 0;
    reverseDirection = false; // TODO: move to DrawableObject?
    groundFromBottom = 0;
    idAnimate;
    animateFreq;
    constructor(hCanvas) {
        super();
        this.groundFromBottom = hCanvas * 0.11;
    }

    /**
     * Start animation of current animation sequence given by images-attribute.
     */
    animate(images, frequency = 10, fn = null) {
        this.animateFreq = frequency;
        this.idAnimate = setStoppableInterval(() => {
            if (fn !== null) {
                fn();
            } else {
                this.playAnimation(images);
            }
        }, 1000 / frequency);
    }

    restartAnimate(images, frequency = 10, fn = null) {
        if (clearStoppableInterval(this.idAnimate)) {
            this.animate(images, frequency, fn);
        }
    }

    /**
     * If the frequency differs from previous frequency, the animation will be restartet.
     * An initial image is loaded before animation starts. This can set initial state of transition, e.g. walk -> stand
     * @param {array} images 
     * @param {number} idFirst 
     * @param {number} frequency 
     * @param {function} fn 
     */
    restartAnimateIfChangedFrequency(images, idFirst, frequency = 10, fn = null) {
        if (this.animateFreq !== frequency && intervalIds.indexOf(this.idAnimate) > 0) {
            this.playSingleImage(images, idFirst);
            this.restartAnimate(images, frequency, fn);
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
     * Change vertical position by speedX and acceleration. The speedX gets reduced by acceleration.
     */
    applyGravity() {
        const gravityInterval = setStoppableInterval(() => {
            if (this.isAboveGround() || speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                clearInterval(gravityInterval);
            }
        }, 1000 / FPS);
    }

    /**
     * Check if object is above height of visual ground.
     * @returns True if object is by definition in the air.
     */
    isAboveGround() {
        return this.y + this.h > groundFromBottom;
    }

    /**
     * Adds 'speedX' to x position.
     */
    moveRight() {
        this.x += this.speedX;
    }

    /**
     * Reduce 'speedX' from x position.
     */
    moveLeft() {
        this.x -= this.speedX;
    }

    /**
     * Moves the object to the left and eventually executes extra function.
     * @param {function} fn to execute in between after every move
     */
    moveLeftSteady(fn = null) {
        const id = setStoppableInterval(() => {
            this.moveLeft();
            if (fn !== null) {
                fn();
            }
        }, 1000 / FPS);
        return id;
    }

    /**
     * Add value to 'speedY'.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Check if this object collides with other object
     * @param {MovableObject} othr - Object to check collision with
     * @returns
     */
    isColliding(othr) {
        const collided =
            this.x + this.w > othr.x &&
            othr.x + othr.w > this.x &&
            this.y + this.h > othr.y &&
            othr.y + othr.h > this.y;
        return collided;
    }

    /**
     * Reduces amount of this hp by given damage and stores last hit time.
     * @param {number} damage - damage from hit
     */
    hit(damage) {
        this.hp = Math.min(this.hp - damage, 0);
        this.lastHit = new Date().getTime();
    }

    /**
     * Check if object is dead.
     * @returns Remaining hp is equal or below 0
     */
    isDead() {
        return this.hp <= 0;
    }
}
