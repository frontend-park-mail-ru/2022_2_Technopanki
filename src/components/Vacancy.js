import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Link from '../lib/router/Link.js';

export default class Vacancy extends Component {
    render() {
        return createElement(
            'div',
            {
                key: 'single vacancy',
                className: "vacancy__cards-single",
            },
            createElement(
                'div',
                {
                    key: 'vacancy body',
                    className: 'vacancy__body'
                },
                createElement(
                    'a',
                    {
                        key: 'logo link',
                        to: '/'
                    },
                    createText(
                        'img',
                        {
                            key: 'company icon',
                            alt: 'vk icon',
                            src: 'img/vk_logo.svg'
                        })),
                createElement(
                    'div',
                    {
                        key: 'header and description',
                        className: 'vacancy__metadata',
                    },
                    createElement(
                        'div',
                        {
                            key: 'header',
                            className: 'vacancy__header'
                        },
                        createComponent(Link, {
                            key: 'vacancy name',
                            className: 'vacancy__name',
                            value: 'Middle фронтэнд-разработчик'
                            }),
                        createElement(
                            'div',
                            {
                                key: 'company metadata',
                                className: 'company__metadata',
                            },
                            createComponent(Link, {
                                key: 'company name',
                                to: '/',
                                className: 'company__name'
                            }),
                            createText('p', { key: 'company location' }, 'в Москве'))),

                    createText('p',
                        {
                            key: 'vacancy description',
                            className: 'vacancy__description'
                        },
                        'some description text'),
                    createText('p',
                        {
                            key: 'publication date',
                            className: 'vacancy__date'
                        },
                        'September 17, 2022 • 14:30')),
                createText('h5',
                    {
                        key: 'vacancy salary',
                        className: 'vacancy__salary'
                    },
                    '100₽ в месяц')
            )
        )
    }
}