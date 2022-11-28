import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './vacancies.module.scss';
import Header from '../../components/UI-kit/header/Header';
import SearchInput from '../../components/UI-kit/forms/inputs/SearchInput';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyCard from '../../components/UI-kit/vacancy/VacancyCard';
import { vacancyService } from '../../services/vacancyService';
import Button from '../../components/UI-kit/buttons/Button';
import RenderWithCondition from '../../components/RenderWithCondition';

type VacancyPreview = {
    id: number;
    title: string;
    image: string;
    salary: string;
    currency: string;
    location: string;
    format: string;
    hours: string;
    description: string;
};

export default class Vacancies extends ReactsComponent<
    {},
    {
        vacancies: VacancyPreview[];
        limit: number;
    }
> {
    state = {
        vacancies: [] as VacancyPreview[],
        limit: 10,
    };

    componentDidMount() {
        vacancyService
            .getAllVacancies()
            .then(body => {
                this.setState(() => ({
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
                <div className={'screen-responsive'}>
                    <Footer />
                </div>
            </div>
        );
    }
}
