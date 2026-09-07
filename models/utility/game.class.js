import { Controls } from './controls.class.js';
import { World } from '../world/world.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';

/**
 * Game containing the world and game controls (start, pause, resume, volume)
 * @class
 */
export class Game {
    static FPS = 25;
    static world;
    static isPaused = false;

    /**
     * Initiate controls and a new World and start it.
     */
    static start() {
        Controls.init();
        Game.world = new World();
        Game.world.draw();
        Game.isPaused = false;
    }

    /**
     * Pause the game, including audio.
     */
    static pause() {
        TimingHub.pause();
        AudioHub.stopAll();
        Game.isPaused = true;
    }

    /**
     * Resume the game, excluding audio.
     */
    static resume() {
        TimingHub.resume();
        Game.isPaused = false;
    }

    /**
     * Clear all timings and audio. Create a new world.
     */
    static restart() {
        TimingHub.clearGame();
        AudioHub.stopAll();
        Game.world = new World(document.getElementById('canvas'));
        Game.world.draw();
        Game.isPaused = false;
    }

    /**
     * Toggle mute
     */
    static toggleMute() {
        AudioHub.toggleMute();
    }

    /**
     * Set volume
     * @param {number} volumePercentage - volume percentage
     */
    static setVolume(volumePercentage) {
        AudioHub.setVolume(volumePercentage);
    }
}
