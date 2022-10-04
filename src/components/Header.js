import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import SubmitButton from './SubmitButton.js';
import Link from '../lib/router/Link.js';

export default class Header extends Component {
    render () {
        return createElement(
            'header',
            {
                key: 'header',
            },
            createElement(
                'div',
                {
                    key: 'full logo',
                    className: 'header__logo'
                },
                createText('img', {
                    key: 'icon',
                    alt: 'icon',
                    src: 'img/favicon.ico',
                    height: '16',
                }),
                createText('img', {
                    key: 'logo',
                    alt: 'logo',
                    src: 'img/Logo.svg',
                    height: '16',
                })
            ),
            createElement(
                'div',
                {
                    key: 'main_links',
                    className: 'header__links'
                },
                createComponent(Link, {
                    key: 'main page',
                    to: '/',
                    value: 'Главная',
                    className: 'header__links-default',
                    }),
                createComponent(Link, {
                    key: 'vacancies page',
                    to: '/vacancies',
                    value: 'Все вакансии',
                    className: 'header__links-default',
                    width: '100px'
                }),
                createComponent(Link, {
                    key: 'create resume',
                    to: '/',
                    value: 'Создать резюме',
                    className: 'header__links-default',
                })
            ),
            createElement(
                'div',
                {
                    key: 'header buttons',
                    className: 'header__buttons',
                },
                createComponent(Link, {
                    key: 'sign in link',
                    to: '/signin',
                    value: 'Вход',
                    className: 'header__links-signin',
                }),
                createComponent(SubmitButton, {
                    key: 'sign up button',
                    to: '/signup',
                    value: 'Создать аккаунт',
                    className: 'header__buttons-signup'
                })
            )
        );
    }
}

