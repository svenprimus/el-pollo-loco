import { Game } from './game.class.js';

export class Events {
    static init() {
        window.addEventListener('load', Events.startGame);
        document.getElementById('btn-pause').addEventListener('click', Events.pauseGame);
        document.getElementById('btn-resume').addEventListener('click', Events.resumeGame);
        document.getElementById('btn-restart').addEventListener('click', Events.restartGame);
    }

    static startGame = () => {
        Game.start();
    };

    static pauseGame = () => {
        Game.pause();
        document.getElementById('btn-pause').blur();
    };

    static resumeGame = () => {
        Game.resume();
        document.getElementById('btn-resume').blur();
    };

    static restartGame = () => {
        Game.restart();
        document.getElementById('btn-restart').blur(); // un-focus button, so that space (jump) will not restart again
    };
}
