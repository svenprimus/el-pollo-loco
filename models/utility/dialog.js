import { Events } from './events.class.js';

export class InstrDialog {
    static debounceDialog = false;

    static openDialog() {
        Events.pauseGame();
        const dialogRef = document.getElementById('instructions-dialog');
        dialogRef.showModal();
        dialogRef.classList.add('opened');
        InstrDialog.setDialogFocusOnTop();
    }

    static closeDialog() {
        const dialogRef = document.getElementById('instructions-dialog');
        dialogRef.classList.remove('opened');
        dialogRef.close();
    }

    static setDialogFocusOnTop() {
        const dialogCloseRef = document.getElementById('btn-close-dialog');
        dialogCloseRef.focus();
    }

    static openDialogKeyup(event) {
        if (event.code === 'Enter') {
            if (false === InstrDialog.debounceDialog) {
                InstrDialog.openDialog();
            } else {
                InstrDialog.debounceDialog = false;
            }
        }
    }

    static openDialogByMouseClick(event) {
        if (event.detail > 0) {
            InstrDialog.openDialog();
        }
    }

    static closeDialogbyKeyup(event) {
        if (event.code === 'Enter') {
            InstrDialog.closeDialog();
        }
    }

    static closeDialogByMouseClick(event) {
        if (event.detail > 0) {
            InstrDialog.closeDialog();
        }
    }

    static stopDialogPropagation(event) {
        event.stopPropagation();
    }
}

export class ImprintDialog {
    static debounceDialog = false;

    static openDialog() {
        Events.pauseGame();
        const dialogRef = document.getElementById('imprint-dialog');
        dialogRef.showModal();
        dialogRef.classList.add('opened');
        ImprintDialog.setDialogFocusOnTop();
    }

    static closeDialog() {
        const dialogRef = document.getElementById('imprint-dialog');
        dialogRef.classList.remove('opened');
        dialogRef.close();
    }

    static setDialogFocusOnTop() {
        const dialogCloseRef = document.getElementById('btn-close-imprint');
        dialogCloseRef.focus();
    }

    static openDialogKeyup(event) {
        if (event.code === 'Enter') {
            if (false === ImprintDialog.debounceDialog) {
                ImprintDialog.openDialog();
            } else {
                ImprintDialog.debounceDialog = false;
            }
        }
    }

    static openDialogByMouseClick(event) {
        if (event.detail > 0) {
            ImprintDialog.openDialog();
        }
    }

    static closeDialogbyKeyup(event) {
        if (event.code === 'Enter') {
            ImprintDialog.closeDialog();
        }
    }

    static closeDialogByMouseClick(event) {
        if (event.detail > 0) {
            ImprintDialog.closeDialog();
        }
    }

    static stopDialogPropagation(event) {
        event.stopPropagation();
    }
}
