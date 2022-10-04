import { Component } from '../../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../lib/core/VDOM/VDOMElement.js';
import Input from '../Input.js';
import SubmitButton from '../SubmitButton.js';
import Link from '../../lib/router/Link.js';

export default class SignInForm extends Component {
    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const response = await fetch('http://localhost:8080/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
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
            createText('h4', { key: 'header' }, 'Авторизация'),
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
            createComponent(SubmitButton, {
                key: 'submit',
                className: 'form__submit-button',
                value: 'Войти',
            }),
            createComponent(Link, {
                key: 'link',
                to: '/signup',
                value: 'Зарегистрироваться',
                className: 'form__question_a',
            }),
        );
    }
}
