import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Button from '../UI-kit/buttons/Button';
import styles from './vacancyHat.module.scss';
import ButtonPrimary from '../UI-kit/buttons/ButtonPrimary';
import Dropdown from '../UI-kit/dropdown/Dropdown';
import VacancyDropdownResume from '../../views/Vacancy/VacancyDropdownResume';
import Hat from '../UI-kit/hat/Hat';
import Link from '../Link/Link';

export default class VacancyHat extends ReactsComponent<{
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
                imgSrc={'../image/employer.png'}
                name={this.props.companyName}
                surname={''}
                status={this.props.description}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        {/*TODO: добавить уловие по типу пользователя рендер кнопок*/}
                        <Button>Посмотреть отклики на вакансию</Button>
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
