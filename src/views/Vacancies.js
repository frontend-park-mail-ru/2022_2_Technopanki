import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Header from '../components/Header.js';
import Vacancy from '../components/Vacancy.js';

export default class Vacancies extends Component {
    getVacancy = async () => {
        const response = await fetch('http://localhost:8080/api/vacancy/')
        response.json().then(data => {
            this.setState((state) => {
                state.vacancies = data
                return state
            })
        })
    }

    state = {
        vacancies: []
    }

    render() {
        this.getVacancy()
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
                ...this.state.vacancies.map(vacancy =>
                    createComponent(Vacancy, {
                        key: vacancy.id,
                        vacancyTitle: vacancy.title ,
                        vacancyDescription: vacancy.description,
                        salary: vacancy.maximum_salary,
                        companyName: vacancy.company_name
                    }),
                ),
            ),
        );
    }
}
