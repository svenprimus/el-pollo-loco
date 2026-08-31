import { Level } from '../world/level.class.js';
class MyAudio {
    file;
    isLoaded;
    volMult = 1;

    constructor(file, volBase, mult) {
        this.file = new Audio(file);
        this.file.currentTime = 0;
        this.volMult = mult;
    }

    play(volBase) {
        this.file.volume = Math.min(Math.max(AudioHub.volBase * this.volMult, 0), 1);
        const playPromise = this.file.play();

        if (playPromise !== undefined) {
            playPromise.catch((e) => {
                if (e.name !== 'AbortError') {
                    console.error('Audio error:', e);
                }
            });
        }
    }
}

export class AudioHub {
    static sounds = {};
    static camX = 0;
    static volLast = 0.2;
    static volBase = 0.2;

    // TODO: play from queue? e.g. multiple equal sounds: coins, chicken
    static play(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            if (sound.file.readyState === 4 || sound.isLoaded) {
                sound.isLoaded = true;
                sound.play();
            }
        }
    }

    static playFromStart(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            if (sound.file.readyState === 4 || sound.isLoaded) {
                sound.file.pause();
                sound.file.currentTime = 0;
                sound.isLoaded = true;
                sound.play();
            }
        }
    }

    static playIfNearby(soundJson, x, w) {
        const distance = AudioHub.camX + x;
        if (-w < distance && distance < Level.BG_WIDTH) {
            AudioHub.play(soundJson);
        }
    }

    static playFromStartIfNearby(soundJson, x, w) {
        const distance = AudioHub.camX + x;
        if (-w < distance && distance < Level.BG_WIDTH) {
            AudioHub.playFromStart(soundJson);
        }
    }

    static resume() {
        // TODO: only push if not already playing
        // TODO: remove sounds after playing finished
        // for (let i = AudioHub.playing.length - 1; i >= 0; i--) {
        //     AudioHub.playing[i].play();
        //     AudioHub.playing.splice(i, 1);
        // }
    }

    static stopAll() {
        for (const key in AudioHub.sounds) {
            AudioHub.sounds[key].file.pause();
        }
    }

    static stop(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            sound.file.pause();
        }
    }

    static stopReset(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            sound.file.pause();
            sound.file.currentTime = 0;
        }
    }

    static loadSound(soundJson) {
        AudioHub.sounds[soundJson.path] = new MyAudio(soundJson.path, AudioHub.volBase, soundJson.mult);
    }

    static loadSounds(soundJsons) {
        for (const key in soundJsons) {
            const path = soundJsons[key].path;
            if (path && !Object.hasOwn(AudioHub.sounds, path)) {
                AudioHub.sounds[path] = new MyAudio(path, AudioHub.volBase, soundJsons[key].mult);
            }
        }
    }

    static setCamX(camX) {
        AudioHub.camX = camX;
    }

    static toggleMute() {
        const tempLast = AudioHub.volLast;
        AudioHub.volLast = AudioHub.volBase;
        AudioHub.volBase = AudioHub.volBase === 0 ? tempLast : 0;
    }

    static setVolume(volumePercentage) {
        AudioHub.volBase = volumePercentage / 100;
    }
}
