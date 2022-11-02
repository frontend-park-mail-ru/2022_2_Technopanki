import { Component } from '../../../Reacts';
import styles from './vacancies.module.scss';
import Header from '../../components/UI-kit/header/Header';
import VK from '../../static/icons/vk_logo.svg';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';
import Link from '../../components/Link/Link';
import network from '../../lib/network';
import { SERVER_URL, SERVER_URLS } from '../../utils/constants';

export default class Vacancies extends Component {
    state = {};

    render() {
        return (
            <div>
                <Header key={'header'} />
                <div
                    className={`flex column g-24 relative screen-responsive ${styles.content}`}
                >
                    <h2 className={'mx-0'}>Поиск</h2>
                    <SearchInput />
                    <Link
                        to={'/vacancy'}
                        content={
                            <VacancyCard
                                name={'Фронтенд-разработчик'}
                                icon={VK}
                                salary={'260.000'}
                                currency={'₽'}
                                location={'Москва'}
                                format={'удаленно'}
                                hours={'40 часов в неделю'}
                            />
                        }
                    />
                    <VacancyCard
                        name={'Фронтенд-разработчик'}
                        icon={VK}
                        salary={'260.000'}
                        currency={'₽'}
                        location={'Москва'}
                        format={'удаленно'}
                        hours={'40 часов в неделю'}
                    />
                    <VacancyCard
                        name={'Фронтенд-разработчик'}
                        icon={VK}
                        salary={'260.000'}
                        currency={'₽'}
                        location={'Москва'}
                        format={'удаленно'}
                        hours={'40 часов в неделю'}
                    />
                    <VacancyCard
                        name={'Фронтенд-разработчик'}
                        icon={VK}
                        salary={'260.000'}
                        currency={'₽'}
                        location={'Москва'}
                        format={'удаленно'}
                        hours={'40 часов в неделю'}
                    />
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}
