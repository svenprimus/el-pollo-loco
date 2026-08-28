class MyAudio {
    file;
    isLoaded;

    constructor(file) {
        this.file = new Audio(file);
        this.file.volume = 0.2;
        this.file.currentTime = 0;
    }
}

export class AudioHub {
    static sounds = {};
    static playing = [];

    // TODO: play from start
    // TODO: play if finished
    static play(path) {
        const sound = AudioHub.sounds[path];
        if (sound) {
            if (sound.file.readyState === 4 || sound.isLoaded) {
                console.log('playing');
                sound.isLoaded = true;
                sound.file.play();
                AudioHub.playing.push(sound.file);
            }
        }
    }

    static resume() {
        AudioHub.playing.forEach((sound) => {
            sound.play();
        });
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
}
