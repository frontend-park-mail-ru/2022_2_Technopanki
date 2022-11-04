import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyResponsesHat from './VacancyResponsesHat';
import styles from './vacancy.module.scss';
import ResumeList from '../../components/UI-kit/resumeList/ResumeList';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import Chips from '../../components/UI-kit/chips/Chips';

export default class VacancyResponses extends Component {
    state = {
        responses: [
            {
                id: '1',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '2',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '3',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '4',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '5',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '6',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '7',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '8',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '9',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '10',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
            {
                id: '12',
                imgSrc: './',
                name: 'Владислав',
                surname: 'Кирпичов',
                resumeTitle: 'Фронтенд-разработчик',
                timeThenCreated: '12 сентября 2022 • 14:30',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
        ],
    };

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <div></div>
                <div className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <VacancyResponsesHat />
                    </div>
                    <h3 className={'col-12'}>Отклики на вакансию</h3>
                    <div className={'col-12 col-md-9 column g-16'}>
                        <h6>Фронтенд-разработчик (VK Play)</h6>
                        <ResumeList resume={this.state.responses} />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <VacancySideBar />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
