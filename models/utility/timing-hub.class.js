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
     * @returns id of new interval
     */
    static setInterval(fn, time, obj = null) {
        const id = setInterval(fn, time);
        TimingHub.intervalIds.push({ id: id, fn: fn, time: time, obj: obj });
        return id;
    }

    /**
     * Stop the managed interval.
     * @param {number} id - interval id
     * @returns index of id in managed container, or -1 if not existing
     */
    static stopInterval(id) {
        const index = TimingHub.getIntervalIndex(id);
        if (index >= 0) {
            clearInterval(id);
            TimingHub.intervalIds.splice(index, 1);
        }
        return index >= 0;
    }

    /**
     * A managed timeout that can be pause, restartet and clears itself.
     * @param {arrow-function} fn - function to be executed after timeout
     * @param {number} time - ms to trigger to timeout
     * @returns id of new timeout
     */
    static setTimeout(fn, time) {
        const id = setTimeout(() => {
            fn();
            this.clearTimeout(id);
        }, time);
        TimingHub.timeoutIds.push({ id: id, fn: fn, time: time });
        return id;
    }

    /**
     * Clears managed timeout and removes it from managed container.
     * @param {number} id - timeout id
     * @returns
     */
    static clearTimeout(id) {
        const index = TimingHub.getTimeoutIndex(id);
        if (index >= 0) {
            clearTimeout(id);
            TimingHub.timeoutIds.splice(index, 1);
        }
        return index >= 0;
    }

    /**
     * Cache and stop all timeouts and clear all intervals.
     */
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

    /**
     * Clear cache and stop all timeouts and intervals.
     */
    static clearGame() {
        TimingHub.pause();
        TimingHub.timeoutsBackup = [];
        TimingHub.intervalBackup = [];
    }

    /**
     * Resume all timeouts and intervals that have been paused (cached) before.
     */
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

    /**
     * Get the index of id from managed container.
     * @param {number} id - interval id
     * @returns index of id from managed container
     */
    static getIntervalIndex(id) {
        return TimingHub.intervalIds.findIndex((interval) => interval.id === id);
    }

    /**
     * Check if interval id is set.
     * @param {number} id - interval id
     * @returns index if found, else -1
     */
    static isIntervalSet(id) {
        return TimingHub.getIntervalIndex(id) >= 0;
    }

    /**
     * Get the index of id from managed container.
     * @param {number} id
     * @returns  index of id from managed container
     */
    static getTimeoutIndex(id) {
        return TimingHub.timeoutIds.findIndex((timeout) => timeout.id === id);
    }

    /**
     * Check if timeout id is set.
     * @param {number} id - timeout id
     * @returns index if found, else -1
     */
    static isTimeoutSet(id) {
        return TimingHub.getTimeoutIndex(id) >= 0;
    }
}
