export class AudioLib {
    static HERO = {
        idle: {
            path: '',
            mult: 1,
        },
        idleLong: {
            path: './assets/audio/character/characterSnoring.mp3',
            mult: 0.4,
        },
        walk: {
            path: './assets/audio/character/characterRun.mp3',
            mult: 0.3,
        },
        jump: {
            path: '../assets/audio/character/characterJump.mp3',
            mult: 1.8,
        },
        bounce: {
            path: '../assets/audio/character/characterBounce.mp3',
            mult: 1.8,
        },
        hurt: {
            path: './assets/audio/character/characterDamage.mp3',
            mult: 0.8,
        },
        dead: {
            path: './assets/audio/character/characterDead.mp3',
            mult: 0.4,
        },
        drink: {
            path: './assets/audio/character/characterDrink.mp3',
            mult: 1,
        },
        attack: {
            path: '',
            mult: 1,
        },
    };

    static ENEMY = {
        mob_1: {
            walk: {
                path: '',
                mult: 1,
            },
            dead: {
                path: './assets/audio/chicken/chickenDead2.mp3',
                mult: 1,
            },
            jump: {
                path: './assets/audio/chicken/chickenDead.mp3',
                mult: 0.75,
            },
        },
        mob_2: {
            walk: {
                path: '',
                mult: 1,
            },
            dead: {
                path: './assets/audio/chicken/chickenDead2.mp3',
                mult: 1,
            },
            fury: {
                path: './assets/audio/chicken/hatchling-fury.mp3',
                mult: 0.2,
            },
        },
        boss_1: {
            spawn: {
                path: './assets/audio/endboss/endbossApproach.mp3',
                mult: 3,
            },
            walk: {
                path: './assets/audio/endboss/endbossWalk.mp3',
                mult: 3,
            },
            alert: {
                path: '',
                mult: 1,
            },
            attack: {
                path: './assets/audio/endboss/endbossAttack.mp3',
                mult: 1,
            },
            hurt: {
                path: './assets/audio/endboss/endbossHurt.mp3',
                mult: 0.5,
            },
            dead: {
                path: './assets/audio/chicken/chickenDead.mp3',
                mult: 1,
            },
        },
    };

    static AMMO = {
        impact: {
            path: './assets/audio/throwable/bottleBreak.mp3',
            mult: 0.8,
        },
    };

    static COLLECTABLE = {
        bottle: {
            collect: {
                path: './assets/audio/collectibles/collectBottle.mp3',
                mult: 1.5,
            },
            empty: {
                path: './assets/audio/collectibles/bottleEmpty.mp3',
                mult: 1.4,
            },
        },
        coin: {
            path: './assets/audio/collectibles/collectCoin.mp3',
            mult: 0.5,
        },
    };

    static GAME = {
        start: {
            path: './assets/audio/game/gameStart.mp3',
            mult: 1,
        },
        pause: {
            path: '',
            mult: 1,
        },
        resume: {
            path: '',
            mult: 1,
        },
        win: {
            path: '',
            mult: 1,
        },
        lose: {
            path: '',
            mult: 1,
        },
        ambient: {
            path: './assets/audio/game/ambient.mp3',
            mult: 0.9,
        },
        ambientBoss: {
            path: './assets/audio/game/ambientBoss.mp3',
            mult: 0.4,
        },
    };
}
