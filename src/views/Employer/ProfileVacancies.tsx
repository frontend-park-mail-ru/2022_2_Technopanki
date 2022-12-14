import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import VacancyCard from '../../components/UI-kit/searchCards/VacancyCard';
import Button from '../../components/UI-kit/buttons/Button';
import RenderWithCondition from '../../components/RenderWithCondition';
import { VacancyState } from '../../store/vacancy/type';

export default class ProfileVacancies extends ReactsComponent<
    { vacancies: VacancyState[] },
    { limit: number }
> {
    state = {
        limit: 10,
    };

    render() {
        console.log(this.props.vacancies);
        return (
            <div className={'flex column g-16'}>
                {this.props.vacancies
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
                <RenderWithCondition
                    condition={this.state.limit < this.props.vacancies.length}
                    onSuccess={
                        <Button
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
