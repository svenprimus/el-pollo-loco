import { Game } from './game.class.js';
import { AudioHub } from '../utility/audio-hub.class.js'

export class Events {
    static init() {
        window.addEventListener('load', Events.startGame);
        document.getElementById('btn-pause').addEventListener('click', Events.pauseGame);
        document.getElementById('btn-resume').addEventListener('click', Events.resumeGame);
        document.getElementById('btn-restart').addEventListener('click', Events.restartGame);
        document.getElementById('btn-mute').addEventListener('click', Events.toggleMute);
        document.getElementById('volume').addEventListener('input', Events.setVolume);
        Events.updateVolumeSlider();
    }

    static startGame = () => {
        Game.start();
        Game.pause(); // game should not start without interaction
    };

    static pauseGame = () => {
        Game.pause();
        Events.unfocusButton('btn-pause');
    };

    static resumeGame = () => {
        Game.resume();
        Events.unfocusButton('btn-resume');
    };

    static restartGame = () => {
        Game.restart();
        Events.unfocusButton('btn-restart');
    };

    static toggleMute() {
        Game.toggleMute();
        Events.updateVolumeSlider();
        Events.unfocusButton('btn-mute');
    }

    static setVolume(event) {
        Game.setVolume(event.target.value);
    }

    static updateVolumeSlider() {
        AudioHub.init();
        document.getElementById('volume').value = AudioHub.volBase * 100;
    }

    /**
     * un-focus button, so that e.g. space (jump) will not restart again
     * @param {string} button - id
     */
    static unfocusButton(button) {
        document.getElementById(button).blur();
    }
}
