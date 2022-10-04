import { Component } from '../../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../lib/core/VDOM/VDOMElement.js';
import Input from '../Input.js';
import SubmitButton from '../SubmitButton.js';
import Link from '../../lib/router/Link.js';
import RadioButton from '../RadioButton.js';
import {
    validateEmail,
    validatePassword,
    validateName,
} from '../../services/validation.js';
import {
    setInvalidInput,
    setValidInput,
} from '../../services/formValidation.js';
import { sendSignUpData } from '../../services/network/handlers/signUpHandler.js';
import { Router } from '../../lib/router/Router.js';
import {
    EMAIL_ERROR,
    NAME_ERROR,
    PASSWORD_ERROR,
    SURNAME_ERROR,
    USER_ALREADY_EXISTS_ERROR,
} from '../../services/network/messages/signUpMessages.js';

export default class SignUpForm extends Component {
    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (validateEmail(formData.get('email'))) {
            setValidInput(e, 'email');
        } else {
            setInvalidInput(e, 'email', EMAIL_ERROR);
            return;
        }

        if (validatePassword(formData.get('password'))) {
            setValidInput(e, 'password');
        } else {
            setInvalidInput(e, 'password', PASSWORD_ERROR);
            return;
        }

        if (validateName(formData.get('name'))) {
            setValidInput(e, 'name');
        } else {
            setInvalidInput(e, 'name', NAME_ERROR);
            return;
        }

        if (validateName(formData.get('surname'))) {
            setValidInput(e, 'surname');
        } else {
            setInvalidInput(e, 'surname', SURNAME_ERROR);
            return;
        }

        const response = await sendSignUpData(formData);

        // Clear all inputs from errors
        e.target
            .querySelectorAll(`input`)
            .forEach(elem => elem.classList.remove('invalid-input'));
        e.target
            .querySelectorAll('.form__input-error')
            .forEach(elem => (elem.innerText = ''));

        response.json().then(data => {
            if (response.status >= 400 && data.error.includes('email')) {
                setInvalidInput(e, 'email', data.error);
            } else if (
                response.status >= 400 &&
                (data.error.includes('пароля') || data.error.includes('пароль'))
            ) {
                setInvalidInput(e, 'password', data.error);
            } else if (response.status >= 400 && data.error.includes('имени')) {
                setInvalidInput(e, 'name', data.error);
            } else if (
                response.status >= 400 &&
                data.error.includes('фамилии')
            ) {
                setInvalidInput(e, 'surname', data.error);
            } else if (
                response.status >= 400 &&
                data.error.includes('user already exists')
            ) {
                setInvalidInput(e, 'email', USER_ALREADY_EXISTS_ERROR);
            } else {
                Router.render('/');
            }
        });
    };

    render() {
        return createElement(
            'form',
            {
                id: 'signup_form',
                action: '/employers',
                className: 'menu__form',
                method: 'post',
                noValidate: true,
                onsubmit: this.onSubmit,
            },
            createText('h4', { key: 'header' }, 'Зарегистрироваться'),
            createComponent(Input, {
                key: 'email',
                label: 'Email',
                inputType: 'email',
                name: 'email',
                placeholder: 'example@email.ru',
                required: true,
            }),
            createComponent(Input, {
                key: 'password',
                label: 'Пароль',
                inputType: 'password',
                name: 'password',
                placeholder: '*****',
                required: true,
            }),
            createComponent(Input, {
                key: 'name',
                label: 'Имя',
                inputType: 'text',
                name: 'name',
                placeholder: 'Иван',
                required: true,
            }),
            createComponent(Input, {
                key: 'surname',
                label: 'Фамилия',
                inputType: 'text',
                name: 'surname',
                placeholder: 'Иванов',
                required: true,
            }),
            createElement(
                'div',
                {
                    className: 'toggle-wrapper',
                },
                createComponent(RadioButton, {
                    type: 'radio',
                    name: 'toggle',
                    id: 'type_toggle__employer',
                    checked: true,
                    value: 'employer',
                    label: 'Я работодатель',
                }),
                createComponent(RadioButton, {
                    type: 'radio',
                    name: 'toggle',
                    id: 'type_toggle__applicant',
                    value: 'applicant',
                    label: 'Я соискатель',
                }),
            ),
            createComponent(SubmitButton, {
                className: 'form__submit-button',
                value: 'Создать аккаунт',
            }),
            createComponent(Link, {
                to: '/signin',
                value: 'Авторизироваться',
                className: 'form__question_a',
            }),
        );
    }
}
