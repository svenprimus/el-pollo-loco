import { Events } from '../models/utility/events.class.js';
let isFullscreen = false;

/**
 * Toggle fullscreen of the game. Game is restarted then by fullscreenchange event.
 */
export function toggleFullscreen() {
    if (false === isFullscreenOpen()) {
        openFullscreen();
    } else {
        closeFullscreen();
    }
    renderScreenButtons();
}

/**
 * Render Fullscreen/Fullscreen-Exit button graphic.
 */
export function renderScreenButtons() {
    if (!document.fullscreenElement && false === isFullscreen) {
        document.getElementById('start-menu-content').style.justifyContent = 'flex-start';
        document.getElementById('btn-fullscreen-img').src = './assets/icons/fullscreen.svg';
        document.documentElement.style.setProperty('--color-btn-screen-based', 'rgba(245, 245, 245, 0.8)');
    } else {
        document.getElementById('start-menu-content').style.justifyContent = 'center';
        document.getElementById('btn-fullscreen-img').src = './assets/icons/fullscreen-exit.svg';
        document.documentElement.style.setProperty('--color-btn-screen-based', 'rgba(245, 245, 245, 0.3)');
    }
}

/**
 * Checks for fullscreen.
 * @returns {boolean} true if fullscreen was executed
 */
export function isFullscreenOpen() {
    return document.fullscreenElement || isFullscreen;
}

/**
 * Open fullscreen
 */
function openFullscreen() {
    const elem = document.getElementById('game-wrapper');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    } else {
        /* iOS fallback */
        resizeToFullscreen();
    }
}

/**
 * Close fullscreen.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    } else {
        /* iOS fallback */
        resizeToNormal();
    }
}

/**
 * Resize elements manually to fullscreen (iPhone fallback).
 */
function resizeToFullscreen() {
    document.getElementById('game-wrapper').style.zIndex = 'var(--z-index-game-front)';
    document.getElementById('game-wrapper').classList.add('ios-fullscreen');
    document.getElementById('canvas').classList.add('ios-fullscreen');
    document.getElementById('overlay').classList.add('ios-fullscreen');
    document.getElementById('audio-wrapper-standard').classList.add('d-none');
    document.getElementById('audio-wrapper-iphone').classList.remove('d-none');
    Events.resetGameDelayed();
    isFullscreen = true;
}

/**
 * Resize elements manually to normal size (iPhone fallback).
 */
function resizeToNormal() {
    if (false === document.getElementById('overlay').classList.contains('d-none')) {
        document.getElementById('game-wrapper').style.zIndex = 'var(--z-index-game-back)';
    }
    document.getElementById('game-wrapper').classList.remove('ios-fullscreen');
    document.getElementById('canvas').classList.remove('ios-fullscreen');
    document.getElementById('overlay').classList.remove('ios-fullscreen');
    Events.resetGameDelayed();
    isFullscreen = false;
}
