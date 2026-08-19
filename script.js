const FPS = 25;
let world;
const intervalIds = [];
const timeoutIds = [];

function init() {
    const canvas = document.getElementById('canvas');
    world = new World(canvas);
    world.draw();
}

function setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    intervalIds.push(id);
    console.log('Interval + ', id, intervalIds);
    // console.log(intervalIds);
    return id;
}

function clearStoppableInterval(id) {
    const index = intervalIds.indexOf(id);
    if (index >= 0) {
        clearInterval(id);
        intervalIds.splice(index, 1);
        console.log('Interval -', id, intervalIds);
    }
    return index >= 0;
}

function setStoppableTimeout(fn, time) {
    const id = setTimeout(fn, time);
    timeoutIds.push(id);
    console.log('Timeouts + ', id, timeoutIds);

    return id;
}

function clearStoppableTimeout(id) {
    const index = timeoutIds.indexOf(id);
    if (index >= 0) {
        clearTimeout(id);
        timeoutIds.splice(index, 1);
        console.log('Timeouts -', id, timeoutIds);
    }
    return index >= 0;
}

function pauseGame() {
    console.log("---- Clearing ----");
    console.log("Timeouts ", timeoutIds.length, timeoutIds);
    // Important: clear (remove) backwards, as after remove, the start index shifts
    for (let i = timeoutIds.length; i >= 0; i--) {
        clearStoppableTimeout(timeoutIds[i]);
    }
    for (let i = intervalIds.length; i >= 0; i--) {
        clearStoppableInterval(intervalIds[i]);
    }
    // TODO: eventually we also must store remaining time to next tick for resume function
}

function resumeGame() {
    // TODO: store id, fn, time into array, so that we can stop by id and resume by fn and time?
}
