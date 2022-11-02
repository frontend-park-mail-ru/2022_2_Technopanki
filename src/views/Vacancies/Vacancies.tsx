import { Component } from '../../../Reacts';
import styles from './vacancies.module.scss';
import Header from '../../components/UI-kit/header/Header';
import VK from '../../static/icons/vk_logo.svg';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';

export default class Vacancies extends Component {
    render() {
        return (
            <div>
                <Header key={'header'} />
                <div
                    className={`flex column g-24 relative screen-responsive ${styles.content}`}
                >
                    <h2 className={'mx-0'}>Поиск</h2>
                    <SearchInput />
                    <VacancyCard
                        title={'Фронтенд-разработчик'}
                        icon={VK}
                        salary={'260.000'}
                        currency={'₽'}
                        location={'Москва'}
                        format={'удаленно'}
                        hours={'40 часов в неделю'}
                    />
                    <VacancyCard
                        title={'Фронтенд-разработчик'}
                        icon={VK}
                        salary={'260.000'}
                        currency={'₽'}
                        location={'Москва'}
                        format={'удаленно'}
                        hours={'40 часов в неделю'}
                    />
                    <VacancyCard
                        title={'Фронтенд-разработчик'}
                        icon={VK}
                        salary={'260.000'}
                        currency={'₽'}
                        location={'Москва'}
                        format={'удаленно'}
                        hours={'40 часов в неделю'}
                    />
                    <VacancyCard
                        title={'Фронтенд-разработчик'}
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
