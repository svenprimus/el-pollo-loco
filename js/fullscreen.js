import { Events } from '../models/utility/events.class.js';
import { TimingHub } from '../models/utility/timing-hub.class.js';
export function toggleFullscreen() {
    if (!document.fullscreenElement) {
        openFullscreen();
        TimingHub.setTimeout(() => {
            Events.restartGame();
        }, 100);
    } else {
        closeFullscreen();
        TimingHub.setTimeout(() => {
            Events.restartGame();
        }, 100);
    }
}
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

/* Close fullscreen */
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
