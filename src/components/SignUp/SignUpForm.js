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
    validateName,
    validatePasswordLength,
    validatePasswordSymbols,
} from '../../services/validation.js';
import {
    clearAllInputs,
    setInvalidInput,
    setInvalidServerResponse,
    setValidInput,
} from '../../services/formValidation.js';
import { sendSignUpData } from '../../services/network/handlers/signUpHandler.js';
import { Router } from '../../lib/router/Router.js';
import {
    EMAIL_ERROR,
    NAME_ERROR,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_SYMBOLS_ERROR,
    SURNAME_ERROR,
} from '../../services/network/messages/signUpMessages.js';

/**
 * Component for showing sign up form.
 *
 * @component
 */
export default class SignUpForm extends Component {
    componentWillMount = () => {
        if (localStorage.getItem('name') && localStorage.getItem('surname')) {
            Router.render('/vacancies');
        }
    };

    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let validFlag = true;

        if (validateEmail(formData.get('email'))) {
            setValidInput(e, 'email');
        } else {
            setInvalidInput(e, 'email', EMAIL_ERROR);
            validFlag = false;
        }

        if (!validatePasswordLength(formData.get('password'))) {
            setInvalidInput(e, 'password', PASSWORD_LENGTH_ERROR);
            validFlag = false;
        } else if (!validatePasswordSymbols(formData.get('pasword'))) {
            setValidInput(e, 'password');
            setInvalidInput(e, 'password', PASSWORD_SYMBOLS_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'password');
        }

        if (validateName(formData.get('name'))) {
            setValidInput(e, 'name');
        } else {
            setInvalidInput(e, 'name', NAME_ERROR);
            validFlag = false;
        }

        if (validateName(formData.get('surname'))) {
            setValidInput(e, 'surname');
        } else {
            setInvalidInput(e, 'surname', SURNAME_ERROR);
            validFlag = false;
        }

        if (!validFlag) {
            return;
        }

        const response = await sendSignUpData(formData);

        clearAllInputs(e);

        if (response.status >= 400) {
            response.json().then(body => setInvalidServerResponse(e, body));
        } else {
            localStorage.setItem('name', formData.get('name'));
            localStorage.setItem('surname', formData.get('surname'));
            Router.render('/vacancies');
        }
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
                placeholder: '*********',
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
                value: createText('p', null, 'Авторизироваться'),
                className: 'form__question_a',
            }),
        );
    }
}
