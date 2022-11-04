import { Component } from '../../../Reacts';
import Hat from '../../components/UI-kit/hat/Hat';
import Button from '../../components/UI-kit/buttons/Button';
import Link from '../../components/Link/Link';
import { userConnect } from '../../store';
import { UserState } from '../../store/user/types';

class VacancyResponsesHat extends Component<{
    name: string;
    status: string;
    // ---
    imgSrc: string;
}> {
    render() {
        return (
            <Hat
                imgSrc={this.props.imgSrc}
                name={this.props.name}
                surname={''}
                status={this.props.status}
                rightSideContent={
                    <div className={'flex row g-16'}>
                        <Link
                            to={'/vacancy'}
                            content={<Button>Вернуться к вакансии</Button>}
                        />
                        <Link
                            to={'/vacancy/settings'}
                            content={<Button>Настройки</Button>}
                        />
                    </div>
                }
            />
        );
    }
}

export default userConnect((store, props) => {
    const state: UserState = store.getState();

    return {
        name: state.name,
        status: props.status,
        imgSrc: props.imgSrc,
    };
})(VacancyResponsesHat);
