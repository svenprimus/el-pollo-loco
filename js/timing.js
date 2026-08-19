
/**
 * Sets an interval that can be paused and resumed.
 * @param {function} fn - function to execute
 * @param {number} time - interval in ms
 * @param {moveableObject} obj - moveableObject that wants should be resumeable
 * @returns 
 */
function setStoppableInterval(fn, time, obj = null) {
    const id = setInterval(fn, time);
    intervalIds.push({ id: id, fn: fn, time: time, obj: obj });
    return id;
}

function clearStoppableInterval(id) {
    const index = getIntervalIndex(id);
    if (index >= 0) {
        clearInterval(id);
        intervalIds.splice(index, 1);
    }
    return index >= 0;
}

function setStoppableTimeout(fn, time) {
    const id = setTimeout(fn, time);
    timeoutIds.push({ id: id, fn: fn, time: time });
    return id;
}

function clearStoppableTimeout(id) {
    const index = getTimeoutIndex(id);
    if (index >= 0) {
        clearTimeout(id);
        timeoutIds.splice(index, 1);
    }
    return index >= 0;
}

function pauseGame() {
    timeoutsBackup = timeoutIds.slice();
    intervalBackup = intervalIds.slice();
    // Important: clear (remove) backwards, as after remove, the start index shifts
    for (let i = timeoutIds.length; i > 0; i--) {
        clearStoppableTimeout(timeoutIds[i - 1].id);
    }
    for (let i = intervalIds.length; i > 0; i--) {
        clearStoppableInterval(intervalIds[i - 1].id);
    }
}

function resumeGame() {
    timeoutsBackup.forEach((timeout) => {
        setStoppableTimeout(timeout.fn, timeout.time);
    });
    intervalBackup.forEach((interval) => {
        const newId = setStoppableInterval(interval.fn, interval.time);
        // revive old animation id with new one, so that animation can continue
        if (interval.obj != null && interval.obj.idAnimate === interval.id) {
            interval.obj.idAnimate = newId;
        }
    });
    timeoutsBackup = [];
    intervalBackup = [];
}

function getIntervalIndex(id) {
    return intervalIds.findIndex((interval) => interval.id === id);
}

function isIntervalSet(id) {
    return getIntervalIndex(id) >= 0;
}

function getTimeoutIndex(id) {
    return intervalIds.findIndex((timeout) => timeout.id === id);
}

function isTimeoutSet(id) {
    return getTimeoutIndex(id) >= 0;
}
