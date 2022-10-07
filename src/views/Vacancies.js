import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../framework/core/VDOM/VDOMElement.js';
import Header from '../components/Header/Header.js';
import Footer from '../components/Footer.js';
import Vacancy from '../components/Vacancy.js';
import { getVacanciesFromServer } from '../services/network/handlers/vacanciesHandler.js';

export default class Vacancies extends Component {
    getVacancy = async () => {
        const response = await getVacanciesFromServer();
        this.setState(state => {
            state.vacancies = response.body;
            return state;
        });
    };

    componentDidMount = () => {
        this.getVacancy();
    };

    state = {
        vacancies: [],
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
                createText(
                    'p',
                    { key: 'vacancies intro' },
                    'Jobflow — сервис, который помогает найти работу и подобрать персонал более 20 лет! Создавайте резюме и откликайтесь на вакансии.',
                ),
                ...this.state.vacancies.map(vacancy =>
                    createComponent(Vacancy, {
                        key: vacancy.id,
                        vacancyTitle: vacancy.title,
                        vacancyDescription: vacancy.description,
                        salary: vacancy.maximum_salary,
                        companyName: vacancy.employer_name,
                    }),
                ),
            ),
            createComponent(Footer, { key: 'footer' }),
        );
    }
}
