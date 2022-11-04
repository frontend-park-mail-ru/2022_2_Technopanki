import { Component } from '../../../Reacts';
import styles from './vacancies.module.scss';
import Header from '../../components/UI-kit/header/Header';
import VK from '../../static/icons/vk_logo.svg';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';
import Link from '../../components/Link/Link';
import { vacancyService } from '../../services/vacancyService';

export default class Vacancies extends Component<
    {},
    {
        vacancies: {
            id: string;
            title: string;
            img: string;
            salary: string;
            currency: string;
            location: string;
            format: string;
            hours: string;
        }[];
    }
> {
    state = {
        vacancies: [],
    };

    componentDidMount() {
        vacancyService
            .getAllVacancies()
            .then(body => {
                this.setState(() => ({
                    vacancies: body.vacancies,
                }));
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <Header key={'header'} />
                <div
                    className={`flex column g-24 relative screen-responsive ${styles.content}`}
                >
                    <h3 className={'mx-0'}>Поиск</h3>
                    <SearchInput />
                    {this.state.vacancies.map(vacancy => (
                        <VacancyCard
                            name={vacancy.title}
                            icon={vacancy.img}
                            salary={vacancy.salary}
                            currency={vacancy.currency}
                            location={vacancy.location}
                            format={vacancy.format}
                            hours={vacancy.hours}
                            description={vacancy.description}
                        />
                    ))}
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}
