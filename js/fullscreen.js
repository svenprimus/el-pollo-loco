/**
 * Toggle fullscreen of the game. Game is restarted then by fullscreenchange event.
 */
export function toggleFullscreen() {
    if (!document.fullscreenElement) {
        openFullscreen();
    } else {
        closeFullscreen();
    }
    renderScreenButton();
}

export function renderScreenButton() {
    if (!document.fullscreenElement) {
        document.getElementById('btn-fullscreen-img').src = './assets/icons/fullscreen.svg';
    } else {
        document.getElementById('btn-fullscreen-img').src = './assets/icons/fullscreen-exit.svg';
    }
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
    }
}
