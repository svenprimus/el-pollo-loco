export class AudioLib {
    static HERO = {
        idle: '',
        idleLong: './assets/audio/character/characterSnoring.mp3',
        walk: './assets/audio/character/characterRun.mp3',
        jump: '../assets/audio/character/characterJump.wav',
        hurt: './assets/audio/character/characterDamage.mp3',
        dead: './assets/audio/character/characterDead.wav',
        drink: './assets/audio/character/characterDrink.mp3',
        attack: '',
        collected: '',
    }

    static ENEMY =  {
        mob_1: {
            walk: '',
            dead:'./assets/audio/chicken/chickenDead2.mp3',
            jump:'./assets/audio/chicken/chickenDead.mp3',
            drum:'./assets/audio/chicken/chickenDead2.mp3',
        },
        mob_2: {
            walk: '',
            dead:'./assets/audio/chicken/chickenDead2.mp3',
            drum:'./assets/audio/chicken/chickenDead2.mp3',
        },
        boss_1:  {
            spawn: './assets/audio/endboss/endbossApproach.wav',
            walk:'',
            alert:'',
            attack:'',
            hurt:'',
            dead: '',
        },
    }

    static AMMO = {
        impact: './assets/audio/throwable/bottleBreak.mp3',
    }

    static COLLECTABLE = {
        bottle: './assets/audio/collectibles/bottleCollectSound.wav',
        coin:'./assets/audio/collectibles/collectSound.wav',
    }

    static GAME = {
        start: 'assets/audio/game/gameStart.mp3',
        pause: '',
        resume: '',
        win: '',
        lose: '',
        ambient:'',
    }
}