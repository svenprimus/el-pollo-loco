import { TimingHub } from './timing-hub.class.js';
export class Controls {
    static UP = false;
    static DOWN = false;
    static LEFT = false;
    static RIGHT = false;
    static ATTACK = false;
    static ongoingTouches = new Map();
    static minDelta = 50;

    static init() {
        Controls.addEventsKeydown();
        Controls.addEventsKeyup();
        Controls.addEventsMobilePointerDown();
        Controls.addEventsMobilePointerUp();
        Controls.addEventsMobileGestures();
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
                case 'Enter':
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
                case 'Enter':
                case 'KeyE':
                    Controls.ATTACK = false;
                    break;
            }
        });
    }

    static addEventsMobilePointerDown() {
        document.getElementById('btn-left').addEventListener('pointerdown', (e) => {
            document.getElementById('btn-left').setPointerCapture(e.pointerId);
            e.preventDefault();
            Controls.LEFT = true;
        });
        document.getElementById('btn-right').addEventListener('pointerdown', (e) => {
            document.getElementById('btn-right').setPointerCapture(e.pointerId);
            e.preventDefault();
            Controls.RIGHT = true;
        });
        document.getElementById('btn-jump').addEventListener('pointerdown', (e) => {
            document.getElementById('btn-jump').setPointerCapture(e.pointerId);
            e.preventDefault();
            Controls.UP = true;
        });
        document.getElementById('btn-attack').addEventListener('pointerdown', (e) => {
            document.getElementById('btn-attack').setPointerCapture(e.pointerId);
            e.preventDefault();
            Controls.ATTACK = true;
        });
        document.getElementById('btn-drink').addEventListener('pointerdown', (e) => {
            document.getElementById('btn-drink').setPointerCapture(e.pointerId);
            e.preventDefault();
            Controls.DOWN = true;
        });
    }

    static addEventsMobilePointerUp() {
        document.getElementById('btn-left').addEventListener('pointerup', (e) => {
            document.getElementById('btn-attack').releasePointerCapture(e.pointerId);
            Controls.LEFT = false;
        });
        document.getElementById('btn-right').addEventListener('pointerup', (e) => {
            document.getElementById('btn-attack').releasePointerCapture(e.pointerId);
            Controls.RIGHT = false;
        });
        document.getElementById('btn-jump').addEventListener('pointerup', (e) => {
            document.getElementById('btn-attack').releasePointerCapture(e.pointerId);

            Controls.UP = false;
        });
        document.getElementById('btn-attack').addEventListener('pointerup', (e) => {
            document.getElementById('btn-attack').releasePointerCapture(e.pointerId);

            Controls.ATTACK = false;
        });
        document.getElementById('btn-drink').addEventListener('pointerup', (e) => {
            document.getElementById('btn-attack').releasePointerCapture(e.pointerId);

            Controls.DOWN = false;
        });
    }

    static addEventsMobileGestures() {
        document.getElementById('canvas').addEventListener('touchstart', Controls.handleTouchStart);
        document.getElementById('canvas').addEventListener('touchmove', Controls.handleTouchMove);
        document.getElementById('canvas').addEventListener('touchend', Controls.handleTouchEnd);
        document.getElementById('canvas').addEventListener('touchcancel', Controls.handleTouchEnd);
        document.getElementById('canvas').addEventListener('click', () => {
            Controls.UP = true;
            TimingHub.setTimeout(() => {
                Controls.UP = false;
            }, 50);
        });
    }

    static handleTouchStart(event) {
        for (const changedTouch of event.changedTouches) {
            Controls.ongoingTouches.set(changedTouch.identifier, { x: changedTouch.pageX, moved: false });
        }
    }

    static handleTouchMove(event) {
        event.preventDefault();

        for (const changedTouch of event.changedTouches) {
            const start = Controls.ongoingTouches.get(changedTouch.identifier);
            if (false === start) {
                console.error('Touch ID does not exist ', changedTouch.identifier);
                continue;
            }
            if (start.x > changedTouch.pageX && Math.abs(start.x - changedTouch.pageX) > Controls.minDelta) {
                Controls.LEFT = true;
                Controls.RIGHT = false;
            } else if (start.x < changedTouch.pageX && Math.abs(start.x - changedTouch.pageX) > Controls.minDelta) {
                Controls.LEFT = false;
                Controls.RIGHT = true;
            }
            Controls.ongoingTouches.set(changedTouch.identifier, {
                x: start.x,
                moved: start.moved || false === (Controls.LEFT || Controls.RIGHT),
            });
        }
    }

    static handleTouchEnd(event) {
        for (const changedTouch of event.changedTouches) {
            const touch = Controls.ongoingTouches.get(changedTouch.identifier);
            if (false === touch) {
                console.error('Touch ID cant be canceled ', changedTouch.identifier);
                continue;
            }

            if (false === touch.moved) {
                Controls.UP = true;
                console.log("end");
                TimingHub.setTimeout(() => {
                    Controls.UP = false;
                console.log("end2");

                }, 50);
            } else {
                Controls.LEFT = false;
                Controls.RIGHT = false;
            }

            Controls.ongoingTouches.delete(changedTouch.identifier);
        }
    }
}
