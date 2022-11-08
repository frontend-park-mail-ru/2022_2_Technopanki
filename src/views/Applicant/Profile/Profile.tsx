import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import ButtonIcon from '../../../components/UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../../static/icons/phone.svg';
import MailIcon from '../../../static/icons/mail.svg';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Link from '../../../components/Link/Link';
import Button from '../../../components/UI-kit/buttons/Button';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import Chips from '../../../components/UI-kit/chips/Chips';
import ResumeList from '../../../components/UI-kit/resumeList/ResumeList';
import ResumeSidebar from '../../../components/sidebars/ResumeSidebar';
import { VNodeType } from '../../../../Reacts/shared/common';
import { ResumeListItemPropsType } from '../../../components/UI-kit/resumeList/ResumeListItem';
import { applicantProfileService } from '../../../services/applicantService';
import { applicantConnect, dispatch } from '../../../store';
import { applicantActions } from '../../../store/applicant/actions';
import { ProfileState } from '../../../store/applicant/type';
import ApplicantResumeList from './ApplicantResumeList';
import Footer from '../../../components/UI-kit/footer/Footer';

type ApplicantPropsType = {
    id: string;
    imgSrc: string;
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
};

class ApplicantProfile extends Component<ApplicantPropsType> {
    getDataFromServer() {
        const applicantID = location.pathname.split('/').at(-1);

        applicantProfileService
            .getApplicantData(applicantID as string)
            .then(body => {
                console.log(body)
                dispatch(applicantActions.update(body));
            });
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
                    avatarSrc={'./'}
                    name={this.props.name}
                    surname={this.props.surname}
                    status={this.props.status}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(this.props.phone)
                                        .then(() => alert('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={PhoneIcon}
                            />
                            <ButtonIcon
                                onClick={() => {
                                    navigator.clipboard
                                        .writeText(this.props.email)
                                        .then(() => alert('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={MailIcon}
                            />
                            <Link
                                to={'/resume/new'}
                                content={
                                    <ButtonPrimary>Создать резюме</ButtonPrimary>
                                }
                            />
                            {/*TODO: добавить путь в константы*/}
                            <Link
                                to={`/applicant/settings/${this.props.id}`}
                                content={<Button>Настройки</Button>}
                            />
                        </div>
                    }
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-9 column g-16'}>
                        {/*<ApplicantResumeList />*/}
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <ResumeSidebar
                            location={this.props.sideBar.location}
                            dateOfBirth={this.props.sideBar.dateOfBirth}
                            skills={this.props.sideBar.skills}
                            socialNetworks={this.props.socialNetworks}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default applicantConnect((state: ProfileState, props) => {
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
    };
})(ApplicantProfile);
