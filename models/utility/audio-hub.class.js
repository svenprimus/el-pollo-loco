import { Level } from '../world/level.class.js';

/**
 * Custom Audio class to manage Audio with volume multiplier and state of loading/playing.
 * @class
 */
class MyAudio {
    file;
    isLoaded;
    volMult = 1;
    hasPlayed = false;

    /**
     * Create a new MyAudio object.
     * @param {Audio} file - Audio file to manage
     * @param {number} mult - multipier to adjust base volume
     */
    constructor(file, mult) {
        this.file = new Audio(file);
        this.file.currentTime = 0;
        this.volMult = mult;
    }

    /**
     * Play Audio file with adtjusted volume and mark as played.
     */
    play() {
        this.file.volume = Math.min(Math.max(AudioHub.volBase * this.volMult, 0), 1);
        const playPromise = this.file.play();
        this.hasPlayed = true;

        if (playPromise !== undefined) {
            playPromise.catch((e) => {
                if (e.name !== 'AbortError') {
                    console.error('Audio error:', e);
                }
            });
        }
    }

    /**
     * Reset hasPlayed property and Audio files currentTime.
     */
    reset() {
        this.hasPlayed = false;
        this.file.currentTime = 0;
    }
}

/**
 * Audio managing class.
 * @class
 */
export class AudioHub {
    static sounds = {};
    static camX = 0;
    static volLast = 0.2;
    static volBase = 0.2;

    /**
     * Retrieve volume from local storage.
     */
    static init() {
        AudioHub.getVolumeFromLocalStorage();
    }

    /**
     * Play given audio file if found in cache.
     * @param {{path: string, mult: number}}} soundJson - from AudioLib, containing path and multiplier for audio.
     */
    static play(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            if (sound.file.readyState === 4 || sound.isLoaded) {
                sound.isLoaded = true;
                sound.play();
            }
        }
    }

    /**
     * Checks if sound has been played at least once and ended.
     * @param {SoundFile} soundJson from AudioLib
     * @returns {boolean} True if played at least once and ended.
     */
    static hasEnded(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            return sound.hasPlayed === sound.file.ended || 0 === sound.file.currentTime;
        }
        return true;
    }

    /**
     * Play cached audio file from start.
     * @param {SoundFile} soundJson from AudioLib
     */
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

    /**
     * Play cached audio file if in range of a background width.
     * @param {SoundFile} soundJson from AudioLib
     * @param {number} x - coordinate of source object
     * @param {number} w - width of source object
     */
    static playIfNearby(soundJson, x, w) {
        const distance = AudioHub.camX + x;
        if (-w < distance && distance < Level.BG_WIDTH) {
            AudioHub.play(soundJson);
        }
    }

    /**
     * Play cached audio file from start if in range of a background width.
     * @param {SoundFile} soundJson from AudioLib
     * @param {number} x - coordinate of source object
     * @param {number} w - width of source object
     */
    static playFromStartIfNearby(soundJson, x, w) {
        const distance = AudioHub.camX + x;
        if (-w < distance && distance < Level.BG_WIDTH) {
            AudioHub.playFromStart(soundJson);
        }
    }

    /**
     * Stop all cached Audios.
     */
    static stopAll() {
        for (const key in AudioHub.sounds) {
            AudioHub.sounds[key].file.pause();
        }
    }

    /**
     * Stop a specific cached Audio file.
     * @param {SoundFile} soundJson from AudioLib
     */
    static stop(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            sound.file.pause();
        }
    }

    /**
     * Stop a specific cached Audio file and reset its currentTime to 0.
     * @param {SoundFile} soundJson from AudioLib
     */
    static stopReset(soundJson) {
        const sound = AudioHub.sounds[soundJson.path];
        if (sound) {
            sound.file.pause();
            sound.file.currentTime = 0;
        }
    }

    /**
     * Load given sound into cache.
     * @param {SoundFile} soundJson from AudioLib
     */
    static loadSound(soundJson) {
        const path = soundJson.path;
        if (path && !Object.hasOwn(AudioHub.sounds, path)) {
            AudioHub.sounds[soundJson.path] = new MyAudio(soundJson.path, AudioHub.volBase, soundJson.mult);
        }
    }

    /**
     * Load given sound into cache, or reset its properties if already present.
     * @param {SoundFile} soundJson from AudioLib
     */
    static loadOrResetSound(soundJson) {
        const path = soundJson.path;
        if (path && !Object.hasOwn(AudioHub.sounds, path)) {
            AudioHub.sounds[soundJson.path] = new MyAudio(soundJson.path, AudioHub.volBase, soundJson.mult);
        } else if (path && Object.hasOwn(AudioHub.sounds, path)) {
            AudioHub.sounds[soundJson.path].reset();
        }
    }

    /**
     * Load an array of sounds into cache.
     * @param {SoundFile[]} soundJson from AudioLib
     */
    static loadSounds(soundJsons) {
        for (const key in soundJsons) {
            AudioHub.loadSound(soundJsons[key]);
        }
    }

    /**
     * Let AudioHub know where the cam is.
     * @param {number} camX - current position of camera
     */
    static setCamX(camX) {
        AudioHub.camX = camX;
    }

    /**
     * Toggle Mute.
     */
    static toggleMute() {
        const tempLast = AudioHub.volLast;
        AudioHub.volLast = AudioHub.volBase;
        AudioHub.volBase = AudioHub.volBase === 0 ? tempLast : 0;

        AudioHub.updateAllVolumes();
        AudioHub.saveVolumeToLocalStorage();
    }

    /**
     * Set the base volume and update it for all sounds.
     * @param {number} volumePercentage - volume
     */
    static setVolume(volumePercentage) {
        AudioHub.volBase = volumePercentage / 100;
        AudioHub.volLast = AudioHub.volBase;
        AudioHub.updateAllVolumes();
        AudioHub.saveVolumeToLocalStorage();
    }

    /**
     * Update the volume inside every cached sound file.
     */
    static updateAllVolumes() {
        for (const key in AudioHub.sounds) {
            const sound = AudioHub.sounds[key];
            sound.file.volume = Math.min(Math.max(AudioHub.volBase * sound.volMult, 0), 1);
        }
    }

    /**
     * Store current base volume into local storage.
     */
    static saveVolumeToLocalStorage() {
        localStorage.setItem('AudioHub.volBase', AudioHub.volBase);
    }

    /**
     * Restore current base volume from local storage.
     */
    static getVolumeFromLocalStorage() {
        const volume = localStorage.getItem('AudioHub.volBase');
        if (volume != null) {
            AudioHub.volBase = volume;
        }
    }
}
