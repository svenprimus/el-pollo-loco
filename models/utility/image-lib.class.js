export class ImageLib {
    static HERO = {
        wNatural: 610,
        hNatural: 1200,
        idle: [
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
        ],
        idleLong: [
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
        ],
        walk: [
            '../assets/sprites/2_character_pepe/2_walk/W-21.png',
            '../assets/sprites/2_character_pepe/2_walk/W-22.png',
            '../assets/sprites/2_character_pepe/2_walk/W-23.png',
            '../assets/sprites/2_character_pepe/2_walk/W-24.png',
            '../assets/sprites/2_character_pepe/2_walk/W-25.png',
            '../assets/sprites/2_character_pepe/2_walk/W-26.png',
        ],
        jump: [
            '../assets/sprites/2_character_pepe/3_jump/J-31.png',
            '../assets/sprites/2_character_pepe/3_jump/J-32.png',
            '../assets/sprites/2_character_pepe/3_jump/J-33.png',
            '../assets/sprites/2_character_pepe/3_jump/J-34.png',
            '../assets/sprites/2_character_pepe/3_jump/J-35.png',
            '../assets/sprites/2_character_pepe/3_jump/J-36.png',
            '../assets/sprites/2_character_pepe/3_jump/J-37.png',
            '../assets/sprites/2_character_pepe/3_jump/J-38.png',
            '../assets/sprites/2_character_pepe/3_jump/J-39.png',
        ],
        hurt: [
            '../assets/sprites/2_character_pepe/4_hurt/H-41.png',
            '../assets/sprites/2_character_pepe/4_hurt/H-42.png',
            '../assets/sprites/2_character_pepe/4_hurt/H-43.png',
        ],
        dead: [
            '../assets/sprites/2_character_pepe/5_dead/D-51.png',
            '../assets/sprites/2_character_pepe/5_dead/D-52.png',
            '../assets/sprites/2_character_pepe/5_dead/D-53.png',
            '../assets/sprites/2_character_pepe/5_dead/D-54.png',
            '../assets/sprites/2_character_pepe/5_dead/D-55.png',
            '../assets/sprites/2_character_pepe/5_dead/D-56.png',
            '../assets/sprites/2_character_pepe/5_dead/D-57.png',
        ],
        drink: [
            '../assets/sprites/2_character_pepe/6_tequila/t-1.png',
            '../assets/sprites/2_character_pepe/6_tequila/t-2.png',
            '../assets/sprites/2_character_pepe/6_tequila/t-3.png',
            '../assets/sprites/2_character_pepe/6_tequila/t-4.png',
        ],
    };

    static ENEMY = {
        mob_1: {
            wNatural: 248,
            hNatural: 243,
            walk: [
                '../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
                '../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
                '../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
            ],
            dead: ['../assets/sprites/3_enemies_chicken/chicken_normal/2_dead/dead.png'],
            jump: [
                '../assets/sprites/3_enemies_chicken/chicken_normal/3_jump/1_j.png',
                '../assets/sprites/3_enemies_chicken/chicken_normal/3_jump/2_j.png',
                '../assets/sprites/3_enemies_chicken/chicken_normal/3_jump/3_j.png',
            ],
        },
        mob_2: {
            wNatural: 236,
            hNatural: 210,
            walk: [
                '../assets/sprites/3_enemies_chicken/chicken_small/1_walk/1_w.png',
                '../assets/sprites/3_enemies_chicken/chicken_small/1_walk/2_w.png',
                '../assets/sprites/3_enemies_chicken/chicken_small/1_walk/3_w.png',
            ],
            dead: ['../assets/sprites/3_enemies_chicken/chicken_normal/1_walk/1_w.png'],
        },
        boss_1: {
            wNatural: 1045,
            hNatural: 1217,
            walk: [
                '../assets/sprites/4_enemie_boss_chicken/1_walk/G1.png',
                '../assets/sprites/4_enemie_boss_chicken/1_walk/G2.png',
                '../assets/sprites/4_enemie_boss_chicken/1_walk/G3.png',
                '../assets/sprites/4_enemie_boss_chicken/1_walk/G4.png',
            ],
            alert: [
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G5.png',
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G6.png',
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G7.png',
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G8.png',
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G9.png',
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G10.png',
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G11.png',
                '../assets/sprites/4_enemie_boss_chicken/2_alert/G12.png',
            ],
            attack: [
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G13.png',
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G14.png',
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G15.png',
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G16.png',
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G17.png',
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G18.png',
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G19.png',
                '../assets/sprites/4_enemie_boss_chicken/3_attack/G20.png',
            ],
            hurt: [
                '../assets/sprites/4_enemie_boss_chicken/4_hurt/G21.png',
                '../assets/sprites/4_enemie_boss_chicken/4_hurt/G22.png',
                '../assets/sprites/4_enemie_boss_chicken/4_hurt/G23.png',
            ],
            dead: [
                '../assets/sprites/4_enemie_boss_chicken/5_dead/G24.png',
                '../assets/sprites/4_enemie_boss_chicken/5_dead/G25.png',
                '../assets/sprites/4_enemie_boss_chicken/5_dead/G26.png',
            ],
        },
    };

    static BG = {
        layer_1: [
            '../assets/sprites/5_background/layers/1_first_layer/1.png',
            '../assets/sprites/5_background/layers/1_first_layer/2.png',
        ],
        layer_2: [
            '../assets/sprites/5_background/layers/2_second_layer/1.png',
            '../assets/sprites/5_background/layers/2_second_layer/2.png',
        ],
        layer_3: [
            '../assets/sprites/5_background/layers/3_third_layer/1.png',
            '../assets/sprites/5_background/layers/3_third_layer/2.png',
        ],
        clouds: [
            '../assets/sprites/5_background/layers/4_clouds/1.png',
            '../assets/sprites/5_background/layers/4_clouds/2.png',
        ],
        air: '../assets/sprites/5_background/layers/air.png',
    };

    static AMMO = {
        midair: [
            '../assets/sprites/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        ],
        impact: [
            '../assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            '../assets/sprites/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        ],
        collectable: [
            '../assets/sprites/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            '../assets/sprites/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        ],
        icon: '../assets/sprites/6_salsa_bottle/salsa_bottle.png',
    };

    static STATUSBAR = {
        hp: [
            '../assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            '../assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            '../assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            '../assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            '../assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            '../assets/sprites/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        ],
        boss: [
            '../assets/sprites/7_statusbars/2_statusbar_endboss/orange/0.png',
            '../assets/sprites/7_statusbars/2_statusbar_endboss/orange/20.png',
            '../assets/sprites/7_statusbars/2_statusbar_endboss/orange/40.png',
            '../assets/sprites/7_statusbars/2_statusbar_endboss/orange/60.png',
            '../assets/sprites/7_statusbars/2_statusbar_endboss/orange/80.png',
            '../assets/sprites/7_statusbars/2_statusbar_endboss/orange/100.png',
        ],
        icons: {
            hp: '../assets/sprites/7_statusbars/3_icons/icon_health.png',
            coin: '../assets/sprites/7_statusbars/3_icons/icon_coin.png',
            bottle: '../assets/sprites/7_statusbars/3_icons/icon_salsa_bottle.png',
        },
    };

    static COIN = ['../assets/sprites/8_coin/coin_1.png', '../assets/sprites/8_coin/coin_2.png'];

    static SCREENS = {
        start: '../assets/sprites/9_intro_outro_screens/start/startscreen_1.png',
        gameOver: '../assets/sprites/You won, you lost/Game Over.png',
        won: '../assets/sprites/You won, you lost/You won A.png',
    };
}
