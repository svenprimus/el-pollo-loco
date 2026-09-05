import { Game } from './game.class.js';
import { AudioLib } from './audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from './timing-hub.class.js';
import { toggleFullscreen, renderScreenButton } from '../../js/fullscreen.js';
import { InstrDialog, ImprintDialog } from './dialog.js';

export class Events {
    static init() {
        Events.initUI();
        window.addEventListener('load', Events.loadGame);
    }

    static loadGame = () => {
        Game.start();
        Game.pause();
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
        Events.setControls(false);
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
        renderScreenButton();
        Events.unfocusButton('btn-restart');
    }

    static restartGameDelayed() {
        TimingHub.setTimeout(() => {
            Events.restartGame();
            Events.restartGame(); // TODO: Workaround, as body size changes multiple times when leaving fullscreen
        }, 100);
    }

    static startGameFromMenu() {
        document.getElementById('overlay').classList.add('d-hidden');
        document.getElementById('canvas').style.zIndex = '20';
        document.getElementById('button-wrapper-ui').style.zIndex = '20';
        document.getElementById('button-wrapper-mobile').style.zIndex = '20';
        Events.setControls(false);
        Events.resumeGame();
    }

    static returnToMenu() {
        Events.restartGame();
        document.getElementById('overlay').classList.remove('d-hidden');
        document.getElementById('canvas').style.zIndex = '1';
        document.getElementById('button-wrapper-ui').style.zIndex = '1';
        document.getElementById('button-wrapper-mobile').style.zIndex = '1';
        Events.focusButton('btn-overlay-start');
        Events.setControls(true);
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

    static playVolumeProbe() {
        AudioHub.loadSound(AudioLib.COLLECTABLE.bottle.collect);
        AudioHub.playFromStart(AudioLib.COLLECTABLE.bottle.collect);
    }

    static renderUpdateVolumeElements() {
        const vol = AudioHub.volBase * 100;
        document.getElementById('volume').value = vol;
        document.getElementById('overlay-volume').value = vol;
        if (0 === vol) {
            document.getElementById('btn-mute-img').src = './assets/icons/unmute.svg';
            document.getElementById('btn-overlay-mute-img').src = './assets/icons/unmute.svg';
        } else {
            document.getElementById('btn-mute-img').src = './assets/icons/mute.svg';
            document.getElementById('btn-overlay-mute-img').src = './assets/icons/mute.svg';
        }
    }

    /**
     * un-focus button, so that e.g. space (jump) will not restart again
     * @param {string} button - id
     */
    static unfocusButton(button) {
        document.getElementById(button).blur();
    }

    static focusButton(button) {
        document.getElementById(button).focus();
    }

    static initUI() {
        Events.initUiButtonEvents();
        Events.initOverlayEvents();
        Events.initInstrDialogEvents();
        Events.initImprtDialogEvents();
        Events.initChangeEvents();
        Events.setControls(true);
    }

    static initUiButtonEvents() {
        document.getElementById('btn-resume').addEventListener('click', Events.toggleResumePauseGame);
        document.getElementById('btn-restart').addEventListener('click', Events.restartGame);
        document.getElementById('btn-mute').addEventListener('click', Events.toggleMute);
        document.getElementById('volume').addEventListener('input', Events.setVolume);
        document.getElementById('volume').addEventListener('change', Events.playVolumeProbe);
        document.getElementById('btn-return').addEventListener('click', Events.returnToMenu);
        document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
        document.getElementById('instr-dialog-wrapper').addEventListener('click', InstrDialog.stopDialogPropagation);
        document.getElementById('imprt-dialog-wrapper').addEventListener('click', ImprintDialog.stopDialogPropagation);
        AudioHub.init();
        Events.renderUpdateVolumeElements();
    }

    static initChangeEvents() {
        screen.orientation.addEventListener('change', () => {
            Events.restartGameDelayed();
        });
        document.addEventListener('fullscreenchange', () => {
            Events.restartGameDelayed();
        });
    }

    static initInstrDialogEvents() {
        document.getElementById('btn-instructions').addEventListener('click', InstrDialog.openDialogByMouseClick);
        document.getElementById('btn-instructions').addEventListener('keyup', InstrDialog.openDialogKeyup);
        document.getElementById('btn-overlay-instr').addEventListener('click', InstrDialog.openDialogByMouseClick);
        document.getElementById('btn-overlay-instr').addEventListener('keyup', InstrDialog.openDialogKeyup);
        document.getElementById('instructions-dialog').addEventListener('click', InstrDialog.closeDialog);
        document.getElementById('btn-close-dialog').addEventListener('click', InstrDialog.closeDialogByMouseClick);
        document.getElementById('btn-close-dialog').addEventListener('keyup', InstrDialog.closeDialogbyKeyup);
    }

    static initImprtDialogEvents() {
        document.getElementById('btn-overlay-imprt').addEventListener('click', ImprintDialog.openDialogByMouseClick);
        document.getElementById('btn-overlay-imprt').addEventListener('keyup', ImprintDialog.openDialogKeyup);
        document.getElementById('imprint-dialog').addEventListener('click', ImprintDialog.closeDialog);
        document.getElementById('btn-close-imprint').addEventListener('click', ImprintDialog.closeDialogByMouseClick);
        document.getElementById('btn-close-imprint').addEventListener('keyup', ImprintDialog.closeDialogbyKeyup);
    }

    static setControls(disable) {
        document.getElementById('btn-resume').disabled = disable;
        document.getElementById('btn-restart').disabled = disable;
        document.getElementById('btn-mute').disabled = disable;
        document.getElementById('volume').disabled = disable;
        document.getElementById('btn-fullscreen').disabled = disable;
        document.getElementById('btn-instructions').disabled = disable;
        document.getElementById('btn-left').disabled = disable;
        document.getElementById('btn-right').disabled = disable;
        document.getElementById('btn-jump').disabled = disable;
        document.getElementById('btn-attack').disabled = disable;
        document.getElementById('btn-drink').disabled = disable;
    }

    static initOverlayEvents() {
        document.getElementById('btn-overlay-start').addEventListener('click', Events.startGameFromMenu);
        document.getElementById('btn-overlay-mute').addEventListener('click', Events.toggleMute);
        document.getElementById('overlay-volume').addEventListener('input', Events.setVolume);
        document.getElementById('overlay-volume').addEventListener('change', Events.playVolumeProbe);
        document.getElementById('btn-overlay-fullscreen').addEventListener('click', toggleFullscreen);
    }
}
