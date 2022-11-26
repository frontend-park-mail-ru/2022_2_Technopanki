import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './vacancies.module.scss';
import Header from '../../components/UI-kit/header/Header';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';
import { vacancyService } from '../../services/vacancyService';
import Button from '../../components/UI-kit/buttons/Button';
import RenderWithCondition from '../../components/RenderWithCondition';
import SearchFilter from '../../components/UI-kit/filters/SearchFilter';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { dispatch } from '../../store';
import { activateError, deactivateError } from '../../store/errors/actions';

export default class Vacancies extends ReactsComponent<
    {},
    {
        vacancies: {
            id: number;
            title: string;
            image: string;
            salary: string;
            currency: string;
            location: string;
            format: string;
            hours: string;
        }[];
        limit: number;
    }
> {
    state = {
        vacancies: [],
        limit: 10,
    };

    filters = {
        vacancyFilter: [
            {
                type: 'toggle',
                header: 'Формат работы',
                options: [
                    'Полный день',
                    'Смешанный формат',
                    'Удаленная работа',
                    'Гибкий график',
                    'Сменный график'
                ],
            },
            {
                type: 'toggle',
                header: 'Опыт работы',
                options: [
                    'Не имеет значения',
                    'Нет опыта',
                    'От 1 года до 3 лет',
                    'От 3 до 6 лет',
                    'Более 6 лет'
                ]
            },
            {
                header: 'Зарплата',
                type: 'range',
                rangeMin: '0',
                rangeMax: '300000'
            }
        ]
    }

    componentDidMount() {
        vacancyService
            .getAllVacancies()
            .then(body => {
                this.setState(state => ({
                    limit: 10,
                    vacancies: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    }

    increaseLimit = () => {
        this.setState(state => ({ ...state, limit: state.limit + 10 }));
    };

    render() {
        return (
            <div>
                <Header key={'header'} />
                <div
                    key={'vacacnies'}
                    className={`flex column g-24 relative screen-responsive ${styles.content}`}
                >
                    <SearchInput />
                    <div className={'flex row justify-content-space-between screen-responsive'}>
                        <SearchFilter
                            filters={this.filters.vacancyFilter}
                        />
                        {this.state.vacancies
                            ?.slice(0, this.state.limit)
                            .map(vacancy => (
                                <VacancyCard
                                    key={vacancy.id.toString()}
                                    id={vacancy.id.toString()}
                                    name={vacancy.title}
                                    icon={vacancy.image}
                                    salary={vacancy.salary}
                                    currency={vacancy.currency}
                                    location={vacancy.location}
                                    format={vacancy.format}
                                    hours={vacancy.hours}
                                    description={vacancy.description}
                                />
                            ))}
                        <div className={'w-100'}>
                            <RenderWithCondition
                                condition={
                                    this.state.limit < this.state.vacancies.length
                                }
                                onSuccess={
                                    <Button onClick={this.increaseLimit}>
                                        Посмотреть еще
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className={'screen-responsive'}>
                    <Footer key={'footer'} />
                </div>
            </div>
        );
    }
}
