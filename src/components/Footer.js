import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Link from '../lib/router/Link.js';

export default class Footer extends Component {
    render() {
        return createElement(
            'footer',
            {
                key: 'footer',
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
                createComponent(Link, {
                    key: 'logo link',
                    to: '/',
                    value: createElement('img', {
                        key: 'logo',
                        alt: 'logo',
                        src: 'img/Logo.svg',
                        height: '16',
                    }),
                }),
            ),
            createText('p', {
                key: 'outro',
                className: 'footer__outro'
            },
                'Build your team, find your mission.\n There is a job for everyone.'),
            createElement(
                'div',
                {
                    key: 'main_links',
                    className: 'header__links footer__links',
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
        );
    }
}