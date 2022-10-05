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
                className: 'vacancy__cards-single',
            },
            createComponent(Link, {
                key: 'company logo',
                to: '/',
                alt: 'company icon',
                value: createText('img', {
                    key: 'company',
                    src: 'img/vk_logo.svg',
                }),
            }),
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
                        className: 'vacancy__header',
                    },
                    createComponent(Link, {
                        key: 'vacancy name',
                        className: 'vacancy__name',
                        value: createText(
                            'p',
                            null,
                            this.props.vacancyTitle,
                        ),
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
                            className: 'company__name',
                            value: createText('p', null, this.props.companyName),
                        }),
                        createText(
                            'p',
                            { key: 'company location' },
                            'в Москве',
                        ),
                    ),
                ),
                createText(
                    'p',
                    {
                        key: 'vacancy description',
                        className: 'vacancy__description',
                    },
                    this.props.vacancyDescription,
                ),
                createText(
                    'p',
                    {
                        key: 'publication date',
                        className: 'vacancy__date',
                    },
                    'September 17, 2022 • 14:30',
                ),
            ),
            createText(
                'h5',
                {
                    key: 'vacancy salary',
                    className: 'vacancy__salary',
                },
                this.props.salary + 'P/мес',
            ),
        );
    }
}
