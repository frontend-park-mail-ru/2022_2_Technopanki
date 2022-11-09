import { Component } from '../../../Reacts';
import { vacancyService } from '../../services/vacancyService';
import Link from '../../components/Link/Link';
import Vacancy from '../../components/UI-kit/vacancy/VacancyCard';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';
import Button from '../../components/UI-kit/buttons/Button';

export default class ProfileVacancies extends Component<
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
    }
> {
    state = {
        vacancies: [],
        limit: 10,
    };

    componentDidMount() {
        vacancyService
            .getAllVacanciesForEmployer(this.props.profileID)
            .then(body => {
                this.setState(_ => ({
                    limit: 10,
                    vacancies: body,
                }));
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className={'flex column g-16'}>
                {this.state.vacancies
                    ?.slice(0, this.state.limit)
                    .map(vacancy => (
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
            </div>
        );
    }
}
