import { Events } from './events.class.js';

export class MyDialog {
    static debounceDialog = false;

    static openDialogKeyup(event) {
        if (event.code === 'Enter') {
            if (false === MyDialog.debounceDialog) {
                MyDialog.openDialog();
            } else {
                MyDialog.debounceDialog = false;
            }
        }
    }

    static openDialogByMouseClick(event) {
        if (event.detail > 0) {
            MyDialog.openDialog();
        }
    }

    static openDialog() {
        Events.pauseGame();
        const dialogRef = document.getElementById('instructions-dialog');
        dialogRef.showModal();
        dialogRef.classList.add('opened');
        MyDialog.setDialogFocusOnTop();
    }

    static closeDialog() {
        const dialogRef = document.getElementById('instructions-dialog');
        dialogRef.classList.remove('opened');
        dialogRef.close();
    }

    static closeDialogbyKeyup(event) {
        if (event.code === 'Enter') {
            MyDialog.closeDialog();
        }
    }

    static closeDialogByMouseClick(event) {
        if (event.detail > 0) {
            MyDialog.closeDialog();
        }
    }

    static stopDialogPropagation(event) {
        event.stopPropagation();
    }

    static setDialogFocusOnTop() {
        const dialogCloseRef = document.getElementById('btn-close-dialog');
        dialogCloseRef.focus();
    }
}
