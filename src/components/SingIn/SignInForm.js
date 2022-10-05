import { Component } from '../../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../lib/core/VDOM/VDOMElement.js';
import Input from '../Input.js';
import SubmitButton from '../SubmitButton.js';
import Link from '../../lib/router/Link.js';
import { sendSignInData } from '../../services/network/helpers/signInHandler.js';
import { validateEmail } from '../../services/validation/validation.js';
import {
    setInvalidInput,
    setInvalidServerResponse,
    setValidInput,
} from '../../services/validation/formValidation.js';
import { EMAIL_ERROR } from '../../services/messages/errorMessages.js';
import { Router } from '../../lib/router/Router.js';
import { NetworkHander } from '../../services/network/NetworkHandler.js';
import { SIGNIN_URL } from '../../services/network/URLs.js';

/**
 * Component for showing sign up form.
 *
 * @component
 */
export default class SignInForm extends Component {
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

        if (!validFlag) {
            return;
        }

        const response = await sendSignInData(formData);

        if (response.status >= 400) {
            setInvalidServerResponse(e, response.body);
        } else {
            localStorage.setItem('name', response.body.name);
            localStorage.setItem('surname', response.body.surname);
            Router.render('/vacancies');
        }
    };

    componentWillMount = () => {
        if (localStorage.getItem('name') && localStorage.getItem('surname')) {
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
                key: 'form',
                noValidate: true,
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
                value: createText('p', null, 'Зарегистрироваться'),
                className: 'form__question_a',
            }),
        );
    }
}
