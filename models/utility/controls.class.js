export class Controls {
    static UP = false;
    static DOWN = false;
    static LEFT = false;
    static RIGHT = false;
    static ATTACK = false;

    static init() {
        Controls.addEventsKeydown();
        Controls.addEventsKeyup();
    }

    static addEventsKeydown() {
        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                case 'Space':
                    Controls.UP = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    Controls.DOWN = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    Controls.LEFT = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    Controls.RIGHT = true;
                    break;
                case 'ControlRight':
                case 'KeyE':
                    Controls.ATTACK = true;
                    break;
            }
        });
    }

    static addEventsKeyup() {
        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                case 'Space':
                    Controls.UP = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    Controls.DOWN = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    Controls.LEFT = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    Controls.RIGHT = false;
                    break;
                case 'ControlRight':
                case 'KeyE':
                    Controls.ATTACK = false;
                    break;
            }
        });
    }
}
