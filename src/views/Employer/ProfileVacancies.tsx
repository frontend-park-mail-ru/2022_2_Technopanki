import { Component } from '../../../Reacts';
import { vacancyService } from '../../services/vacancyService';
import Link from '../../components/Link/Link';
import Vacancy from '../../components/UI-kit/vacancy/VacancyCard';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';

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
    }
> {
    state = {
        vacancies: [],
    };

    componentDidMount() {
        vacancyService
            .getAllVacancies()
            .then(body => {
                this.setState(state => ({
                    ...state,
                    vacancies: body,
                }));
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className={'flex column g-16'}>
                {this.state.vacancies?.map(vacancy => (
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
        );
    }
}
