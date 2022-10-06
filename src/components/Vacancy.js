import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../framework/core/VDOM/VDOMElement.js';
import Link from '../framework/router/Link.js';

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
                to: '/vacancies',
                alt: 'company icon',
                value: createElement('img', {
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
                        to: '/vacancies',
                        value: createText('p', null, this.props.vacancyTitle),
                    }),
                    createElement(
                        'div',
                        {
                            key: 'company metadata',
                            className: 'company__metadata',
                        },
                        createComponent(Link, {
                            key: 'company name',
                            to: '/vacancies',
                            className: 'company__name',
                            value: createText(
                                'p',
                                null,
                                this.props.companyName,
                            ),
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
                    '17 сентября, 2022 • 14:30',
                ),
            ),
            createElement(
                'div',
                {
                    key: 'salary',
                    className: 'vacancy__salary',
                },

                createText(
                    'h5',
                    {
                        key: 'salary value',
                        className: 'vacancy__salary-value',
                    },
                    this.props.salary + '₽',
                ),
                createText(
                    'p',
                    {
                        key: 'per month',
                        className: 'vacancy__per-month',
                    },
                    ' в месяц',
                ),
            ),
        );
    }
}
