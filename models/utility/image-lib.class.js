export class ImageLib {
    static HERO = {
        wNatural: 610,
        hNatural: 1200,
        offset: {
            top: 520,
            right: 196,
            bottom: 65,
            left: 159,
        },
        idle: [
            './assets/sprites/2_character_pepe/1_idle/idle/I-1.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-2.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-3.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-4.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-5.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-6.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-7.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-8.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-9.webp',
            './assets/sprites/2_character_pepe/1_idle/idle/I-10.webp',
        ],
        idleLong: [
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-11.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-12.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-13.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-14.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-15.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-16.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-17.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-18.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-19.webp',
            './assets/sprites/2_character_pepe/1_idle/long_idle/I-20.webp',
        ],
        walk: [
            './assets/sprites/2_character_pepe/2_walk/W-21.webp',
            './assets/sprites/2_character_pepe/2_walk/W-22.webp',
            './assets/sprites/2_character_pepe/2_walk/W-23.webp',
            './assets/sprites/2_character_pepe/2_walk/W-24.webp',
            './assets/sprites/2_character_pepe/2_walk/W-25.webp',
            './assets/sprites/2_character_pepe/2_walk/W-26.webp',
        ],
        jump: [
            './assets/sprites/2_character_pepe/3_jump/J-31.webp',
            './assets/sprites/2_character_pepe/3_jump/J-32.webp',
            './assets/sprites/2_character_pepe/3_jump/J-33.webp',
            './assets/sprites/2_character_pepe/3_jump/J-34.webp',
            './assets/sprites/2_character_pepe/3_jump/J-35.webp',
            './assets/sprites/2_character_pepe/3_jump/J-36.webp',
            './assets/sprites/2_character_pepe/3_jump/J-37.webp',
            './assets/sprites/2_character_pepe/3_jump/J-38.webp',
            './assets/sprites/2_character_pepe/3_jump/J-39.webp',
        ],
        hurt: [
            './assets/sprites/2_character_pepe/4_hurt/H-41.webp',
            './assets/sprites/2_character_pepe/4_hurt/H-42.webp',
            './assets/sprites/2_character_pepe/4_hurt/H-43.webp',
        ],
        dead: [
            './assets/sprites/2_character_pepe/5_dead/D-51.webp',
            './assets/sprites/2_character_pepe/5_dead/D-52.webp',
            './assets/sprites/2_character_pepe/5_dead/D-53.webp',
            './assets/sprites/2_character_pepe/5_dead/D-54.webp',
            './assets/sprites/2_character_pepe/5_dead/D-55.webp',
            './assets/sprites/2_character_pepe/5_dead/D-56.webp',
            './assets/sprites/2_character_pepe/5_dead/D-57.webp',
        ],
        drink: [
            './assets/sprites/2_character_pepe/6_tequila/T-1.webp',
            './assets/sprites/2_character_pepe/6_tequila/T-2.webp',
            './assets/sprites/2_character_pepe/6_tequila/T-3.webp',
            './assets/sprites/2_character_pepe/6_tequila/T-4.webp',
        ],
        attack: [
            './assets/sprites/2_character_pepe/7_attack/A-1.webp',
            './assets/sprites/2_character_pepe/7_attack/A-2.webp',
        ],
        collected: [
            './assets/sprites/2_character_pepe/8_collected/C-1.webp',
            './assets/sprites/2_character_pepe/8_collected/C-2.webp',
            './assets/sprites/2_character_pepe/8_collected/C-3.webp',
        ],
    };

    static ENEMY = {
        mob_1: {
            wNatural: 248,
            hNatural: 243,
            offset: {
                top: 42,
                right: 18,
                bottom: 46,
                left: 18,
            },
            walk: [
                './assets/sprites/3_enemies_chicken/chicken_normal/1_walk/1_w.webp',
                './assets/sprites/3_enemies_chicken/chicken_normal/1_walk/2_w.webp',
                './assets/sprites/3_enemies_chicken/chicken_normal/1_walk/3_w.webp',
            ],
            dead: ['./assets/sprites/3_enemies_chicken/chicken_normal/2_dead/dead.webp'],
            jump: [
                './assets/sprites/3_enemies_chicken/chicken_normal/3_jump/1_j.webp',
                './assets/sprites/3_enemies_chicken/chicken_normal/3_jump/2_j.webp',
                './assets/sprites/3_enemies_chicken/chicken_normal/3_jump/3_j.webp',
            ],
            drum: ['./assets/sprites/3_enemies_chicken/chicken_drum/drumstick.webp'],
        },
        mob_2: {
            wNatural: 236,
            hNatural: 210,
            offset: {
                top: 24,
                right: 43,
                bottom: 35,
                left: 28,
            },
            walk: [
                './assets/sprites/3_enemies_chicken/chicken_small/1_walk/1_w.webp',
                './assets/sprites/3_enemies_chicken/chicken_small/1_walk/2_w.webp',
                './assets/sprites/3_enemies_chicken/chicken_small/1_walk/3_w.webp',
            ],
            dead: ['./assets/sprites/3_enemies_chicken/chicken_small/2_dead/dead.webp'],
            drum: ['./assets/sprites/3_enemies_chicken/chicken_drum/drumstick.webp'],
        },
        boss_1: {
            wNatural: 1045,
            hNatural: 1217,
            offset: {
                top: 274,
                right: 145,
                bottom: 131,
                left: 156,
            },
            walk: [
                './assets/sprites/4_enemie_boss_chicken/1_walk/G1.webp',
                './assets/sprites/4_enemie_boss_chicken/1_walk/G2.webp',
                './assets/sprites/4_enemie_boss_chicken/1_walk/G3.webp',
                './assets/sprites/4_enemie_boss_chicken/1_walk/G4.webp',
            ],
            alert: [
                './assets/sprites/4_enemie_boss_chicken/2_alert/G5.webp',
                './assets/sprites/4_enemie_boss_chicken/2_alert/G6.webp',
                './assets/sprites/4_enemie_boss_chicken/2_alert/G7.webp',
                './assets/sprites/4_enemie_boss_chicken/2_alert/G8.webp',
                './assets/sprites/4_enemie_boss_chicken/2_alert/G9.webp',
                './assets/sprites/4_enemie_boss_chicken/2_alert/G10.webp',
                './assets/sprites/4_enemie_boss_chicken/2_alert/G11.webp',
                './assets/sprites/4_enemie_boss_chicken/2_alert/G12.webp',
            ],
            attack: [
                './assets/sprites/4_enemie_boss_chicken/3_attack/G13.webp',
                './assets/sprites/4_enemie_boss_chicken/3_attack/G14.webp',
                './assets/sprites/4_enemie_boss_chicken/3_attack/G15.webp',
                './assets/sprites/4_enemie_boss_chicken/3_attack/G16.webp',
                './assets/sprites/4_enemie_boss_chicken/3_attack/G17.webp',
                './assets/sprites/4_enemie_boss_chicken/3_attack/G18.webp',
                './assets/sprites/4_enemie_boss_chicken/3_attack/G19.webp',
                './assets/sprites/4_enemie_boss_chicken/3_attack/G20.webp',
            ],
            hurt: [
                './assets/sprites/4_enemie_boss_chicken/4_hurt/G21.webp',
                './assets/sprites/4_enemie_boss_chicken/4_hurt/G22.webp',
                './assets/sprites/4_enemie_boss_chicken/4_hurt/G23.webp',
            ],
            dead: [
                './assets/sprites/4_enemie_boss_chicken/5_dead/G24.webp',
                './assets/sprites/4_enemie_boss_chicken/5_dead/G25.webp',
                './assets/sprites/4_enemie_boss_chicken/5_dead/G26.webp',
            ],
        },
    };

    static BG = {
        wNatural: 1920,
        hNatural: 1080,
        layer_1: [
            './assets/sprites/5_background/layers/1_first_layer/1.webp',
            './assets/sprites/5_background/layers/1_first_layer/2.webp',
        ],
        layer_2: [
            './assets/sprites/5_background/layers/2_second_layer/1.webp',
            './assets/sprites/5_background/layers/2_second_layer/2.webp',
        ],
        layer_3: [
            './assets/sprites/5_background/layers/3_third_layer/1.webp',
            './assets/sprites/5_background/layers/3_third_layer/2.webp',
        ],
        clouds: [
            './assets/sprites/5_background/layers/4_clouds/1.webp',
            './assets/sprites/5_background/layers/4_clouds/2.webp',
        ],
        air: './assets/sprites/5_background/layers/air.webp',
        stop: {
            wNatural: 560,
            hNatural: 560,
            imgs: [
                './assets/sprites/5_background/no-way/N-1.webp',
                './assets/sprites/5_background/no-way/N-2.webp',
                './assets/sprites/5_background/no-way/N-3.webp',
                './assets/sprites/5_background/no-way/N-4.webp',
            ],
        },
    };

    static AMMO = {
        midair: {
            wNatural: 400,
            hNatural: 400,
            offset: {
                top: 68,
                right: 62,
                bottom: 57,
                left: 63,
            },
            imgs: [
                './assets/sprites/6_salsa_bottle/bottle_rotation/1_bottle_rotation.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/2_bottle_rotation.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/3_bottle_rotation.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/4_bottle_rotation.webp',
            ],
        },

        impact: {
            wNatural: 524,
            hNatural: 400,
            imgs: [
                './assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.webp',
                './assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.webp',
            ],
        },
        collectable: {
            wNatural: 400,
            hNatural: 400,
            offset: {
                top: 78,
                right: 144,
                bottom: 46,
                left: 167,
            },
            imgs: [
                './assets/sprites/6_salsa_bottle/collectable/c-1.webp',
                './assets/sprites/6_salsa_bottle/collectable/c-2.webp',
                './assets/sprites/6_salsa_bottle/collectable/c-3.webp',
                './assets/sprites/6_salsa_bottle/collectable/c-4.webp',
            ],
        },
    };

    static STATUSBAR = {
        hp: {
            wNatural: 595,
            hNatural: 158,
            imgs: [
                './assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/0.webp',
                './assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/20.webp',
                './assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/40.webp',
                './assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/60.webp',
                './assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/80.webp',
                './assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/100.webp',
            ],
        },
        boss: {
            wNatural: 595,
            hNatural: 158,
            imgs: [
                './assets/sprites/7_statusbars/2_statusbar_endboss/orange/0.webp',
                './assets/sprites/7_statusbars/2_statusbar_endboss/orange/20.webp',
                './assets/sprites/7_statusbars/2_statusbar_endboss/orange/40.webp',
                './assets/sprites/7_statusbars/2_statusbar_endboss/orange/60.webp',
                './assets/sprites/7_statusbars/2_statusbar_endboss/orange/80.webp',
                './assets/sprites/7_statusbars/2_statusbar_endboss/orange/100.webp',
            ],
        },
        icons: {
            wNatural: 158,
            hNatural: 158,
            hp: './assets/sprites/7_statusbars/3_icons/icon_health.webp',
            coin: './assets/sprites/7_statusbars/3_icons/icon_coin.webp',
            bottle: './assets/sprites/7_statusbars/3_icons/icon_salsa_bottle.webp',
        },
    };

    static COIN = {
        wNatural: 300,
        hNatural: 300,
        offset: {
            top: 50,
            right: 55,
            bottom: 64,
            left: 55,
        },
        rotate: [
            './assets/sprites/8_coin/rotate/R-1.webp',
            './assets/sprites/8_coin/rotate/R-2.webp',
            './assets/sprites/8_coin/rotate/R-3.webp',
            './assets/sprites/8_coin/rotate/R-4.webp',
            './assets/sprites/8_coin/rotate/R-5.webp',
        ],
    };

    static SCREENS = {
        start: {
            wNatural: 1920,
            hNatural: 1080,
            img: './assets/sprites/9_intro_outro_screens/start/startscreen_1.webp',
        },
        gameOver: {
            wNatural: 1143,
            hNatural: 674,
            img: './assets/sprites/You won, you lost/Game Over.webp',
        },
        won: {
            wNatural: 987,
            hNatural: 879,
            img: './assets/sprites/You won, you lost/You won A.webp',
        },
    };
}
