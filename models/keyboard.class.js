class Keyboard {
    static UP = false;
    static DOWN = false;
    static LEFT = false;
    static RIGHT = false;
    static ATTACK = false;
}

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
            Keyboard.UP = true;
            break;
        case 'KeyS':
        case 'ArrowDown':
            Keyboard.DOWN = true;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            Keyboard.LEFT = true;
            break;
        case 'KeyD':
        case 'ArrowRight':
            Keyboard.RIGHT = true;
            break;
        case 'Space':
        case 'ControlRight':
            Keyboard.ATTACK = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
            Keyboard.UP = false;
            break;
        case 'KeyS':
        case 'ArrowDown':
            Keyboard.DOWN = false;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            Keyboard.LEFT = false;
            break;
        case 'KeyD':
        case 'ArrowRight':
            Keyboard.RIGHT = false;
            break;
        case 'Space':
        case 'ControlRight':
            Keyboard.ATTACK = false;
            break;
    }
});
