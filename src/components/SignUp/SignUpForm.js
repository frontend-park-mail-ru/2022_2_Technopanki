import { Component } from '../../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../framework/core/VDOM/VDOMElement.js';
import Input from '../Input.js';
import SubmitButton from '../Buttons/SubmitButton.js';
import Link from '../../framework/router/Link.js';
import RadioButton from '../Buttons/RadioButton.js';
import {
    validateEmail,
    validateNameLength,
    validateNameSymbols,
    validatePasswordLength,
    validatePasswordSymbols,
} from '../../services/validation/validation.js';
import {
    clearAllInputs,
    setInvalidInput,
    setInvalidServerResponse,
    setValidInput,
} from '../../services/validation/formValidation.js';
import { sendSignUpData } from '../../services/network/handlers/signUpHelper.js';
import { Router } from '../../framework/router/Router.js';
import {
    EMAIL_ERROR,
    NAME_LENGTH_ERROR,
    NAME_SYMBOLS_ERROR,
    PASSWORD_LENGTH_ERROR, PASSWORD_REPEAT_ERROR,
    PASSWORD_SYMBOLS_ERROR,
    SURNAME_LENGTH_ERROR,
    SURNAME_SYMBOLS_ERROR,
} from '../../services/messages/errorMessages.js';
import { userModel } from '../../services/model/userModel.js';

/**
 * Component for showing sign up form.
 *
 * @component
 */
export default class SignUpForm extends Component {
    componentDidMount = () => {
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
        } else if (!validatePasswordSymbols(formData.get('password'))) {
            setValidInput(e, 'password');
            setInvalidInput(e, 'password', PASSWORD_SYMBOLS_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'password');
        }

        if (formData.get('password') !== formData.get('repeat_password')) {
            setInvalidInput(e, 'repeat_password', PASSWORD_REPEAT_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'repeat_password');
        }

        if (!validateNameLength(formData.get('name'))) {
            setInvalidInput(e, 'name', NAME_LENGTH_ERROR);
            validFlag = false;
        } else if (!validateNameSymbols(formData.get('name'))) {
            setValidInput(e, 'name');
            setInvalidInput(e, 'name', NAME_SYMBOLS_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'name');
        }

        if (!validateNameLength(formData.get('surname'))) {
            setInvalidInput(e, 'surname', SURNAME_LENGTH_ERROR);
            validFlag = false;
        } else if (!validateNameSymbols(formData.get('surname'))) {
            setValidInput(e, 'surname');
            setInvalidInput(e, 'surname', SURNAME_SYMBOLS_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'surname');
        }

        if (!validFlag) {
            return;
        }

        const response = await sendSignUpData(formData);

        clearAllInputs(e);

        if (response.status >= 400) {
            setInvalidServerResponse(e, response.body);
        } else {
            userModel.isAuthorized = true;
            userModel.name = formData.get('name');
            userModel.surname = formData.get('surname');
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
                key: 'password repeat',
                label: 'Повторите пароль',
                inputType: 'password',
                name: 'repeat_password',
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
