class Hero extends MovableObject {
    IMGS_IDLE = [
        '../assets/sprites/2_character_pepe/1_idle/idle/I-1.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-2.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-3.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-4.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-5.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-6.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-7.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-8.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-9.png',
        '../assets/sprites/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMGS_IDLE_LONG = [
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-11.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-12.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-13.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-14.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-15.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-16.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-17.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-18.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-19.png',
        '../assets/sprites/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMGS_WALK = [
        '../assets/sprites/2_character_pepe/2_walk/W-21.png',
        '../assets/sprites/2_character_pepe/2_walk/W-22.png',
        '../assets/sprites/2_character_pepe/2_walk/W-23.png',
        '../assets/sprites/2_character_pepe/2_walk/W-24.png',
        '../assets/sprites/2_character_pepe/2_walk/W-25.png',
        '../assets/sprites/2_character_pepe/2_walk/W-26.png',
    ];

    IMGS_JUMP = [
        '../assets/sprites/2_character_pepe/3_jump/J-31.png',
        '../assets/sprites/2_character_pepe/3_jump/J-32.png',
        '../assets/sprites/2_character_pepe/3_jump/J-33.png',
        '../assets/sprites/2_character_pepe/3_jump/J-34.png',
        '../assets/sprites/2_character_pepe/3_jump/J-35.png',
        '../assets/sprites/2_character_pepe/3_jump/J-36.png',
        '../assets/sprites/2_character_pepe/3_jump/J-37.png',
        '../assets/sprites/2_character_pepe/3_jump/J-38.png',
        '../assets/sprites/2_character_pepe/3_jump/J-39.png',
    ];

    IMGS_HURT = [
        '../assets/sprites/2_character_pepe/4_hurt/H-41.png',
        '../assets/sprites/2_character_pepe/4_hurt/H-42.png',
        '../assets/sprites/2_character_pepe/4_hurt/H-43.png',
    ];

    IMGS_DEAD = [
        '../assets/sprites/2_character_pepe/5_dead/D-51.png',
        '../assets/sprites/2_character_pepe/5_dead/D-52.png',
        '../assets/sprites/2_character_pepe/5_dead/D-53.png',
        '../assets/sprites/2_character_pepe/5_dead/D-54.png',
        '../assets/sprites/2_character_pepe/5_dead/D-55.png',
        '../assets/sprites/2_character_pepe/5_dead/D-56.png',
        '../assets/sprites/2_character_pepe/5_dead/D-57.png',
    ];
    
    constructor() {
        super().loadImage('../assets/sprites/2_character_pepe/2_walk/W-21.png');
    }
}
