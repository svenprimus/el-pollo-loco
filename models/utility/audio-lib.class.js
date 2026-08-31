export class AudioLib {
    static HERO = {
        idle: '',
        idleLong: './assets/audio/character/characterSnoring.mp3',
        walk: './assets/audio/character/characterRun.mp3',
        jump: '../assets/audio/character/characterJump.mp3',
        bounce: '../assets/audio/character/characterBounce.mp3',
        hurt: './assets/audio/character/characterDamage.mp3',
        dead: './assets/audio/character/characterDead.mp3',
        drink: './assets/audio/character/characterDrink.mp3',
        attack: '',
        collected: '',
    };

    static ENEMY = {
        mob_1: {
            walk: '',
            dead: './assets/audio/chicken/chickenDead2.mp3',
            jump: './assets/audio/chicken/chickenDead.mp3',
        },
        mob_2: {
            walk: '',
            dead: './assets/audio/chicken/chickenDead2.mp3',
            fury: './assets/audio/chicken/hatchling-fury.mp3',
        },
        boss_1: {
            spawn: './assets/audio/endboss/endbossApproach.mp3',
            walk: './assets/audio/endboss/endbossWalk.mp3',
            alert: '',
            attack: './assets/audio/endboss/endbossAttack.mp3',
            hurt: './assets/audio/endboss/endbossHurt.mp3',
            dead: './assets/audio/chicken/chickenDead.mp3',
        },
    };

    static AMMO = {
        impact: './assets/audio/throwable/bottleBreak.mp3',
    };

    static COLLECTABLE = {
        bottle: './assets/audio/collectibles/collectBottle.mp3',
        coin: './assets/audio/collectibles/collectCoin.mp3',
    };

    static GAME = {
        start: 'assets/audio/game/gameStart.mp3',
        pause: '',
        resume: '',
        win: '',
        lose: '',
        ambient: '',
    };
}
