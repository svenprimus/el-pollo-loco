const FPS = 25;
let world;

function init() {
    const canvas = document.getElementById('canvas');
    world = new World(canvas);
    world.draw();
}
