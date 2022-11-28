import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Header from '../../../components/UI-kit/header/Header';
import ButtonIcon from '../../../components/UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../../static/icons/phone.svg';
import MailIcon from '../../../static/icons/mail.svg';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Link from '../../../components/Link/Link';
import Button from '../../../components/UI-kit/buttons/Button';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import ResumeList from '../../../components/UI-kit/resumeList/ResumeList';
import ResumeSidebar from '../../../components/sidebars/ResumeSidebar';
import { ResumeListItemPropsType } from '../../../components/UI-kit/resumeList/ResumeListItem';
import { applicantProfileService } from '../../../services/applicantService';
import { applicantConnect, dispatch, userConnect } from '../../../store';
import { applicantActions } from '../../../store/applicant/actions';
import { ProfileState } from '../../../store/applicant/type';
import Footer from '../../../components/UI-kit/footer/Footer';
import { resumeActions } from '../../../store/resume/actions';
import { APPLICANT_PATHS, RESUME_PATHS } from '../../../utils/routerConstants';
import RenderWithCondition from '../../../components/RenderWithCondition';

type ApplicantPropsType = {
    id: string;
    userID: string;
    avatarSrc: string;
    name: string;
    surname: string;
    status: string;
    phone: string;
    email: string;
    sideBar: {
        location: string;
        dateOfBirth: string;
        skills: string[];
    };
    socialNetworks: {
        vk: string | null | undefined;
        facebook: string | null | undefined;
        telegram: string | null | undefined;
    };
    resume: ResumeListItemPropsType[];
};

class ApplicantProfile extends ReactsComponent<ApplicantPropsType> {
    state = {
        resume: [] as ResumeListItemPropsType[],
    };

    async getDataFromServer() {
        const applicantID = location.pathname.split('/').at(-1);

        const resumeList = await applicantProfileService.getResumeList(
            applicantID,
        );

        const applicantBody = await applicantProfileService.getApplicantData(
            applicantID as string,
        );

        dispatch(applicantActions.update(applicantBody));
        this.setState(state => ({ ...state, resume: resumeList }));
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive flex column g-40'}>
                <Header />
                <ProfileHeader
                    bannerSrc={'./'}
                    profileID={this.props.id}
                    avatarSrc={this.props.avatarSrc}
                    name={this.props.name}
                    surname={this.props.surname}
                    status={this.props.status}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon
                                onClick={() => {
                                    window.navigator.clipboard
                                        .writeText(this.props.phone)
                                        .then(() => alert('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={PhoneIcon}
                            />
                            <ButtonIcon
                                onClick={() => {
                                    window.navigator.clipboard
                                        .writeText(this.props.email)
                                        .then(() => alert('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={MailIcon}
                            />
                            <RenderWithCondition
                                condition={this.props.userID === this.props.id}
                                onSuccess={
                                    <Link
                                        to={RESUME_PATHS.NEW}
                                        onClick={() =>
                                            dispatch(
                                                resumeActions.clear(
                                                    this.props.id,
                                                ),
                                            )
                                        }
                                        content={
                                            <ButtonPrimary>
                                                Создать резюме
                                            </ButtonPrimary>
                                        }
                                    />
                                }
                            />
                            <RenderWithCondition
                                condition={this.props.userID === this.props.id}
                                onSuccess={
                                    <Link
                                        to={
                                            APPLICANT_PATHS.SETTINGS +
                                            this.props.id
                                        }
                                        content={<Button>Настройки</Button>}
                                    />
                                }
                            />
                        </div>
                    }
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-9 column g-16'}>
                        <ResumeList resume={this.state.resume} />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <ResumeSidebar creatorID={this.props.id} />
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
}))(ApplicantProfile);

export default applicantConnect((state: ProfileState, props) => {
    console.log(state);
    return {
        id: props.id ? props.id : state.id,
        name: state.applicant_name,
        surname: state.applicant_surname,
        status: state.status,
        phone: state.contact_number,
        email: state.email,
        sideBar: {
            location: state.location,
            dateOfBirth: state.date_of_birth,
            skills: state.skills,
        },
        socialNetworks: {
            vk: state.vk,
            facebook: state.facebook,
            telegram: state.telegram,
        },
        avatarSrc: state.avatar_src,
    };
})(UserWrapper);
