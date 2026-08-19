const FPS = 25;
let world;
const intervalIds = [];
const timeoutIds = [];
let timeoutsBackup = [];
let intervalBackup = [];

function init() {
    const canvas = document.getElementById('canvas');
    world = new World(canvas);
    world.draw();
}
