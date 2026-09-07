import { Events } from './events.class.js';

/**
 * Instruction Dialog
 * @class
 */
export class InstrDialog {
    static debounceDialog = false;

    /**
     * Open the instruction dialog and pause game.
     */
    static openDialog() {
        Events.pauseGame();
        const dialogRef = document.getElementById('instructions-dialog');
        dialogRef.showModal();
        dialogRef.classList.add('opened');
        InstrDialog.setDialogFocusOnTop();
    }

    /**
     * Close the instruction dialog.
     */
    static closeDialog() {
        const dialogRef = document.getElementById('instructions-dialog');
        dialogRef.classList.remove('opened');
        dialogRef.close();
    }

    /**
     * Set the focus on clode button.
     */
    static setDialogFocusOnTop() {
        const dialogCloseRef = document.getElementById('btn-close-dialog');
        dialogCloseRef.focus();
    }

    /**
     * Open dialog on 'Enter' key.
     * @param {Event} event - keyup event
     */
    static openDialogKeyup(event) {
        if (event.code === 'Enter') {
            if (false === InstrDialog.debounceDialog) {
                InstrDialog.openDialog();
            } else {
                InstrDialog.debounceDialog = false;
            }
        }
    }

    /**
     * Open dialog by mouse click.
     * @param {click} event
     */
    static openDialogByMouseClick(event) {
        if (event.detail > 0) {
            InstrDialog.openDialog();
        }
    }

    /**
     * Close dialog by 'Enter' key.
     * @param {Event} event - keyup event
     */
    static closeDialogbyKeyup(event) {
        if (event.code === 'Enter') {
            InstrDialog.closeDialog();
        }
    }

    /**
     * Close dialog by mouse click.
     * @param {Event} event - click event
     */
    static closeDialogByMouseClick(event) {
        if (event.detail > 0) {
            InstrDialog.closeDialog();
        }
    }

    /**
     * Stop propagation of event.
     */
    static stopDialogPropagation(event) {
        event.stopPropagation();
    }
}

/**
 * Imprint Dialog
 * @class
 */
export class ImprintDialog {
    static debounceDialog = false;

    /**
     * Open the imprint dialog and pause game.
     */
    static openDialog() {
        Events.pauseGame();
        const dialogRef = document.getElementById('imprint-dialog');
        dialogRef.showModal();
        dialogRef.classList.add('opened');
        ImprintDialog.setDialogFocusOnTop();
    }

    /**
     * Close the imprint dialog.
     */
    static closeDialog() {
        const dialogRef = document.getElementById('imprint-dialog');
        dialogRef.classList.remove('opened');
        dialogRef.close();
    }

    /**
     * Set the focus on clode button.
     */

    static setDialogFocusOnTop() {
        const dialogCloseRef = document.getElementById('btn-close-imprint');
        dialogCloseRef.focus();
    }

    /**
     * Open dialog on 'Enter' key.
     * @param {Event} event - keyup event
     */
    static openDialogKeyup(event) {
        if (event.code === 'Enter') {
            if (false === ImprintDialog.debounceDialog) {
                ImprintDialog.openDialog();
            } else {
                ImprintDialog.debounceDialog = false;
            }
        }
    }

    /**
     * Open dialog by mouse click.
     * @param {click} event
     */
    static openDialogByMouseClick(event) {
        if (event.detail > 0) {
            ImprintDialog.openDialog();
        }
    }

    /**
     * Close dialog by 'Enter' key.
     * @param {Event} event - keyup event
     */
    static closeDialogbyKeyup(event) {
        if (event.code === 'Enter') {
            ImprintDialog.closeDialog();
        }
    }

    /**
     * Close dialog by mouse click.
     * @param {Event} event - click event
     */
    static closeDialogByMouseClick(event) {
        if (event.detail > 0) {
            ImprintDialog.closeDialog();
        }
    }

    /**
     * Stop propagation of event.
     */
    static stopDialogPropagation(event) {
        event.stopPropagation();
    }
}
