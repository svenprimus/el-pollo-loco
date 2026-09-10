import { Game } from './game.class.js';
import { AudioLib } from './audio-lib.class.js';
import { AudioHub } from '../utility/audio-hub.class.js';
import { TimingHub } from './timing-hub.class.js';
import { toggleFullscreen, renderScreenButtons } from '../../js/fullscreen.js';
import { InstrDialog, ImprintDialog } from './dialog.js';
import { Level } from '../world/level.class.js';
/**
 * Manages all events from UI, buttons, touches, orientation.
 * Connection to script.js.
 * @class
 */
export class Events {
    /**
     * Initialize events.
     * Connected to loading window.
     */
    static init() {
        Events.initUI();
        window.addEventListener('load', Events.loadGame);
    }

    /**
     * Start a paused game in background.
     */
    static loadGame = () => {
        Game.start();
        Game.pause();
        Events.renderMobileLandscapeHint();
    };

    /**
     * Initialize all event listeners and enable controls.
     */
    static initUI() {
        Events.initGameEvents();
        Events.initMenuEvents();
        Events.initInstrDialogEvents();
        Events.initImprtDialogEvents();
        Events.initGlobalListeners();
        Events.setControls(true);
    }

    /**
     * Pause game and update related button.
     */
    static pauseGame = () => {
        Game.pause();
        document.getElementById('btn-resume-img').src = './assets/icons/start.svg';
        Events.unfocusButton('btn-resume');
    };

    /**
     * Resume game and update related button.
     */
    static resumeGame = () => {
        Game.resume();
        document.getElementById('btn-resume-img').src = './assets/icons/pause.svg';
        Events.unfocusButton('btn-resume');
        Events.setControls(false);
    };

    /**
     * Toggle pause.
     */
    static toggleResumePauseGame = () => {
        if (Game.isPaused) {
            Events.resumeGame();
        } else {
            Events.pauseGame();
        }
    };

    /**
     * Restart the game.
     */
    static restartGame() {
        Level.hideEndScreen();
        Game.restart();
        document.getElementById('btn-resume-img').src = './assets/icons/pause.svg';
        renderScreenButtons();
        Events.unfocusButton('btn-restart');
    }

    /**
     * Reset and pause the game.
     */
    static resetGame() {
        Level.hideEndScreen();
        Game.restart();
        Game.pause();
        document.getElementById('btn-resume-img').src = './assets/icons/start.svg';
        renderScreenButtons();
        Events.unfocusButton('btn-restart');
    }

    /**
     * Restart a game after a small delay.
     */
    static resetGameDelayed() {
        TimingHub.setTimeout(() => {
            Events.resetGame();
        }, 100);
    }

    /**
     * Start the game from game menu. Brings the actual game (canvas) to front and disables the game menu overlay.
     */
    static startGameFromMenu() {
        document.getElementById('overlay').classList.add('d-none');
        const cstyle = getComputedStyle(document.documentElement);
        document.getElementById('canvas').style.zIndex = cstyle.getPropertyValue('--z-index-canvas-front');
        document.getElementById('btn-wrapper-mobile').style.zIndex = cstyle.getPropertyValue('--z-index-mobile-front');
        Events.setControls(false);
        Events.resumeGame();
    }

    /**
     * Return from game to game menu. Brings the actual game (canvas) to back and enables game menu overlay.
     */
    static returnToMenu() {
        Events.resetGame();
        document.getElementById('overlay').classList.remove('d-none');
        Level.hideEndScreen();
        const cstyle = getComputedStyle(document.documentElement);
        document.getElementById('canvas').style.zIndex = cstyle.getPropertyValue('--z-index-canvas-back');
        document.getElementById('btn-wrapper-mobile').style.zIndex = cstyle.getPropertyValue('--z-index-mobile-back');
        Events.focusButton('btn-overlay-start');
        Events.setControls(true);
    }

    /**
     * Toggle mute and update related button.
     */
    static toggleMute() {
        Game.toggleMute();
        Events.renderUpdateVolumeElements();
        Events.unfocusButton('btn-mute');
    }

    /**
     * Update volume and render related elements.
     * @param {Event} event
     */
    static setVolume(event) {
        Game.setVolume(event.target.value);
        Events.renderUpdateVolumeElements();
    }

    /**
     * Play a short volume probe. Useful for volume slider.
     */
    static playVolumeProbe() {
        AudioHub.loadSound(AudioLib.COLLECTABLE.bottle.collect);
        AudioHub.playFromStart(AudioLib.COLLECTABLE.bottle.collect);
    }

