import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import styles from './vacancy.module.scss';
import TextBlock from '../../components/UI-kit/text/TextBlock';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import VacancyHat from './VacancyHat';
import Footer from '../../components/UI-kit/footer/Footer';
import { vacancyStore } from '../../store/vacancy/store';
import { dispatch, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';
import { vacancyActions } from '../../store/vacancy/actions';

class Vacancy extends Component<{
    title: string;
    description: string;
}> {
    getDataFromServer() {
        // Мы точно уверены что путь будет vacancy/{0,9}+
        const vacancyID = location.pathname.split('/').at(-1);
        console.log(`VacancyID: ${vacancyID}`);

        vacancyService(vacancyID as string).then(data => {
            console.log(data);
            dispatch(vacancyActions.update(data));
        });
    }

    componentDidMount() {
        this.getDataFromServer();
        console.log(this.props);
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <div className={styles.header_substrate}></div>
                <div className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <VacancyHat
                            imgSrc={'./'}
                            companyName={'VK'}
                            description={'Место встречи профессионалов'}
                        />
                    </div>
                    <h3 className={'col-12'}>{this.props.title}</h3>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'Описание'}
                            content={this.props.description}
                        />
                        <TextBlock
                            headline={'Задачи'}
                            content={
                                'разработка новой и поддержка существующей функциональности для проекта vkplay.live\n' +
                                'ревью кода (делаем это всей командой)\n' +
                                'участие в проектировании архитектуры фронтенда\n' +
                                'участие в обсуждении реализации и планировании задач'
                            }
                        />
                        <TextBlock
                            headline={'Требования'}
                            content={
                                'отличные знания JavaScript\n' +
                                'уверенные навыки кроссбраузерной и адаптивной верстки (HTML5, CSS3, SCSS/LESS)\n' +
                                'опыт использования React, Redux\n' +
                                'опыт работы с git'
                            }
                        />
                        <TextBlock
                            headline={'Будет плюсом'}
                            content={
                                'знание TypeScript;\n' +
                                'опыт работы с Node.js;\n' +
                                'знание других языков программирования;\n' +
                                'навыки в области безопасности клиентских web-приложений;\n' +
                                'профиль на GitHub с личными проектами.'
                            }
                        />
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

export default vacancyConnect(store => {
    return store.getState();
})(Vacancy);
