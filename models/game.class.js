class Game {
    static world;
    static start() {
        const canvas = document.getElementById('canvas');
        Game.world = new World(canvas);
        Game.world.draw();
    }

    static restart() {
        TimingHub.clearGame();
        const canvas = document.getElementById('canvas');
        Game.world = new World(canvas);
        Game.world.draw();
    }

    static pause() {
        TimingHub.pause();
    }

    static resume() {
        TimingHub.resume();
    }
}
