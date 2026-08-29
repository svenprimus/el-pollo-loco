import { Level } from '../world/level.class.js';
class MyAudio {
    file;
    isLoaded;
    // isPlaying;

    constructor(file) {
        this.file = new Audio(file);
        this.file.volume = 0.2;
        this.file.currentTime = 0;
    }

    play() {
        this.isPlaying = true;
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
    static playing = [];
    static camX = 0;

    // TODO: play from queue? e.g. multiple equal sounds: coins, chicken
    static play(path) {
        const sound = AudioHub.sounds[path];
        if (sound) {
            if (sound.file.readyState === 4 || sound.isLoaded) {
                sound.isLoaded = true;
                sound.play();
                // if (false === sound.isPlaying) {
                //     AudioHub.playing.push(sound);
                // }
            }
        }
    }

    static playFromStart(path) {
        const sound = AudioHub.sounds[path];
        if (sound) {
            if (sound.file.readyState === 4 || sound.isLoaded) {
                sound.file.pause();
                sound.file.currentTime = 0;
                sound.isLoaded = true;
                sound.play();
                // if (false === sound.isPlaying) {
                //     AudioHub.playing.push(sound);
                // }
            }
        }
    }

    static playIfNearby(path, x) {
        // TODO not working as intended
        const distance = Math.abs(AudioHub.camX + x);
        if (distance < Level.BG_WIDTH) {
            AudioHub.play(path);
        }
    }

    static playFromStartIfNearby(path, x) {
        // TODO not working as intended
        const distance = Math.abs(AudioHub.camX + x);
        if (distance < Level.BG_WIDTH) {
            AudioHub.playFromStart(path);
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

    static stop(path) {
        const sound = AudioHub.sounds[path];
        if (sound) {
            sound.file.pause();
        }
    }

    static stopReset(path) {
        const sound = AudioHub.sounds[path];
        if (sound) {
            sound.file.pause();
            sound.file.currentTime = 0;
        }
    }

    static loadSound(path) {
        AudioHub.sounds[path] = new MyAudio(path);
    }

    static loadSounds(audioPaths) {
        for (const key in audioPaths) {
            const path = audioPaths[key];
            if (path && !Object.hasOwn(AudioHub.sounds, path)) {
                AudioHub.sounds[path] = new MyAudio(path);
            }
        }
    }

    static setCamX(camX) {
        AudioHub.camX = camX;
    }
}
