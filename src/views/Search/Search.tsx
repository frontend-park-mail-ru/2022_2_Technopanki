import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './search.module.scss';
import Header from '../../components/UI-kit/header/Header';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/searchCards/VacancyCard';
import { vacancyService } from '../../services/vacancyService';
import Button from '../../components/UI-kit/buttons/Button';
import RenderWithCondition from '../../components/RenderWithCondition';
import SearchFilter from '../../components/UI-kit/filters/SearchFilter';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { dispatch } from '../../store';
import { activateError, deactivateError } from '../../store/errors/actions';
import { VacancyState } from '../../store/vacancy/type';
import SearchFilterMobile from '../../components/UI-kit/filters/SearchFilterMobile';
import { resumeService } from '../../services/resumeService';
import { searchService } from '../../services/searchService';

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
        resumes?: {
            id: number;
            postedByUserID: string;
            title: string;
            description: string;
        }[];
        limit: number;
        typeOfSearch: 'vacancy' | 'resume' | 'applicant' | 'employer';
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
                    'Сменный график',
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
                    'Более 6 лет',
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
            },
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
                    'Более 6 лет',
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
            },
        ],
    };

    state = {
        vacancies: [],
        resumes: [],
        limit: 10,
        typeOfSearch: 'vacancy',
        filters: this.filters.vacancyFilter,
    };

    search = '';

    switchSearchType = (e: MouseEvent) => {
        const type = e.target.innerHTML;
        document.getElementById('searchOption').innerHTML = e.target.innerHTML;
        type === 'Вакансии'
            ? this.setState(state => ({
                  ...state,
                  typeOfSearch: 'vacancy',
                  filters: this.filters.vacancyFilter,
              }))
            : this.setState(state => ({
                  ...state,
                  typeOfSearch: 'resume',
                  filters: this.filters.resumeFilter,
              }));
    };

    getVacanciesFromServer = () => {
        vacancyService
            .getAllVacancies()
            .then(body => {
                console.log(body);
                this.setState(state => ({
                    ...state,
                    limit: 10,
                    vacancies: [...body.data],
                }));
            })
            .catch(err => console.error(err));

        console.log(this.state);
    };

    getResumesFromServer = () => {
        resumeService
            .getAllResumes()
            .then(body => {
                console.log(body);
                this.setState(state => ({
                    ...state,
                    limit: 10,
                    resumes: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    };

    onSubmitSearch = async (e: SubmitEvent) => {
        e.preventDefault();
        // TODO rename
        const queryParam = e.target.value;
        this.search = queryParam;
        console.log(queryParam);

        this.state.typeOfSearch === 'vacancy'
            ? searchService
                  .searchByVacancies(queryParam)
                  .then(body => {
                      this.setState(state => ({
                          limit: 10,
                          vacancies: [...body.data],
                      }));
                  })
                  .catch(err => console.error(err))
            : searchService
                  .searchByResumes(queryParam)
                  .then(body => {
                      this.setState(state => ({
                          limit: 10,
                          vacancies: [...body.data],
                      }));
                  })
                  .catch(err => console.error(err));
    };

    onSubmitFilters = async (e: SubmitEvent) => {
        e.preventDefault();
        console.log('filters submitted');
        const searchParam = this.search;

        const formData = new FormData(e.target);

        searchParam ? formData.append('search', searchParam) : '';
        formData.get('city') === '' ? formData.delete('city') : '';

        const data = [...formData.entries()];
        console.log(data);

        const groupByParam = data.reduce(
            (groupData, elem, index) => {
                if (index > 0) {
                    groupData.at(-1)[0] === elem[0]
                        ? groupData.at(-1).push(elem[1])
                        : groupData.push(elem);
                }

                return groupData;
            },
            [data[0]],
        );

        console.log(groupByParam);

        const queryString = groupByParam
            .map(x =>
                x[0] === 'salary'
                    ? `${encodeURIComponent(x[0])}=${encodeURIComponent(
                          x.slice(1).join(':'),
                      )}`
                    : `${encodeURIComponent(x[0])}=${encodeURIComponent(
                          x.slice(1).join(','),
                      )}`,
            )
            .join('&');
        console.log(queryString);

        searchService
            .filterVacancies(queryString)
            .then(body => {
                this.setState(state => ({
                    limit: 10,
                    vacancies: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    };

    componentDidMount() {
        console.log('MOUNT', this.state);
        this.getVacanciesFromServer();
    }

    componentDidUpdate() {
        console.log('UPDATE', this.state);
        this.state.typeOfSearch === 'vacancy'
            ? this.getVacanciesFromServer()
            : this.getResumesFromServer();
    }

    shouldUpdateState(nextState: {
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
        resumes?: {
            id: number;
            postedByUserID: string;
            title: string;
            description: string;
        }[];
        limit: number;
        typeOfSearch: 'vacancy' | 'resume' | 'applicant' | 'employer';
    }): boolean {
        return (
            this.state.typeOfSearch !== nextState.typeOfSearch ||
            JSON.stringify(this.state.resumes) !==
                JSON.stringify(nextState.resumes) ||
            JSON.stringify(this.state.vacancies) !==
                JSON.stringify(nextState.vacancies)
        );
    }

    increaseLimit = () => {
        this.setState(state => ({ ...state, limit: state.limit + 10 }));
    };

    render() {
        return (
            <div>
                <Header />
                <div
                    className={`screen-responsive ${styles.content} column g-24 relative screen-responsive ${styles.content}`}
                >
                    <div className={`col-12 column ${styles.content}`}>
                        <SearchInput
                            onSubmitSearch={this.onSubmitSearch}
                            onSwitch={this.switchSearchType}
                        />
                    </div>
                    <div className={`col-0 col-md-3`}>
                        <SearchFilter
                            filters={this.filters.vacancyFilter}
                            onSubmit={this.onSubmitFilters}
                        />
                    </div>
                    <div className={'col-12 col-md-0 justify-content-center'}>
                        <SearchFilterMobile
                            filters={this.filters.vacancyFilter}
                            onSubmit={this.onSubmitFilters}
                        />
                    </div>
                    <div
                        className={
                            'col-0 col-md-3 flex row justify-content-space-between g-16 screen-responsive'
                        }
                    >
                        <SearchFilter
                            filters={this.state.filters}
                            onSubmit={this.onSubmitFilters}
                        />
                        <div className={'flex column g-8 w-100'}>
                            {this.state.typeOfSearch === 'vacancy'
                                ? this.state.vacancies
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
                                      ))
                                : this.state.resumes
                                      ?.slice(0, this.state.limit)
                                      .map(resume => (
                                          <ResumeCard
                                              id={resume.id.toString()}
                                              postedByUserID={resume.user_account_id.toString()}
                                              title={resume.title}
                                              description={resume.description}
                                          />
                                      ))}
                            <div className={'w-100'}>
                                <RenderWithCondition
                                    condition={
                                        this.state.limit <
                                        this.state.resumes.length
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
                    <Footer />
                </div>
            </div>
        );
    }
}
