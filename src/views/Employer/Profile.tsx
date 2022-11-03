import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import styles from './userPage.module.scss';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonIcon from '../../components/UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../static/icons/phone.svg';
import MailIcon from '../../static/icons/mail.svg';
import VKLogo from '../../static/icons/logos/VK.svg';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import TextBlock from '../../components/UI-kit/text/TextBlock';
import ArrowButtonWithText from '../../components/UI-kit/buttons/ArrowButtonWithText';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import EmployerProfileSideBar from '../../components/sidebars/EmployerProfileSideBar';
import Link from '../../components/Link/Link';
import Vacancy, {
    VacancyCardPropsType,
} from '../../components/UI-kit/vacancy/VacancyCard';
import Footer from '../../components/UI-kit/footer/Footer';
import { employerProfileService } from '../../services/employerProfileService';

export default class Profile extends Component<
    {},
    { vacancies: VacancyCardPropsType[] }
> {
    state = {
        vacancies: [
            {
                name: 'Middle Frontend developer ',
                icon: VKLogo,
                salary: '260.000',
                currency: 'руб',
                location: 'Москва',
                format: 'Смешанный формат',
                hours: '40 часов в неделю',
                description:
                    'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты...',
            },
            {
                name: 'Middle Frontend developer ',
                icon: VKLogo,
                salary: '260.000',
                currency: 'руб',
                location: 'Москва',
                format: 'Смешанный формат',
                hours: '40 часов в неделю',
                description:
                    'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты...',
            },
            {
                name: 'Middle Frontend developer ',
                icon: VKLogo,
                salary: '260.000',
                currency: 'руб',
                location: 'Москва',
                format: 'Смешанный формат',
                hours: '40 часов в неделю',
                description:
                    'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты...',
            },
            {
                name: 'Middle Frontend developer ',
                icon: VKLogo,
                salary: '260.000',
                currency: 'руб',
                location: 'Москва',
                format: 'Смешанный формат',
                hours: '40 часов в неделю',
                description:
                    'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты...',
            },
            {
                name: 'Middle Frontend developer ',
                icon: VKLogo,
                salary: '260.000',
                currency: 'руб',
                location: 'Москва',
                format: 'Смешанный формат',
                hours: '40 часов в неделю',
                description:
                    'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты...',
            },
        ],
        profile: {
            bannerSrc: '',
            avatarSrc: '',
            name: '',
            description: '',
        },
    };

    getDataFromServer() {
        employerProfileService().then(body => {
            this.setState(state => ({
                ...state,
                profile: {
                    bannerSrc: state.bannerSrc,
                    avatarSrc: state.avatarSrc,
                    name: body.company_name,
                    description: body.description,
                },
            }));
        });
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive flex column g-40'}>
                <Header key={'header'} />
                <ProfileHeader
                    key={'profile_header'}
                    bannerSrc={this.state.profile.bannerSrc}
                    avatarSrc={this.state.profile.avatarSrc}
                    name={this.state.profile.name}
                    description={this.state.profile.description}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon icon={PhoneIcon} />
                            <ButtonIcon icon={MailIcon} />
                            <ButtonPrimary>Хочу здесь работать</ButtonPrimary>
                            <Link
                                to={'/employer/settings'}
                                content={<Button>Настройки</Button>}
                            />
                        </div>
                    }
                />
                <div key={'text'} className={'columns g-24'}>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'Описание'}
                            content={
                                'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты.\n' +
                                '\n' +
                                'Наша команда — это профессионалы из разных сфер, которые умеют реализовывать необычные и сложные идеи и задачи. Обмениваясь опытом, мы создаём новые идеи и достигаем большего.\n' +
                                '\n' +
                                'Если ты любишь решать сложные задачи, экспериментировать и создавать продукты для миллионов пользователей — присоединяйся, чтобы вместе развивать интернет и определять его будущее.'
                            }
                        />
                        <div className={'flex column g-16'}>
                            <h6>Вакансии</h6>
                            <div className={'flex column g-16'}>
                                <button className={styles.vacancies_button}>
                                    <ArrowButtonWithText>
                                        Добавить вакансию
                                    </ArrowButtonWithText>
                                </button>
                                <div className={'flex column g-16'}>
                                    {this.state.vacancies.map(vacancy => (
                                        // TODO: убрать Link
                                        <Link
                                            to={'/vacancy'}
                                            content={
                                                <Vacancy
                                                    name={vacancy.name}
                                                    icon={vacancy.icon}
                                                    salary={vacancy.salary}
                                                    currency={vacancy.currency}
                                                    location={vacancy.location}
                                                    format={vacancy.format}
                                                    hours={vacancy.hours}
                                                    description={
                                                        vacancy.description
                                                    }
                                                />
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div key={'sidebar'} className={'col-12 col-md-3'}>
                        <EmployerProfileSideBar />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
