import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import styles from './vacancy.module.scss';
import TextBlock from '../../../components/UI-kit/text/TextBlock';
import VacancySideBar from '../../../components/sidebars/VacancySideBar';
import VacancyHat from '../../../components/hats/VacancyHat';

export default class Vacancy extends Component {
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
                    <h3 className={'col-12'}>Фронтенд-разработчик (VK Play)</h3>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'Описание'}
                            content={
                                'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты.\n' +
                                '\n' +
                                'Наша команда — это профессионалы из разных сфер, которые умеют реализовывать необычные и сложные идеи и задачи. Обмениваясь опытом, мы создаём новые идеи и достигаем большего.\n' +
                                '\n' +
                                'Если ты любишь решать сложные задачи, экспериментировать и создавать продукты для миллионов пользователей — присоединяйся, чтобы вместе развивать интернет и определять его будущее.'
                            }
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
                {/*<Footer />*/}
            </div>
        );
    }
}
