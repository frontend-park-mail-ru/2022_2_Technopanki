import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Header from '../components/Header.js';
import Vacancy from '../components/Vacancy.js';

export default class Vacancies extends Component {
    state = {
        vacancies: [
            {
                id: 1,
                title: 'Hello world',
                content: 'Some content here',
            },
            {
                id: 1,
                title: 'Hello world',
                content: 'Some content here',
            },
            {
                id: 1,
                title: 'Hello world',
                content: 'Some content here',
            },
            {
                id: 4,
                title: 'Hello world',
                content: 'Some content here',
            },
        ],
    };

    render() {
        return createElement(
            'div',
            {
                key: 'vacancies page',
                className: 'content',
            },
            createComponent(Header, { key: 'header' }),
            createElement(
                'div',
                {
                    key: 'vacancies body',
                    className: 'vacancies__body',
                },
                createText('h2', { key: 'vacancies header' }, 'Все вакансии'),
                createText('p', { key: 'vacancies intro' }, 'some intro text'),
                createComponent(Vacancy, { key: 'vacancy' }),
            ),
        );
    }
}
