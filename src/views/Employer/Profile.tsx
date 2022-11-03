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

export type EmployerSocialNetworks = {
    vk?: string;
    facebook?: string;
    telegram?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
};

export type EmployerProfile = {
    id: string;
    bannerSrc: string;
    avatarSrc: string;
    name: string;
    status: string;
    description: string;
    phone: string;
    email: string;
    location: string;
    size: string;
    fieldOfActivity: string[];
    socialNetworks: EmployerSocialNetworks;
};

export const defaultProfileState = {
    id: '',
    bannerSrc: '',
    avatarSrc: '',
    name: '',
    status: '',
    description: '',
    phone: '',
    email: '',
    location: '',
    companySize: '',
    fieldOfActivity: [],
    socialNetworks: {
        vk: undefined,
        facebook: undefined,
        telegram: undefined,
        youtube: undefined,
        twitter: undefined,
        instagram: undefined,
    },
};

export default class Profile extends Component<
    {},
    { vacancies: VacancyCardPropsType[]; profile: EmployerProfile }
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
        profile: defaultProfileState,
    };

    getDataFromServer() {
        const employerID = location.pathname.split('/').at(-1);
        employerProfileService.getProfileData(employerID).then(body => {
            this.setState(state => ({
                ...state,
                profile: {
                    ...state.profile,
                    id: body.id,
                    name: body.company_name,
                    status: body.status,
                    description: body.description,
                    phone: body.phone,
                    email: body.email,
                    companyCity: body.company_city,
                    companySize: body.company_size.toString(),
                    fieldOfActivity: body.field_of_activity,
                    socialNetworks: {
                        vk: body.socialNetworks.vk,
                        facebook: body.socialNetworks.facebook,
                        telegram: body.socialNetworks.telegram,
                    },
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
                    status={this.state.profile.status}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(this.state.profile.phone)
                                        .then(() => console.log('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={PhoneIcon}
                            />
                            <ButtonIcon
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(this.state.profile.email)
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
                            {userStore.getState().id ===
                                this.state.profile.id &&
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
                            content={this.state.profile.description}
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
                            city={this.state.profile.companyCity}
                            companySize={this.state.profile.companySize}
                            fieldOfActivity={this.state.profile.fieldOfActivity}
                            socialNetworks={this.state.profile.socialNetworks}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
