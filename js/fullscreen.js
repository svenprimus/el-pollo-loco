/**
 * Toggle fullscreen of the game. Game is restarted then by fullscreenchange event.
 */
export function toggleFullscreen() {
    if (!document.fullscreenElement) {
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
    if (!document.fullscreenElement) {
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
