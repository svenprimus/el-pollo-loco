class Hero extends MovableObject {
    world;
    startIdleTime = 0;
    cameraOffset = 0;
    constructor(wCanvas, hCanvas) {
        super(hCanvas).loadImage(ImageLib.HERO.idle[0]);
        this.loadImagesToCache();
        this.h = hCanvas / 2;
        this.w = ImageLib.HERO.wNatural / (ImageLib.HERO.hNatural / this.h);
        this.speedX = 15;
        this.animate(ImageLib.HERO.idle, FPS);
        setStoppableInterval(() => this.resolveControl(), FPS, this);
        this.applyGravity();
    }

    place(wCanvas, hCanvas) {
        this.y = this.ground - this.h;
        this.x = wCanvas / 8;
        this.cameraOffset = this.x;
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.HERO.idle);
        this.loadImages(ImageLib.HERO.idleLong);
        this.loadImages(ImageLib.HERO.walk);
        this.loadImages(ImageLib.HERO.jump);
        this.loadImages(ImageLib.HERO.hurt);
        this.loadImages(ImageLib.HERO.dead);
    }

    resolveControl() {
        let isIdle = false;
        if (Keyboard.UP && Keyboard.RIGHT && !this.isAboveGround()) {
            this.setAnimation(ImageLib.HERO.jump, 10);
            this.jump();
            this.reverseDirection = false;
            if (this.isBeforeEnd()) {
                this.moveRight();
                this.world.cameraX = -this.x + this.cameraOffset;
            }
        } else if (Keyboard.UP && Keyboard.LEFT && !this.isAboveGround()) {
            this.setAnimation(ImageLib.HERO.jump, 10);
            this.jump();
            this.reverseDirection = true;
            if (this.isAfterStart()) {
                this.moveLeft();
                this.world.cameraX = -this.x + this.cameraOffset;
            }
        } else if (Keyboard.UP && !this.isAboveGround()) {
            this.setAnimation(ImageLib.HERO.jump, 10);
            this.jump();
        } else if (Keyboard.ATTACK) {
            // attack();
        } else if (Keyboard.RIGHT && this.isBeforeEnd()) {
            this.reverseDirection = false;
            this.setAnimation(ImageLib.HERO.walk, FPS);
            this.moveRight();
            this.world.cameraX = -this.x + this.cameraOffset;
        } else if (Keyboard.LEFT && this.isAfterStart()) {
            this.reverseDirection = true;
            this.setAnimation(ImageLib.HERO.walk, FPS);
            this.moveLeft();
            this.world.cameraX = -this.x + this.cameraOffset;
        } else if (Keyboard.DOWN) {
            // placeholder
        } else if (!this.isAboveGround()) {
            isIdle = true;
            if (this.startIdleTime === 0) {
                this.startIdleTime = new Date().getTime();
            }
            const timeNow = new Date().getTime();

            if (timeNow - this.startIdleTime > 10000) {
                this.setAnimation(ImageLib.HERO.idleLong, 5);
            } else {
                this.setAnimation(ImageLib.HERO.idle, 5);
            }
        }

        if (false === isIdle) {
            this.startIdleTime = 0;
        }
    }

    isAfterStart() {
        return this.x > Level.START + this.cameraOffset + this.speedX;
    }

    isBeforeEnd() {
        return this.x < Level.END - this.world.canvas.width + this.cameraOffset - this.speedX;
    }

    /**
     * Play the given animation, if frequency is unchanged, otherwise restart animation with new frequency
     * @param {array} images
     * @param {number} frequency
     */
    setAnimation(images, frequency) {
        if (!this.isAboveGround()) {
            this.restartAnimateIfChangedFrequency(images, 0, frequency);
            //TODO animations into order... if hurt, dead, aboveground, etc
        }
    }
}
