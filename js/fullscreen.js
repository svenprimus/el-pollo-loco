import { Events } from '../models/utility/events.class.js';
let isFullscreen = false;

/**
 * Toggle fullscreen of the game. Game is restarted then by fullscreenchange event.
 */
export function toggleFullscreen() {
    if (!document.fullscreenElement && false === isFullscreen) {
        openFullscreen();
        Events.restartGameDelayed();
    } else {
        closeFullscreen();
        Events.restartGameDelayed();
    }
    renderScreenButton();
}

/**
 * Checks for fullscreen.
 * @returns {boolean} true if fullscreen was executed
 */
export function isFullscreenOpen() {
    return isFullscreen;
}

/**
 * Render Fullscreen/Fullscreen-Exit button graphic.
 */
export function renderScreenButton() {
    if (!document.fullscreenElement) {
        document.getElementById('btn-fullscreen-img').src = './assets/icons/fullscreen.svg';
        document.getElementById('btn-overlay-fullscreen-img').src = './assets/icons/fullscreen.svg';
    } else {
        document.getElementById('btn-fullscreen-img').src = './assets/icons/fullscreen-exit.svg';
        document.getElementById('btn-overlay-fullscreen-img').src = './assets/icons/fullscreen-exit.svg';
    }
}

/**
 * Open fullscreen
 */
function openFullscreen() {
    const elem = document.getElementById('game-wrapper');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        isFullscreen = true;
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
        isFullscreen = true;
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
        isFullscreen = true;
    } else {
        /* iOS fallback */
        resizeToFullscreen();
        isFullscreen = true;
    }
}

/**
 * Close fullscreen.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        isFullscreen = false;
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
        isFullscreen = false;
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
        isFullscreen = false;
    } else {
        /* iOS fallback */
        resizeToNormal();
        isFullscreen = false;
    }
}

/**
 * Resize elements manually to fullscreen (iPhone fallback)
 */
function resizeToFullscreen() {
    document.getElementById('game-wrapper').classList.add('ios-fullscreen');
    document.getElementById('game-wrapper').style.zIndex = '20';
    document.getElementById('canvas').classList.add('ios-fullscreen');
    document.getElementById('overlay').classList.add('ios-fullscreen');
}

/**
 * Resize elements manually to normal size (iPhone fallback)
 */
function resizeToNormal() {
    document.getElementById('game-wrapper').style.zIndex = '2';
    document.getElementById('game-wrapper').classList.remove('ios-fullscreen');
    document.getElementById('canvas').classList.remove('ios-fullscreen');
    document.getElementById('overlay').classList.remove('ios-fullscreen');
}
