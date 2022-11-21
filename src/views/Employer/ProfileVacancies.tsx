import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import { vacancyService } from '../../services/vacancyService';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';
import Button from '../../components/UI-kit/buttons/Button';
import RenderWithCondition from '../../components/RenderWithCondition';

export default class ProfileVacancies extends ReactsComponent<
    { profileID: string },
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
        limit: number;
        requested: boolean;
    }
> {
    state = {
        vacancies: [],
        limit: 10,
    };

    requested = false;

    getVacancies() {
        if (
            this.state.vacancies.length === 0 &&
            this.props.profileID &&
            !this.requested
        ) {
            this.requested = true;
            vacancyService
                .getAllVacanciesForEmployer(this.props.profileID)
                .then(body => {
                    this.setState(state => {
                        if (state.vacancies.length > 0) {
                            return state;
                        }

                        return {
                            limit: 10,
                            vacancies: body.data,
                        };
                    });
                })
                .catch(err => err !== 404 && console.log(err));
        }
    }

    componentDidMount() {
        this.getVacancies();
    }

    render() {
        return (
            <div className={'flex column g-16'}>
                {this.state.vacancies
                    ?.slice(0, this.state.limit)
                    .map(vacancy => (
                        <VacancyCard
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
                <RenderWithCondition
                    condition={this.state.limit < this.state.vacancies.length}
                    onSuccess={
                        <Button
                            key={'more button'}
                            onClick={() => {
                                this.setState(state => ({
                                    ...state,
                                    limit: state.limit + 10,
                                }));
                            }}
                        >
                            Показать еще
                        </Button>
                    }
                />
            </div>
        );
    }
}
