import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import SubmitButton from './SubmitButton.js';
import Link from '../lib/router/Link.js';
import HeaderUnauthorized from './HeaderUnauthorized.js';
import HeaderAuthorized from './HeaderAuthorized.js';

export default class Header extends Component {
    state = {
        isUserAuthorized: false,
        name: '',
        surname: '',
    };

    logout = () => {
        this.setState(state => {
            state.isUserAuthorized = false;
            return state;
        });

        fetch('http://localhost:8080/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        localStorage.clear();
    };

    componentWillMount = () => {
        if (localStorage.getItem('name') && localStorage.getItem('surname')) {
            this.setState(state => {
                state.isUserAuthorized = true;
                state.name = localStorage.getItem('name');
                state.surname = localStorage.getItem('surname');
                return state;
            });
        }
    };

    render() {
        return createElement(
            'header',
            {
                key: 'header',
            },
            createElement(
                'div',
                {
                    key: 'full logo',
                    className: 'header__logo',
                },
                createElement('img', {
                    key: 'icon',
                    alt: 'icon',
                    src: 'img/icon.svg',
                    height: '16',
                }),
                createElement('img', {
                    key: 'logo',
                    alt: 'logo',
                    src: 'img/Logo.svg',
                    height: '16',
                }),
            ),
            createElement(
                'div',
                {
                    key: 'main_links',
                    className: 'header__links',
                },
                createComponent(Link, {
                    key: 'main page',
                    to: '/',
                    className: 'header__links-default',
                    value: createText('p', { key: 'main link' }, 'Главная'),
                }),
                createComponent(Link, {
                    key: 'vacancies page',
                    to: '/vacancies',
                    className: 'header__links-default',
                    value: createText(
                        'p',
                        { key: 'vacancies page link' },
                        'Все вакансии',
                    ),
                }),
                createComponent(Link, {
                    key: 'create resume',
                    to: '/',
                    className: 'header__links-default',
                    value: createText(
                        'p',
                        { key: 'create resume link' },
                        'Создать резюме',
                    ),
                }),
            ),
            this.state.isUserAuthorized
                ? createComponent(HeaderAuthorized, { onclick: this.logout })
                : createComponent(HeaderUnauthorized),
        );
    }
}
