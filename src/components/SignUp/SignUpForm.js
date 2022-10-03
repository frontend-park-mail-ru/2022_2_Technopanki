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
import { sendSignUpData } from '../../services/network/signUpHandler.js';
import { Router } from '../../lib/router/Router.js';

export default class SignUpForm extends Component {
    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (validateEmail(formData.get('email'))) {
            setValidInput(e, 'email');
        } else {
            setInvalidInput(e, 'email', 'bad email');
            return;
        }

        if (validatePassword(formData.get('password'))) {
            setValidInput(e, 'password');
        } else {
            setInvalidInput(e, 'password', 'bad password');
            return;
        }

        if (validateName(formData.get('name'))) {
            setValidInput(e, 'name');
        } else {
            setInvalidInput(e, 'name', 'bad name');
            return;
        }

        if (validateName(formData.get('surname'))) {
            setValidInput(e, 'surname');
        } else {
            setInvalidInput(e, 'surname', 'bad surname');
            return;
        }

        const response = await sendSignUpData(formData);
        response.json().then(data => console.log(data));
        Router.render('/');
    };

    render() {
        return createElement(
            'form',
            {
                id: 'signup_form',
                action: '/employers',
                className: 'menu__form',
                method: 'post',
                key: 'form',
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
