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
import { userStore } from '../../store/user/store';
import { EmployerProfile } from '../../store/profile/types';
import { dispatch, profileConnect } from '../../store';
import { profileActions } from '../../store/profile/actions';
import Preloader from '../../components/UI-kit/prelodaer/Preloader';

class Profile extends Component<
    EmployerProfile,
    { vacancies: VacancyCardPropsType[] }
> {
    state = {
        vacancies: [
            {
                id: 1,
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
    };

    getDataFromServer() {
        const employerID = location.pathname.split('/').at(-1);
        employerProfileService.getProfileData(employerID).then(body => {
            dispatch(profileActions.update({ ...body, id: employerID }));
        });
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive flex column g-40'}>
                <Preloader />
                <Header key={'header'} />
                <ProfileHeader
                    key={'profile_header'}
                    bannerSrc={this.props.bannerSrc}
                    avatarSrc={this.props.avatarSrc}
                    name={this.props.name}
                    status={this.props.status}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(this.props.phone)
                                        .then(() => console.log('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={PhoneIcon}
                            />
                            <ButtonIcon
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(this.props.email)
                                        .then(() => console.log('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={MailIcon}
                            />
                            {userStore.getState().authorized &&
                            userStore.getState().userType === 'applicant' ? (
                                <ButtonPrimary>
                                    Хочу здесь работать
                                </ButtonPrimary>
                            ) : (
                                <p className={'none'}></p>
                            )}
                            {userStore.getState().id === this.props.id &&
                            userStore.getState().userType === 'employer' ? (
                                <Link
                                    to={'/employer/settings'}
                                    content={<Button>Настройки</Button>}
                                />
                            ) : (
                                <p className={'none'}></p>
                            )}
                        </div>
                    }
                />
                <div key={'text'} className={'columns g-24'}>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'Описание'}
                            content={this.props.description}
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
                                            to={`/vacancy/${vacancy.id}`}
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
                        <EmployerProfileSideBar
                            city={this.props.location}
                            companySize={this.props.size}
                            fieldOfActivity={this.props.fieldOfActivity}
                            socialNetworks={this.props.socialNetworks}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default profileConnect(state => state.getState())(Profile);
