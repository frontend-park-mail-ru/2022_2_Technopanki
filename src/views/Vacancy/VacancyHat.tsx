import { Component } from '../../../Reacts';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import Dropdown from '../../components/UI-kit/dropdown/Dropdown';
import VacancyDropdownResume from './VacancyDropdownResume';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';

export default class VacancyHat extends Component<{
    imgSrc: string;
    companyName: string;
    description: string;
}> {
    state = {
        resume: [
            {
                name: 'Vladislav',
                surname: 'Kirpichov',
                resumeHeader: 'Frontend developer',
                src: './',
            },
            {
                name: 'Vladislav',
                surname: 'Kirpichov',
                resumeHeader: 'Backend developer',
                src: './',
            },
        ],
    };

    render() {
        return (
            <Hat
                imgSrc={this.props.imgSrc}
                name={this.props.companyName}
                surname={''}
                description={this.props.description}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        {/*TODO: добавить уловие по типу пользователя рендер кнопок*/}
                        <Link
                            to={'/vacancy/responses'}
                            content={
                                <Button>Посмотреть отклики на вакансию</Button>
                            }
                        />
                        <Link
                            to={'/vacancy/settings'}
                            content={<Button>Настройки</Button>}
                        />
                        <Dropdown
                            hidden={
                                <VacancyDropdownResume
                                    resume={this.state.resume}
                                />
                            }
                            content={
                                <ButtonPrimary>Отправить резюме</ButtonPrimary>
                            }
                            direction={'right'}
                        />
                    </div>
                }
            />
        );
    }
}