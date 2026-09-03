import { Game } from './game.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from './timing-hub.class.js';
import { toggleFullscreen } from '../../js/fullscreen.js';
export class Events {
    static init() {
        Events.initUI();
        window.addEventListener('load', Events.startGame);
    }

    static startGame = () => {
        Game.start();
        Game.pause(); // game should not start without interaction
    };

    static pauseGame = () => {
        Game.pause();
        document.getElementById('btn-resume-img').src = './assets/icons/start.svg';
        Events.unfocusButton('btn-resume');
    };

    static resumeGame = () => {
        Game.resume();
        document.getElementById('btn-resume-img').src = './assets/icons/pause.svg';
        Events.unfocusButton('btn-resume');
    };

    static toggleResumePauseGame = () => {
        if (Game.isPaused) {
            Events.resumeGame();
        } else {
            Events.pauseGame();
        }
    };

    static restartGame() {
        Game.restart();
        Game.pause();
        document.getElementById('btn-resume-img').src = './assets/icons/start.svg';
        Events.unfocusButton('btn-restart');
    }

    static restartGameDelayed() {
        TimingHub.setTimeout(() => {
            Events.restartGame();
        }, 100);
    }

    static toggleMute() {
        Game.toggleMute();
        Events.renderUpdateVolumeElements();
        Events.unfocusButton('btn-mute');
    }

    static setVolume(event) {
        Game.setVolume(event.target.value);
        Events.renderUpdateVolumeElements();
    }

    static renderUpdateVolumeElements() {
        const vol = AudioHub.volBase * 100;
        document.getElementById('volume').value = vol;
        if (0 === vol) {
            document.getElementById('btn-mute-img').src = './assets/icons/unmute.svg';
        } else {
            document.getElementById('btn-mute-img').src = './assets/icons/mute.svg';
        }
    }

    /**
     * un-focus button, so that e.g. space (jump) will not restart again
     * @param {string} button - id
     */
    static unfocusButton(button) {
        document.getElementById(button).blur();
    }

    static initUI() {
        Events.initInteractive();
        Events.initAutomatic();
    }

    static initInteractive() {
        document.getElementById('btn-resume').addEventListener('click', Events.toggleResumePauseGame);
        document.getElementById('btn-restart').addEventListener('click', () => {
            Events.restartGame();
        });
        document.getElementById('btn-mute').addEventListener('click', Events.toggleMute);
        document.getElementById('volume').addEventListener('input', Events.setVolume);
        document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
        AudioHub.init();
        Events.renderUpdateVolumeElements();
    }

    static initAutomatic() {
        screen.orientation.addEventListener('change', () => {
            Events.restartGameDelayed();
        });
        document.addEventListener('fullscreenchange', () => {
            Events.restartGameDelayed();
        });
    }
}
