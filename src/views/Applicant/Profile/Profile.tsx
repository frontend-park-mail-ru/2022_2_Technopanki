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

export default class ApplicantProfile extends Component {
    state = {
        MyResumes: [
            {
                id: '1',
                imgSrc: './',
                name: 'Кутищев',
                surname: 'Данил',
                resumeTitle: 'Инженер-электроник',
                timeWhenCreated: '2022-09-22T14:35Z',
                chips: <Chips>JS</Chips>,
                resumeSrc: './',
            },
        ]
    }

    render() {
        return(
            <div className={'screen-responsive flex column g-40'}>
                <Header />
                <ProfileHeader
                    bannerSrc={'./'}
                    avatarSrc={'./'}
                    name={'Данил Кутищев'}
                    description={'Студент МГТУ, специалист по схемотехнике'}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon icon={PhoneIcon} />
                            <ButtonIcon icon={MailIcon} />
                            <ButtonPrimary>Создать резюме</ButtonPrimary>
                            <Link
                                to={'/applicant/resume/settings'}
                                content={<Button>Настройки</Button>}
                            />
                        </div>
                    }
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-9 column g-16'}>
                        <ResumeList resume={this.state.MyResumes} />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <ResumeSidebar />
                    </div>
                </div>
            </div>
        )
    }
}