    /**
     * Render volume elements width updated volume.
     */
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
     * Render a hint for mobile devices, if in portrait mode. It is recommended to play in landscape mode.
     */
    static renderMobileLandscapeHint() {
        const hintRef = document.getElementById('mobile-landscape-hint');
        switch (screen.orientation.type) {
            case 'landscape-primary':
            case 'landscape-secondary':
                hintRef.classList.add('d-none');
                break;
            default:
                hintRef.classList.remove('d-none');
                break;
        }
    }

    /**
     * Restart game and render landscape hint for mobile, if in portrait mode.
     */
    static processOrientationChange() {
        Events.resetGameDelayed();
        Events.renderMobileLandscapeHint();
    }

    /**
     * un-focus button, so that e.g. space (jump) will not restart again
     * @param {string} button - id of html element
     */
    static unfocusButton(button) {
        document.getElementById(button).blur();
    }

    /**
     * Focus a button.
     * @param {string} button - id of html element
     */
    static focusButton(button) {
        document.getElementById(button).focus();
    }

    /**
     * Initialize events that are used within the actual game.
     * e.g. start, resume, volume, fullscreen
     */
    static initGameEvents() {
        document.getElementById('btn-resume').addEventListener('click', Events.toggleResumePauseGame);
        document.getElementById('btn-restart').addEventListener('click', Events.restartGame);
        document.getElementById('btn-endscreen-restart').addEventListener('click', Events.restartGame);
        document.getElementById('btn-mute').addEventListener('click', Events.toggleMute);
        document.getElementById('volume').addEventListener('input', Events.setVolume);
        document.getElementById('volume').addEventListener('change', Events.playVolumeProbe);
        document.getElementById('btn-return').addEventListener('click', Events.returnToMenu);
        document.getElementById('btn-endscreen-return').addEventListener('click', Events.returnToMenu);
        document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
        AudioHub.init();
    }

    /**
     * Initialize events that are used within starting menu.
     * e.g. start, volume, fullscreen, dialog
     */
    static initMenuEvents() {
        document.getElementById('btn-overlay-start').addEventListener('click', Events.startGameFromMenu);
        document.getElementById('instr-dialog-wrapper').addEventListener('click', InstrDialog.stopDialogPropagation);
        document.getElementById('imprt-dialog-wrapper').addEventListener('click', ImprintDialog.stopDialogPropagation);
        Events.renderUpdateVolumeElements();
    }

    /**
     * Initialize events for the Instruction-Dialog.
     */
    static initInstrDialogEvents() {
        document.getElementById('btn-instructions').addEventListener('click', InstrDialog.openDialogByMouseClick);
        document.getElementById('btn-instructions').addEventListener('keyup', InstrDialog.openDialogKeyup);
        document.getElementById('btn-overlay-instr').addEventListener('click', InstrDialog.openDialogByMouseClick);
        document.getElementById('btn-overlay-instr').addEventListener('keyup', InstrDialog.openDialogKeyup);
        document.getElementById('instructions-dialog').addEventListener('click', InstrDialog.closeDialog);
        document.getElementById('btn-close-dialog').addEventListener('click', InstrDialog.closeDialogByMouseClick);
        document.getElementById('btn-close-dialog').addEventListener('keyup', InstrDialog.closeDialogbyKeyup);
    }

    /**
     * Initialize events for the Imprint-Dialog.
     */
    static initImprtDialogEvents() {
        document.getElementById('btn-overlay-imprt').addEventListener('click', ImprintDialog.openDialogByMouseClick);
        document.getElementById('btn-overlay-imprt').addEventListener('keyup', ImprintDialog.openDialogKeyup);
        document.getElementById('imprint-dialog').addEventListener('click', ImprintDialog.closeDialog);
        document.getElementById('btn-close-imprint').addEventListener('click', ImprintDialog.closeDialogByMouseClick);
        document.getElementById('btn-close-imprint').addEventListener('keyup', ImprintDialog.closeDialogbyKeyup);
    }

    /**
     * Initialize global events.
     * e.g. orientation change, fullscreen change
     */
    static initGlobalListeners() {
        screen.orientation.addEventListener('change', () => {
            Events.processOrientationChange();
        });
        document.addEventListener('fullscreenchange', () => {
            Events.resetGameDelayed();
        });
    }

    /**
     * Disable or enable controls.
     * @param {boolean} disable - true: disable controls, false: enable controls
     */
    static setControls(disable) {
        document.getElementById('btn-resume').disabled = disable;
        document.getElementById('btn-restart').disabled = disable;
        document.getElementById('btn-return').disabled = disable;
        document.getElementById('btn-left').disabled = disable;
        document.getElementById('btn-right').disabled = disable;
        document.getElementById('btn-jump').disabled = disable;
        document.getElementById('btn-attack').disabled = disable;
        document.getElementById('btn-drink').disabled = disable;
    }
}
