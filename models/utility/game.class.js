import { Controls } from './controls.class.js';
import { World } from '../world/world.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';

export class Game {
    static FPS = 25;
    static world;
    static isPaused = false;

    static start() {
        Controls.init();
        Game.world = new World(document.getElementById('canvas'));
        Game.world.draw();
        Game.isPaused = false;
        window.world = Game.world; // TODO: remove - only for debugging
        window.timing = TimingHub.intervalIds; // TODO: remove - only for debugging
    }

    static pause() {
        TimingHub.pause();
        AudioHub.stopAll();
        Game.isPaused = true;
    }

    static resume() {
        TimingHub.resume();
        AudioHub.resume();
        Game.isPaused = false;
    }

    static restart() {
        TimingHub.clearGame();
        AudioHub.stopAll();
        Game.world = new World(document.getElementById('canvas'));
        Game.world.draw();
        Game.isPaused = false;
    }

    static toggleMute() {
        AudioHub.toggleMute();
    }

    static setVolume(volumePercentage) {
        AudioHub.setVolume(volumePercentage);
    }
}
