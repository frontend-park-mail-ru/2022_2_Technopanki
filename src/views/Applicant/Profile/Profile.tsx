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
import { applicantService } from '../../../services/applicantService';
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
}

class ApplicantProfile extends Component<ApplicantPropsType> {
    getDataFromServer() {
        const applicantID = location.pathname.split('/').at(-1)

        applicantService.getApplicantData(applicantID as string)
            .then(body => {
                dispatch(applicantActions.update(body))
            });
    }

    componentDidMount() {
        this.getDataFromServer()
    }

    render() {
        return(
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
                                onClick={()=>{
                                    navigator.clipboard
                                        .writeText(this.props.phone)
                                        .then(() => alert('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={PhoneIcon}
                            />
                            <ButtonIcon
                                onClick={()=>{
                                    navigator.clipboard
                                        .writeText(this.props.email)
                                        .then(() => alert('copied!'))
                                        .catch(err => console.error(err));
                                }}
                                icon={MailIcon}
                            />
                            <Link
                                to={'/resume/settings'}
                                content={
                                    <ButtonPrimary>Создать резюме</ButtonPrimary>
                                }
                            />
                            {/*TODO: добавить путь в константы*/}
                            <Link
                                to={'/applicant/settings'}
                                content={<Button>Настройки</Button>}
                            />
                        </div>
                    }
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-9 column g-16'}>
                        <ApplicantResumeList />
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
        )
    }
}

export default applicantConnect((store, props) => {
    const storeState = store.getState() as ProfileState;

    return {
        id: props.id || storeState.id,
        name: storeState.name,
        surname: storeState.surname,
        status: storeState.status,
        phone: storeState.phone,
        email: storeState.email,
        resumeList: storeState.resumeList,
        sideBar: {
            location: storeState.location,
            dateOfBirth: storeState.dateOfBirth,
            skills: storeState.skills,
        },
        socialNetworks: {
            vk: storeState.vk,
            facebook: storeState.facebook,
            telegram: storeState.telegram,
        },
    }
})(ApplicantProfile);