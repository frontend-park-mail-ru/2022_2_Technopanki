import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './search.module.scss';
import Header from '../../components/UI-kit/header/Header';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/searchCards/VacancyCard';
import EmployerCard from '../../components/UI-kit/searchCards/EmployerCard';
import ApplicantCard from '../../components/UI-kit/searchCards/ApplicantCard';
import ResumeCard from '../../components/UI-kit/searchCards/ResumeCard';
import { vacancyService } from '../../services/vacancy/vacancyService';
import Button from '../../components/UI-kit/buttons/Button';
import SearchDropdownButton from '../../components/UI-kit/buttons/SearchDropdownButton'
import RenderWithCondition from '../../components/RenderWithCondition';
import SearchFilter from '../../components/UI-kit/filters/SearchFilter';
import { resumeService } from '../../services/resume/resumeService';
import { employerProfileService } from '../../services/employerProfileService';
import { applicantProfileService } from '../../services/applicantService';
import { searchService } from '../../services/searchService';
import SearchFilterMobile from '../../components/UI-kit/filters/SearchFilterMobile';
import { IMAGE_URL } from '../../utils/networkConstants';
import FilterInput from '../../components/UI-kit/forms/inputs/FilterInput';

export default class Search extends ReactsComponent<
    {},
    {
        limit: number;
        typeOfSearch: 'vacancy' | 'resume' | 'applicant' | 'employer';
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
                    'Сменный график',
                ],
                name: 'format',
                value: null,
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
                value: null,
            },
            {
                header: 'Зарплата',
                type: 'range',
                rangeMin: '0',
                rangeMax: '300000',
                name: 'salary',
                value: null,
            },
            {
                header: 'Город',
                type: 'input',
                name: 'city',
                value: null,
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
                value: null,
            },
            {
                header: 'Город',
                type: 'input',
                name: 'city',
                value: null,
            },
        ],

        employerFilter: [
            {
                header: 'Город',
                type: 'input',
                name: 'city',
                value: null,
            },
            {
                header: 'Сфера деятельности',
                type: 'input',
                name: 'field',
                value: null,
            },
            {
                header: 'Размер компании',
                type: 'range',
                rangeMin: '0',
                rangeMax: '300000',
                name: 'size',
                value: null,
            },
        ],

        applicantFilter: [
            {
                header: 'Возраст',
                type: 'range',
                rangeMin: '0',
                rangeMax: '100',
                name: 'age',
                value: null,
            },
            {
                header: 'Город',
                type: 'input',
                name: 'city',
                value: null,
            },
        ],
    };

    state = {
        vacancies: [],
        resumes: [],
        employers: [],
        applicants: [],
        limit: 10,
        typeOfSearch: 'vacancy',
        filters: this.filters.vacancyFilter,
        filtersState: '',
    };

    search = '';

    switchSearchType = () => {
        const type = location.pathname.split('/').at(-1);
        if (type === 'vacancy') {
            this.setState(state => ({
                ...state,
                typeOfSearch: 'vacancy',
                filters: this.filters.vacancyFilter,
            }));
        }

        if (type === 'resume') {
            this.setState(state => ({
                ...state,
                typeOfSearch: 'resume',
                filters: this.filters.resumeFilter,
            }));
        }

        if (type === 'employer') {
            this.setState(state => ({
                ...state,
                typeOfSearch: 'employer',
                filters: this.filters.employerFilter,
            }));
        }

        if (type === 'applicant') {
            this.setState(state => ({
                ...state,
                typeOfSearch: 'applicant',
                filters: this.filters.applicantFilter,
            }));
        }
    };

    getVacanciesFromServer = () => {
        vacancyService
            .getAllVacancies()
            .then(body => {
                this.setState(state => ({
                    ...state,
                    limit: 10,
                    vacancies: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    };

    getResumesFromServer = () => {
        resumeService
            .getAllResumes()
            .then(body => {
                this.setState(state => ({
                    ...state,
                    limit: 10,
                    resumes: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    };

    getEmployersFromServer = () => {
        employerProfileService
            .getAllEmployers()
            .then(body => {
                this.setState(state => ({
                    ...state,
                    limit: 10,
                    employers: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    };

    getApplicantsFromServer = () => {
        applicantProfileService
            .getAllApplicants()
            .then(body => {
                this.setState(state => ({
                    ...state,
                    limit: 10,
                    applicants: [...body.data],
                }));
            })
            .catch(err => console.error(err));
    };

    onSubmitSearch = async (e: SubmitEvent) => {
        e.preventDefault();

        // TODO rename
        const queryParam = document.getElementById('search').value;
        this.search = queryParam;

        if (
            this.state.typeOfSearch === 'vacancy') {
            searchService
                .searchByVacancies(queryParam)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        vacancies: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }

        if (
            this.state.typeOfSearch === 'resume') {
            searchService
                .searchByResumes(queryParam)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        resumes: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }

        if (
            this.state.typeOfSearch === 'employer') {
            searchService
                .searchByEmployers(queryParam)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        employers: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }

        if (this.state.typeOfSearch === 'applicant') {
            searchService
                .searchByApplicants(queryParam)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        applicants: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }
    };

    onSubmitFilters = async (e: SubmitEvent) => {
        e.preventDefault();
        const searchParam = this.search;
        const formData = new FormData(e.target);

        searchParam ? formData.append('search', searchParam) : '';
        formData.get('city') === '' ? formData.delete('city') : '';

        const data = [...formData.entries()];

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

        const queryString = groupByParam
            .map(x =>
                x[0] === 'salary' || x[0] === 'size' || x[0] === 'age'
                    ? `${encodeURIComponent(x[0])}=${encodeURIComponent(
                          x.slice(1).join(':'),
                      )}`
                    : `${encodeURIComponent(x[0])}=${encodeURIComponent(
                          x.slice(1).join(','),
                      )}`,
            )
            .join('&');

        if (this.state.typeOfSearch === 'vacancy') {
            searchService
                .filterVacancies(queryString)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        vacancies: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }

        if (this.state.typeOfSearch === 'resume') {
            searchService
                .filterResumes(queryString)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        resumes: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }

        if (this.state.typeOfSearch === 'employer') {
            searchService
                .filterEmployers(queryString)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        employers: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }

        if (this.state.typeOfSearch === 'applicant') {
            searchService
                .filterApplicants(queryString)
                .then(body => {
                    this.setState(state => ({
                        ...state,
                        limit: 10,
                        applicants: [...body.data],
                    }));
                })
                .catch(err => console.error(err));
        }
    };


    componentDidMount() {
        this.getVacanciesFromServer();
        this.getResumesFromServer();
        this.getEmployersFromServer();
        this.getApplicantsFromServer();

        this.switchSearchType();
    }

    increaseLimit = () => {
        this.setState(state => ({ ...state, limit: state.limit + 10 }));
    };

    render() {
        return (
            <div>
                <Header />
                <div
                    className={`flex column g-24 relative screen-responsive ${styles.content}`}
                >
                    <h3 className={'text-align-center'}>Поиск</h3>
                    <SearchInput
                        onSubmitSearch={this.onSubmitSearch}
                        onSwitch={this.switchSearchType.bind(this)}
                    />
                    <div
                        className={'columns justify-content-space-between g-16'}
                    >
                        <div className={'flex row '}>
                            <SearchFilter
                                filters={this.state.filters}
                                onSubmit={this.onSubmitFilters.bind(this)}
                            />
                        </div>
                        <div
                            className={'col-12 col-md-0 justify-content-center'}
                        >
                            <SearchFilterMobile
                                filters={this.state.filters}
                                onSubmit={this.onSubmitFilters.bind(this)}
                            />
                        </div>
                        <div
                            className={'col-12 col-md-10 flex column g-16 w-100'}
                        >
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
                                : this.state.typeOfSearch === 'resume'
                                ? this.state.resumes
                                      ?.slice(0, this.state.limit)
                                      .map(resume => (
                                          <ResumeCard
                                              id={resume.id.toString()}
                                              postedByUserID={resume.user_account_id.toString()}
                                              title={resume.title}
                                              description={resume.description}
                                          />
                                      ))
                                : this.state.typeOfSearch === 'employer'
                                ? this.state.employers
                                      ?.slice(0, this.state.limit)
                                      .map(employer => (
                                          <EmployerCard
                                              id={employer.id.toString()}
                                              imgSrc={
                                                  IMAGE_URL + employer.image
                                              }
                                              companyName={
                                                  employer.company_name
                                              }
                                              description={employer.description}
                                          />
                                      ))
                                : this.state.applicants
                                      ?.slice(0, this.state.limit)
                                      .map(applicant => (
                                          <ApplicantCard
                                              id={applicant.id.toString()}
                                              imgSrc={
                                                  IMAGE_URL + applicant.image
                                              }
                                              name={applicant.applicant_name}
                                              surname={
                                                  applicant.applicant_surname
                                              }
                                              description={applicant.status}
                                          />
                                      ))}
                            <div className={'w-100'}>
                                <RenderWithCondition
                                    condition={
                                        this.state.typeOfSearch === 'vacancy'
                                            ? this.state.limit <
                                              this.state.vacancies.length
                                            : this.state.typeOfSearch ===
                                              'resume'
                                            ? this.state.limit <
                                              this.state.resumes.length
                                            : this.state.typeOfSearch ===
                                              'employer'
                                            ? this.state.limit <
                                              this.state.employers.length
                                            : this.state.limit <
                                              this.state.applicants.length
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
