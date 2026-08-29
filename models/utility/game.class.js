import { Controls } from './controls.class.js';
import { World } from '../world/world.class.js';
import { TimingHub } from '../utility/timing-hub.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';

export class Game {
    static FPS = 25;
    static world;

    static start() {
        Controls.init();
        const canvas = document.getElementById('canvas');
        Game.world = new World(canvas);
        Game.world.draw();
        window.world = Game.world; // TODO: remove - only for debugging
        window.timing = TimingHub.intervalIds; // TODO: remove - only for debugging
    }

    static pause() {
        TimingHub.pause();
        AudioHub.stopAll();
    }

    static resume() {
        TimingHub.resume();
        AudioHub.resume();
    }

    static restart() {
        TimingHub.clearGame();
        const canvas = document.getElementById('canvas');
        Game.world = new World(canvas);
        Game.world.draw();
    }
}
