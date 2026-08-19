class World {
    canvas;
    ctx;
    cameraX = 0;
    level;
    statusBar = new StatusBar();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        // TODO we could do this, but requires reload as it is
        // this.canvas.width = window.innerWidth * 0.8;
        this.loadLevel();
        this.draw();
        this.level.hero.world = this;
        this.level.clouds.world = this;
        this.checkCollisions();
    }

    checkCollisions() {
        setStoppableInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.level.hero.isColliding(enemy)) {
                    this.level.hero.hit(enemy.atk);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.level.backgrounds);

        // this.ctx.translate(-this.cameraX, 0);
        // Space for fixed objects
        // this.addToMap(this.statusBar);
        // this.ctx.translate(this.cameraX, 0);

        this.addToMap(this.level.hero);
        this.addToMap(this.level.enemies);
        this.addToMap(this.level.boss);

        this.addToMap(this.level.clouds);
        this.ctx.translate(-this.cameraX, 0);

        const self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    /**
     * Add (draw) given object or objects to map.
     * @param {DrawableObject|DrawableObject[]} drawbles - one or multiple objects to be added to map
     */
    addToMap(drawbles) {
        if (Array.isArray(drawbles)) {
            drawbles.forEach((o) => {
                this.drawObject(o);
            });
        } else {
            this.drawObject(drawbles);
        }
    }

    /**
     * Draw a single object on the map.
     * @param {DrawableObject} drawble - to be drawn on map
     */
    drawObject(drawble) {
        if (drawble.reverseDirection) {
            this.flipImage(drawble);
        }

        drawble.draw(this.ctx);
        drawble.drawFrame(this.ctx);

        if (drawble.reverseDirection) {
            this.flipImageBack(drawble);
        }
    }

    /**
     * Flip image horizontally.
     * @param {DrawableObject} drawble
     */
    flipImage(drawble) {
        this.ctx.save();
        this.ctx.translate(drawble.w, 0);
        this.ctx.scale(-1, 1);
    }

    /**
     * Restore image direction horizontally.
     */
    flipImageBack(drawble) {
        drawble.x *= -1;
        this.ctx.restore();
    }

    loadLevel() {
        this.level = createLevel_1(this.canvas.width, this.canvas.height);
    }
}
