import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../framework/core/VDOM/VDOMElement.js';
import Link from '../framework/router/Link.js';

export default class Footer extends Component {
    render() {
        return createElement(
            'footer',
            {
                key: 'footer',
            },
            createComponent(Link, {
                    key: 'logo',
                    to: '/',
                    value: createElement('img', {
                        alt: 'logo svg',
                        src: 'img/logo.svg'
                    })
                },
            ),
            createText(
                'p',
                {
                    key: 'outro',
                    className: 'footer__outro',
                },
                'Build your team, find your mission.\n There is a job for everyone.',
            ),
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
