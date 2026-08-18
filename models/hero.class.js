class Hero extends MovableObject {
    world;
    startIdleTime = 0;

    constructor(wCanvas, hCanvas) {
        super(hCanvas).loadImage(ImageLib.HERO.idle[0]);
        this.loadImagesToCache();
        this.h = hCanvas / 2;
        this.w = ImageLib.HERO.wNatural / (ImageLib.HERO.hNatural / this.h);
        this.y = hCanvas - this.h - this.groundFromBottom;
        this.x = wCanvas / 8;
        this.speedX = 15;
        this.animate(ImageLib.HERO.idle, FPS, () => this.resolveControl());
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
        // TODO funktion aufteilen in PlayAnimation und Zustand verändern 03-14
        if (Keyboard.UP) {
            // jump();
        } else if (Keyboard.ATTACK) {
            // attack();
        } else if (Keyboard.RIGHT) {
            this.reverseDirection = false;
            this.playAnimation(ImageLib.HERO.walk);
            this.moveRight();
        } else if (Keyboard.LEFT) {
            this.reverseDirection = true;
            this.playAnimation(ImageLib.HERO.walk);
            this.moveLeft();
        } else if (Keyboard.DOWN) {
            // placeholder
        } else {
            isIdle = true;
            if (this.startIdleTime === 0) {
                this.startIdleTime = new Date().getTime();
            }
            const timeNow = new Date().getTime();
            if (timeNow - this.startIdleTime > 10000) {
                this.playAnimation(ImageLib.HERO.idleLong);
            } else {
                this.playAnimation(ImageLib.HERO.idle);
            }
        }

        if (false === isIdle) {
            this.startIdleTime = 0;
        }
    }
}
