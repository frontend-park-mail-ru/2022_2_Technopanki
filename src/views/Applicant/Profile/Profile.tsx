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
import { applicantProfileService } from '../../../services/applicantService';
import { applicantConnect, dispatch, userConnect } from '../../../store';
import { applicantActions } from '../../../store/applicant/actions';
import { ProfileState } from '../../../store/applicant/type';
import Footer from '../../../components/UI-kit/footer/Footer';
import { resumeActions } from '../../../store/resume/actions';
import { APPLICANT_PATHS, RESUME_PATHS } from '../../../utils/routerConstants';
import RenderWithCondition from '../../../components/RenderWithCondition';
import { ResumePreviewResponse } from '../../../services/resume/types';
import { ApplicantProfileType } from '../../../store/profile/types';
import LongButton from '../../../components/UI-kit/buttons/LongButton';
import * as stream from 'stream';
import { vacancyService } from '../../../services/vacancy/vacancyService';
import VacancyCard, { VacancyCardPropsType } from '../../../components/UI-kit/searchCards/VacancyCard';


const PAGE_TYPE = {
    VACANCIES: 'vacancies',
    RESUMES: 'resumes'
}

class ApplicantProfile extends ReactsComponent<
    ApplicantProfileType & { userID: string }
> {
    state = {
        resume: [] as ResumePreviewResponse[],
        vacancies: [] as VacancyCardPropsType[],
        page: PAGE_TYPE.RESUMES,
    };

    async getDataFromServer() {
        const applicantID = location.pathname.split('/').at(-1);

        const applicantBody = await applicantProfileService.getApplicantData(
            applicantID as string,
        );

        const resumeList = await applicantProfileService.getResumeList(
            applicantID as string,
        );

        const vacancyList = await vacancyService.getAllFavorites();

        dispatch(applicantActions.updateFromServer(applicantBody));
        this.setState(state => ({ ...state, resume: resumeList }));
        this.setState(state => ({ ...state, vacancies: vacancyList.data }));
    }

    switchToFavorites = () => {
        this.setState(state => ({
            ...state,
            page: PAGE_TYPE.RESUMES,
        }))
    }

    switchToVacancies = () => {
        this.setState(state => ({
            ...state,
            page: PAGE_TYPE.VACANCIES,
        }))
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive flex column g-40'}>
                <Header />
                <ProfileHeader
                    bannerSrc={this.props.averageColor}
                    averageColor={this.props.averageColor}
                    profileID={this.props.id}
                    avatarSrc={this.props.avatarSrc}
                    name={this.props.name}
                    surname={this.props.surname}
                    status={this.props.status}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <RenderWithCondition
                                condition={Boolean(window.navigator.clipboard)}
                                onSuccess={
                                    <div className={'flex row g-16'}>
                                        <ButtonIcon
                                            onClick={() => {
                                                window.navigator.clipboard
                                                    .writeText(this.props.phone)
                                                    .then(() =>
                                                        alert('copied!'),
                                                    )
                                                    .catch(err =>
                                                        console.error(err),
                                                    );
                                            }}
                                            dataTooltip={'Скопироавть номер телефона'}
                                            icon={PhoneIcon}
                                        />
                                        <ButtonIcon
                                            onClick={() => {
                                                window.navigator.clipboard
                                                    .writeText(this.props.email)
                                                    .then(() =>
                                                        alert('copied!'),
                                                    )
                                                    .catch(err =>
                                                        console.error(err),
                                                    );
                                            }}
                                            dataTooltip={'Скопироавть email'}
                                            icon={MailIcon}
                                        />
                                    </div>
                                }
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
                                        content={<Button>Редактировать профиль</Button>}
                                    />
                                }
                            />
                        </div>
                    }
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-9 column g-16'}>
                        <div className={'flex column g-32'}>
                            {this.props.userID === this.props.id ?
                                    <div className={'flex row'}>
                                        <LongButton
                                            id={'myResumes'}
                                            direction={'left'}
                                            content={'Мои резюме'}
                                            onClick={this.switchToFavorites.bind(this)}
                                        />
                                        <LongButton
                                            id={'myFeatured'}
                                            direction={'right'}
                                            content={'Избранные вакансии'}
                                            onClick={this.switchToVacancies.bind(this)}
                                        />
                                    </div> : null
                                }
                            <div className={`column g-24 ${this.state.page === PAGE_TYPE.RESUMES ? 'none' : 'flex'}`}>
                                {this.state.vacancies.map(vacancy => (
                                    <VacancyCard
                                        key={vacancy.id.toString()}
                                        id={vacancy.id.toString()}
                                        name={vacancy.title}
                                        icon={vacancy.image}
                                        salary={vacancy.salary}
                                        currency={vacancy.currency}
                                        location={vacancy.location}
                                        format={vacancy.format}
                                        hours={vacancy.hours}
                                        description={vacancy.description}
                                    />
                                ))}
                            </div>
                            <div className={this.state.page === PAGE_TYPE.RESUMES ? 'block' : 'none'}>
                                <ResumeList resume={this.state.resume} />
                            </div>
                        </div>
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

export default applicantConnect((state: ProfileState) => ({
    ...state,
}))(UserWrapper);
