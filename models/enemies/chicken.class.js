class Chicken extends Enemy {
    static spread = 0;
    isJumping = false;
    idHandler;

    constructor(wCanvas, hCanvas) {
        super(wCanvas, hCanvas).loadImage(ImageLib.ENEMY.mob_1.walk[2]);
        this.loadImagesToCache();

        this.h = hCanvas / 8;
        this.w = ImageLib.ENEMY.mob_1.wNatural / (ImageLib.ENEMY.mob_1.hNatural / this.h);
        this.speedX = Math.random() * 2; // this is walking speed, not the animation speed

        this.animate(ImageLib.ENEMY.mob_1.walk, this.speedX * 5);
        this.idHandler = this.moveLeftSteady(() => this.statusHandler(), FPS, this);
        this.applyGravity();
    }

    place(wCanvas, hCanvas) {
        const sections = Math.floor(Level.END / World.BG_WIDTH);
        const section = Chicken.spread++ % sections;
        this.x = section * World.BG_WIDTH + Math.random() * World.BG_WIDTH;
        this.y = this.ground - this.h - Math.random() * 15;
    }

    statusHandler() {
        if (this.isDead() || this.x + this.w < Level.START) {
            clearStoppableInterval(this.idAnimate);
            clearStoppableInterval(this.idHandler);
        } else {
            this.randomJump();
        }
    }

    randomJump() {
        if (Math.random() > 0.99 && false === this.isJumping) {
            this.speedX = 4;
            this.speedY = 20;
            this.isJumping = true;
            this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.jump, 0, this.speedX * 5);
            this.startResetTimeout();
        }
    }

    startResetTimeout() {
        setStoppableTimeout(() => {
            this.speedX = Math.random() * 2;
            this.isJumping = false;
            this.restartAnimateIfChangedFrequency(ImageLib.ENEMY.mob_1.walk, 2, this.speedX * 5);
        }, 1000);
    }

    loadImagesToCache() {
        this.loadImages(ImageLib.ENEMY.mob_1.walk);
        this.loadImages(ImageLib.ENEMY.mob_1.jump);
        this.loadImages(ImageLib.ENEMY.mob_1.dead);
    }
}
