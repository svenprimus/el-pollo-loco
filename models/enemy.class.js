class Enemy extends MovableObject {
    // TODO derive to different kinds of enemies
    IMGS_TYPE_1_WALK = [
        '../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMGS_TYPE_1_DEAD = ['assets/sprites/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    IMGS_TYPE_2_WALK = [
        'assets/sprites/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/sprites/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/sprites/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMGS_TYPE_2_DEAD = ['assets/sprites/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor() {
        super().loadImage('../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}
