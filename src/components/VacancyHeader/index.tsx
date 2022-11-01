import { Component } from '../../../Reacts';
import Button from '../UI-kit/buttons/Button';
import styles from './vacancyHeader.module.scss';
import ButtonPrimary from '../UI-kit/buttons/ButtonPrimary';
import Dropdown from '../UI-kit/dropdown/Dropdown';
import VacancyDropdownResume from '../../views/Employer/Vacancy/VacancyDropdownResume';

export default class VacancyHeader extends Component<{
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
            <div
                className={`flex w-100 row align-items-center justify-content-space-between ${styles.company}`}
            >
                <div className={`flex align-items-center row g-16`}>
                    <img
                        className={styles.companyImg}
                        src={this.props.imgSrc}
                        alt={'logo'}
                    />
                    <div className={'flex column'}>
                        <p className={styles.companyName}>
                            {this.props.companyName}
                        </p>
                        <p>{this.props.description}</p>
                    </div>
                </div>
                <div className={'flex row flex-grow g-12'}>
                    {/*TODO: добавить уловие по типу пользователя рендер кнопок*/}
                    <Button>Посмотреть отклики на вакансию</Button>
                    <Button>Настройки</Button>
                    <Dropdown
                        hidden={
                            <VacancyDropdownResume resume={this.state.resume} />
                        }
                        content={
                            <ButtonPrimary>Отправить резюме</ButtonPrimary>
                        }
                        direction={'right'}
                    />
                </div>
            </div>
        );
    }
}
