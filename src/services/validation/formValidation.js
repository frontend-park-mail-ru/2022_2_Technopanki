import { DEFAULT_MESSAGE } from '../messages/errorMessages.js';

/**
 * Sets input with name inputName at invalid state
 * @param {SubmitEvent} event
 * @param {string} inputName
 * @param {string} message - error message
 */
export const setInvalidInput = (event, inputName, message) => {
    event.target
        .querySelector(`input[name=${inputName}]`)
        .classList.add('invalid-input');

    const elem = document.createElement('p');
    elem.innerText = message;

    event.target.querySelector(`.form__input-error-${inputName}`).innerText =
        message;
};

/**
 * Sets input with name inputName at valid state
 * @param {SubmitEvent} event
 * @param {string} inputName
 */
export const setValidInput = (event, inputName) => {
    event.target
        .querySelector(`input[name=${inputName}]`)
        .classList.remove('invalid-input');

    event.target.querySelector(`.form__input-error-${inputName}`).innerText =
        '';
};

/**
 * Clear all events from .invalid-input
 * @param {SubmitEvent} event
 */
export const clearAllInputs = event => {
    event.target
        .querySelectorAll(`input`)
        .forEach(elem => elem.classList.remove('invalid-input'));
    event.target
        .querySelectorAll('.form__input-error')
        .forEach(elem => (elem.innerText = ''));
};

/**
 * Set invalid input according to server response
 * @param {SubmitEvent} event
 * @param {Object} responseBody
 */
export const setInvalidServerResponse = (event, responseBody) => {
    if (responseBody.error.includes('email')) {
        setInvalidInput(event, 'email', responseBody.error);
    } else if (
        responseBody.error.includes('пароля') ||
        responseBody.error.includes('пароль')
    ) {
        setInvalidInput(event, 'password', responseBody.error);
    } else if (responseBody.error.includes('имени')) {
        setInvalidInput(event, 'name', responseBody.error);
    } else if (responseBody.error.includes('фамилии')) {
        setInvalidInput(event, 'surname', responseBody.error);
    } else if (responseBody.error.includes('пользователь')) {
        setInvalidInput(event, 'email', responseBody.error);
    } else {
        setInvalidInput(event, 'email', DEFAULT_MESSAGE);
    }
};
