import { Component } from '../../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../lib/core/VDOM/VDOMElement.js';
import Input from '../Input.js';
import SubmitButton from '../SubmitButton.js';
import Link from '../../lib/router/Link.js';

export default class SignUpForm extends Component {
    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const response = await fetch('http://localhost:8080/auth/sign-up  ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: formData.get('email'),
                Name: formData.get('name'),
                Surname: formData.get('surname'),
                Password: formData.get('password'),
            }),
            credentials: 'include',
        });

        response.json().then(data => console.log(data));
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
                    key: 'toggle_div',
                    className: 'toggle-wrapper',
                },
                createElement('input', {
                    key: 'radio',
                    type: 'radio',
                    name: 'toggle',
                    id: 'type_toggle__employer',
                }),
                createText(
                    'label',
                    { key: 'label', htmlFor: 'type_toggle__employer' },
                    'Я работодатель',
                ),
                createElement('input', {
                    key: 'radio',
                    type: 'radio',
                    name: 'toggle',
                    id: 'type_toggle__applicant',
                }),
                createText(
                    'label',
                    { key: 'label', htmlFor: 'type_toggle__applicant' },
                    'Я соискатель',
                ),
            ),
            createComponent(SubmitButton, {
                key: 'submit',
                className: 'form__submit-button',
                value: 'Создать аккаунт',
            }),
            createComponent(Link, {
                key: 'link',
                to: '/signin',
                value: 'Перейти к авотриизации',
            }),
        );
    }
}
