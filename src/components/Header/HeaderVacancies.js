import { Component } from '../../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement, createText,
} from '../../framework/core/VDOM/VDOMElement.js';
import Link from '../../framework/router/Link.js';

export default class HeaderVacancies extends Component {
    render() {
        return createElement(
            'div',
            {
                key: 'main links',
                className: 'header__links',
            },
            createComponent(Link, {
                key: 'vacancies page',
                to: '/',
                className: 'header__links-default',
                value: createText(
                    'p',
                    { key: 'main page link' },
                    'Главная',
                ),
            }),
            createComponent(Link, {
                key: 'vacancies page',
                to: '/vacancies',
                className: 'header__links-current',
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
        )
    }
}