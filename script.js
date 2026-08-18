const FPS = 25;
let world;
const intervalIds = [];

function init() {
    const canvas = document.getElementById('canvas');
    world = new World(canvas);
    world.draw();
}

function setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    intervalIds.push(id);
}

function pauseGame() {
    intervalIds.forEach(clearInterval);
    // TODO: eventually we also must store remaining time to next tick for resume function
}

function resumeGame() {
    // TODO: store id, fn, time into array, so that we can stop by id and resume by fn and time?
}
