import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import SubmitButton from './SubmitButton.js';
import Link from '../lib/router/Link.js';

export default class Header extends Component {
    state = {
        isUserAuthorized: false,
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
            createElement(
                'div',
                {
                    key: 'header buttons',
                    className: 'header__buttons',
                },
                localStorage.getItem('name') && localStorage.getItem('surname')
                    ? createText(
                          'p',
                          null,
                          `${localStorage.getItem(
                              'name',
                          )} ${localStorage.getItem('surname')}`,
                      )
                    : createElement(
                          'div',
                          null,
                          createComponent(Link, {
                              key: 'sign in link',
                              to: '/signin',
                              className: 'header__links-signin',
                              value: createText(
                                  'p',
                                  { key: 'logout link' },
                                  'Вход',
                              ),
                          }),
                          createComponent(SubmitButton, {
                              key: 'sign up button',
                              to: '/signup',
                              value: 'Создать аккаунт',
                              className: 'header__buttons-signup',
                          }),
                      ),
            ),
        );
    }
}
