import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './search.module.scss';
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
import { resumeService } from '../../services/resumeService';

export default class Search extends ReactsComponent<
    {},
    {
        vacancies?: {
            id: number;
            title: string;
            image: string;
            salary: string;
            currency: string;
            location: string;
            format: string;
            hours: string;
        }[];
        // resumes?: {
        //     id: string;
        //     title: string;
        //     description: string;
        //     postedByUserID: string;
        // }[];
        limit: number;
        searchType: string;
    }
> {
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
                name: 'format',
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
                ],
                name: 'experience',
            },
            {
                header: 'Зарплата',
                type: 'range',
                rangeMin: '0',
                rangeMax: '300000',
                name: 'salary',
            },
            {
                header: 'Город',
                type: 'input',
                name: 'city',
            }
        ],
        resumeFilter: [
            {
                type: 'toggle',
                header: 'Опыт работы',
                options: [
                    'Не имеет значения',
                    'Нет опыта',
                    'От 1 года до 3 лет',
                    'От 3 до 6 лет',
                    'Более 6 лет'
                ],
                name: 'experience',
            },
            {
                header: 'Зарплата',
                type: 'range',
                rangeMin: '0',
                rangeMax: '300000',
                name: 'salary',
            },
            {
                header: 'Город',
                type: 'input',
                name: 'city',
            }
        ]
    }

    state = {
        vacancies: [],
        // resumes: [],
        limit: 10,
        // searchType: 'vacancies',
        filter: this.filters.vacancyFilter
    };

    getDataFromServer = () => {
        document.getElementById('searchOption')?.innerHTML === 'Вакансии' ? (
            vacancyService
                .getAllVacancies()
                .then(body => {
                    this.setState(state => ({
                        searchType: 'vacancies',
                        limit: 10,
                        vacancies: [...body.data],
                        filter: this.filters.vacancyFilter
                    }));
                })
                .catch(err => console.error(err))
        ) : (
            resumeService
                .getAllResumes()
                .then(body => {
                    this.setState(state => ({
                        searchType: 'resumes',
                        limit: 10,
                        resumes: [...body.data],
                        filter: this.filters.vacancyFilter
                    }));
                })
                .catch(err => console.error(err))
        )
    }

    switchFilters = () => {
        document.getElementById('searchOption')?.innerHTML === 'Вакансии' ? (
        this.setState(state => ({
            ...state,
            filter: this.filters.vacancyFilter
        }))
        ) : (
            this.setState(state => ({
                ...state,
                filter: this.filters.resumeFilter
            }))
        )
    }

    onSubmitSearch = async (e: SubmitEvent) => {
        e.preventDefault();
        const queryParam = document.getElementById('search').value
        console.log(queryParam)
        vacancyService
            .searchByVacancies(queryParam)
            .then(body => {
                this.setState(state => ({
                    limit: 10,
                    vacancies:[...body.data],
                }))
            })
            .catch(err => console.error(err))
    }

    onSubmitFilters = async (e: SubmitEvent) => {
        e.preventDefault();
        console.log('filters submitted')
        const searchParam = document.getElementById('search').value

        const formData = new FormData(e.target);

        searchParam
            ? formData.append('search', searchParam)
            : ''
        formData.get('city') === ''
            ? formData.delete('city')
            : ''

        const data = [...formData.entries()];
        console.log(data)

        const groupByParam = data.reduce((groupData, elem, index) => {
            if (index > 0) {
                groupData.at(-1)[0] === elem[0]
                    ? groupData.at(-1).push(elem[1])
                    : groupData.push(elem);
            }

            return groupData
        }, [data[0]])

        console.log(groupByParam)

        const queryString = groupByParam
            .map(x => x[0] === 'salary'
                ? `${encodeURIComponent(x[0])}=${encodeURIComponent(x.slice(1).join(':'))}`
                : `${encodeURIComponent(x[0])}=${encodeURIComponent(x.slice(1).join(','))}`)
            .join('&');
        console.log(queryString);

        vacancyService
            .filterVacancies(queryString)
            .then(body => {
                this.setState(state => ({
                    limit: 10,
                    vacancies:[...body.data],
                }))
            })
            .catch(err => console.error(err))
    }

    componentDidMount() {
        vacancyService
            .getAllVacancies()
            .then(body => {
                this.setState(state => ({
                    searchType: 'vacancies',
                    limit: 10,
                    vacancies: [...body.data],
                    filter: this.filters.vacancyFilter
                }));
            })
            .catch(err => console.error(err))
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
                    <SearchInput
                        onSubmitSearch={this.onSubmitSearch}
                        onSwitch={this.switchFilters}
                    />
                    <div className={'flex row justify-content-space-between g-16 screen-responsive'}>
                        <SearchFilter
                            filters={this.state.filter}
                            onSubmit={this.onSubmitFilters}
                        />
                        <div className={'flex column g-8 w-100'}>
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
                                    />))}
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
                </div>
                <div className={'screen-responsive'}>
                    <Footer key={'footer'} />
                </div>
            </div>
        );
    }
}
