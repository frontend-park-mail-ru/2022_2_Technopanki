import { Component } from '../../../Reacts';
import styles from './vacancies.module.scss';
import Header from '../../components/UI-kit/header/Header';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';
import { vacancyService } from '../../services/vacancyService';

export default class Vacancies extends Component<
    {},
    {
        vacancies: {
            id: string | number;
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
                console.log('body: ', body);
                this.setState(() => ({
                    vacancies: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <Header key={'header'} />
                <div
                    key={'vacacnies'}
                    className={`flex column g-24 relative screen-responsive ${styles.content}`}
                >
                    <h3 key={'h'} className={'mx-0'}>
                        Поиск
                    </h3>
                    <SearchInput key={'search'} />
                    {this.state.vacancies.map(vacancy => (
                        <VacancyCard
                            key={vacancy.id.toString()}
                            id={vacancy.id.toString()}
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
                <div className={'screen-responsive'}>
                    <Footer key={'footer'} />
                </div>
            </div>
        );
    }
}
