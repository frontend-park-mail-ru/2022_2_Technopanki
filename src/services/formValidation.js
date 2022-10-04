import { USER_ALREADY_EXISTS_ERROR } from './network/messages/signUpMessages.js';

export const setInvalidInput = (event, inputName, message) => {
    event.target
        .querySelector(`input[name=${inputName}]`)
        .classList.add('invalid-input');

    const elem = document.createElement('p');
    elem.innerText = message;

    event.target.querySelector(`.form__input-error-${inputName}`).innerText =
        message;
};

export const setValidInput = (event, inputName) => {
    event.target
        .querySelector(`input[name=${inputName}]`)
        .classList.remove('invalid-input');

    event.target.querySelector(`.form__input-error-${inputName}`).innerText =
        '';
};

export const clearAllInputs = event => {
    event.target
        .querySelectorAll(`input`)
        .forEach(elem => elem.classList.remove('invalid-input'));
    event.target
        .querySelectorAll('.form__input-error')
        .forEach(elem => (elem.innerText = ''));
};

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
    } else if (responseBody.error.includes('user already exists')) {
        setInvalidInput(event, 'email', USER_ALREADY_EXISTS_ERROR);
    }
};
