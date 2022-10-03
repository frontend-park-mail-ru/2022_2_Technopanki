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
