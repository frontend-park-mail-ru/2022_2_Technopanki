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
import { dispatch, profileConnect, userConnect } from '../../store';
import { profileActions } from '../../store/profile/actions';
import { vacancyActions } from '../../store/vacancy/actions';
import ProfileVacancies from './ProfileVacancies';
import RenderWithCondition from '../../components/RenderWithCondition';

class Profile extends Component<
    EmployerProfile & { userID: string },
    { vacancies: VacancyCardPropsType[] }
> {
    state = {
        vacancies: [],
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

    componentDidUpdate() {
        console.log('update: ', this.props);
    }

    render() {
        return (
            <div className={'screen-responsive flex column g-40'}>
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
                                    to={`/employer/settings/${this.props.id}`}
                                    content={<Button>Настройки</Button>}
                                />
                            ) : (
                                <p className={'none'}></p>
                            )}
                        </div>
                    }
                />
                <div key={'text'} className={'columns g-24'}>
                    <div
                        key={'desc'}
                        className={'col-12 col-md-9 flex column g-40'}
                    >
                        <TextBlock
                            key={'desc'}
                            headline={'Описание'}
                            content={this.props.description}
                        />
                        <div key={'vacancies'} className={'flex column g-16'}>
                            <h6 key={'header'}>Вакансии</h6>
                            <div key={'info'} className={'flex column g-16'}>
                                <RenderWithCondition
                                    condition={
                                        this.props.userID === this.props.id
                                    }
                                    onSuccess={
                                        <button
                                            key={'link'}
                                            className={styles.vacancies_button}
                                        >
                                            <Link
                                                to={'/vacancy/new'}
                                                onClick={() =>
                                                    dispatch(
                                                        vacancyActions.clear(),
                                                    )
                                                }
                                                content={
                                                    <ArrowButtonWithText>
                                                        Добавить вакансию
                                                    </ArrowButtonWithText>
                                                }
                                            />
                                        </button>
                                    }
                                />
                                <div
                                    key={'vacancies'}
                                    className={'flex column g-16'}
                                >
                                    <ProfileVacancies
                                        profileID={this.props.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div key={'sidebar'} className={'col-12 col-md-3'}>
                        <EmployerProfileSideBar
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

const UserWrapper = userConnect((state, props) => ({
    ...props,
    userID: state.id,
}))(Profile);

export default profileConnect(state => state)(UserWrapper);
