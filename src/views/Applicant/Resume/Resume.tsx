import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Header from '../../../components/UI-kit/header/Header';
import styles from '../Resume/resume.module.scss';
import TextBlock from '../../../components/UI-kit/text/TextBlock';
import Education from '../../../components/UI-kit/education/Education';
import ResumeSidebar from '../../../components/sidebars/ResumeSidebar';
import { resumeService } from '../../../services/resume/resumeService';
import { dispatch, resumeConnect } from '../../../store';
import { resumeActions } from '../../../store/resume/actions';
import ApplicantHat from '../ApplicantHat';
import Footer from '../../../components/UI-kit/footer/Footer';
import { ResumeState } from '../../../store/resume/type';
import { applicantProfileService } from '../../../services/applicantService';
import { applicantActions } from '../../../store/applicant/actions';

class Resume extends ReactsComponent<ResumeState> {
    async getDataFromServer() {
        const resumeID = location.pathname.split('/').at(-1);
        const resume = await resumeService.getResumeData(resumeID as string);
        const postedByUserID = resume.user_account_id.toString();

        const profileData = await applicantProfileService.getApplicantData(
            postedByUserID,
        );

        dispatch(applicantActions.updateFromServer(profileData));
        dispatch(resumeActions.updateFromServer(resume));
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <div className={styles.header_substrate}></div>
                <div className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <ApplicantHat
                            creatorID={this.props.postedByUserID}
                            resumeID={
                                this.props.id
                                    ? this.props.id
                                    : (location.pathname
                                          .split('/')
                                          .at(-1) as string)
                            }
                        />
                    </div>
                    <h3 className={'col-12'}>{this.props.title}</h3>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'О себе'}
                            content={this.props.description}
                        />
                        <TextBlock
                            headline={'Опыт работы'}
                            content={this.props.experience}
                        />
                        <Education
                            university={this.props.university}
                            faculty={this.props.faculty}
                            status={this.props.status}
                        />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <ResumeSidebar creatorID={this.props.postedByUserID} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default resumeConnect(state => ({
    ...state,
}))(Resume);
