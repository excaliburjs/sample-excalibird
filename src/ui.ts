import { Resources } from "./resources";

export function initMuteButton() {
    const muteButton = document.getElementById('mute');
    if (muteButton) {
        muteButton.addEventListener('click', toggleButtonClickHandler);
        muteButton.addEventListener('keydown', toggleButtonKeydownHandler);
        muteButton.addEventListener('keyup', toggleButtonKeyupHandler);
    }
}


/**
 * Toggles the toggle button’s state if it’s actually a button element or has
 * the `role` attribute set to `button`.
 *
 * @param {MouseEvent} event
 */
function toggleButtonClickHandler(event: any) {
    toggleButtonState(event!.currentTarget as HTMLButtonElement);
}

/**
 * Toggles the toggle button’s state with the enter key.
 *
 * @param {KeyboardEvent} event
 */
function toggleButtonKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 32) {
        event.preventDefault();
    } else if (event.keyCode === 13) {
        event.preventDefault();
        toggleButtonState(event!.currentTarget as HTMLButtonElement);
    }
}

/**
 * Toggles the toggle button’s state with space key.
 *
 * @param {KeyboardEvent} event
 */
function toggleButtonKeyupHandler(event: KeyboardEvent) {
    if (event.keyCode === 32) {
        event.preventDefault();
        toggleButtonState(event!.currentTarget as HTMLButtonElement);
    }
}

/**
 * Toggles the toggle button’s state between *pressed* and *not pressed*.
 *
 * @param {HTMLElement} button
 */
function toggleButtonState(button: HTMLElement) {
    const isAriaPressed = button.getAttribute('aria-pressed') === 'true';

    button.setAttribute('aria-pressed', isAriaPressed ? 'false' : 'true');

    if (!isAriaPressed) {
        Resources.BackgroundMusic.volume = 0;
        Resources.FlapSound.volume = 0;
        Resources.FailSound.volume = 0;
    } else {
        Resources.BackgroundMusic.volume = 1;
        Resources.FlapSound.volume = 1;
        Resources.FailSound.volume = 1;
    }
}
