import { Component } from '../../../Reacts';
import Hat from '../../components/UI-kit/hat/Hat';
import Button from '../../components/UI-kit/buttons/Button';
import Link from '../../components/Link/Link';

export default class VacancyResponsesHat extends Component<{
    imgSrc: string;
    companyName: string;
    description: string;
}> {
    render() {
        return (
            <Hat
                imgSrc={this.props.imgSrc}
                name={this.props.companyName}
                surname={''}
                description={this.props.description}
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
