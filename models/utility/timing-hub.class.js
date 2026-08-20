export class TimingHub {
    static intervalIds = [];
    static timeoutIds = [];
    static timeoutsBackup = [];
    static intervalBackup = [];

    /**
     * Sets an interval that can be paused and resumed.
     * @param {function} fn - function to execute
     * @param {number} time - interval in ms
     * @param {moveableObject} obj - moveableObject that wants should be resumeable
     * @returns
     */
    static setInterval(fn, time, obj = null) {
        const id = setInterval(fn, time);
        TimingHub.intervalIds.push({ id: id, fn: fn, time: time, obj: obj });
        return id;
    }

    static stopInterval(id) {
        const index = TimingHub.getIntervalIndex(id);
        if (index >= 0) {
            clearInterval(id);
            TimingHub.intervalIds.splice(index, 1);
        }
        return index >= 0;
    }

    static setTimeout(fn, time) {
        const id = setTimeout(fn, time);
        TimingHub.timeoutIds.push({ id: id, fn: fn, time: time });
        return id;
    }

    static clearTimeout(id) {
        const index = TimingHub.getTimeoutIndex(id);
        if (index >= 0) {
            clearTimeout(id);
            TimingHub.timeoutIds.splice(index, 1);
        }
        return index >= 0;
    }

    static pause() {
        TimingHub.timeoutsBackup = TimingHub.timeoutIds.slice();
        TimingHub.intervalBackup = TimingHub.intervalIds.slice();
        // Important: clear (remove) backwards, as after remove, the start index shifts
        for (let i = TimingHub.timeoutIds.length; i > 0; i--) {
            TimingHub.clearTimeout(TimingHub.timeoutIds[i - 1].id);
        }
        for (let i = TimingHub.intervalIds.length; i > 0; i--) {
            TimingHub.stopInterval(TimingHub.intervalIds[i - 1].id);
        }
    }

    static clearGame() {
        TimingHub.pause();
        TimingHub.timeoutsBackup = [];
        TimingHub.intervalBackup = [];
    }

    static resume() {
        TimingHub.timeoutsBackup.forEach((timeout) => {
            TimingHub.setTimeout(timeout.fn, timeout.time);
        });
        TimingHub.intervalBackup.forEach((interval) => {
            const newId = TimingHub.setInterval(interval.fn, interval.time);
            // revive old animation id with new one, so that animation can continue
            if (interval.obj != null && interval.obj.idAnimate === interval.id) {
                interval.obj.idAnimate = newId;
            }
        });
        TimingHub.timeoutsBackup = [];
        TimingHub.intervalBackup = [];
    }

    static getIntervalIndex(id) {
        return TimingHub.intervalIds.findIndex((interval) => interval.id === id);
    }

    static isIntervalSet(id) {
        return TimingHub.getIntervalIndex(id) >= 0;
    }

    static getTimeoutIndex(id) {
        return TimingHub.intervalIds.findIndex((timeout) => timeout.id === id);
    }

    static isTimeoutSet(id) {
        return TimingHub.getTimeoutIndex(id) >= 0;
    }
}
