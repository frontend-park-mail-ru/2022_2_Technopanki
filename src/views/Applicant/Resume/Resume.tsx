import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import styles from '../Resume/resume.module.scss';
import TextBlock from '../../../components/UI-kit/text/TextBlock';
import Education from '../../../components/UI-kit/education/Education';
import ResumeSidebar from '../../../components/sidebars/ResumeSidebar';
import { resumeService } from '../../../services/resumeService';
import { dispatch, resumeConnect } from '../../../store';
import { resumeActions } from '../../../store/resume/actions';
import ApplicantHat from '../ApplicantHat';
import Footer from '../../../components/UI-kit/footer/Footer';
import { ResumeState } from '../../../store/resume/type';

type ResumePropsType = {
    id?: string;
    postedByUserID: string;
    title: string;
    description: string;
    education: {
        university: string;
        faculty: string;
        status: string;
    };
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

class Resume extends Component<ResumePropsType> {
    getDataFromServer() {
        const resumeID = location.pathname.split('/').at(-1);
        resumeService.getResumeData(resumeID as string).then(body => {
            dispatch(resumeActions.update(body));
        });
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
                                    : location.pathname.split('/').at(-1)
                            }
                        />
                    </div>
                    <h3 className={'col-12'}>{this.props.title}</h3>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'О себе'}
                            content={this.props.description}
                        />
                        <Education
                            university={this.props.education.university}
                            faculty={this.props.education.faculty}
                            status={this.props.education.status}
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

export default resumeConnect((state, props) => {
    const storeState = state as ResumeState;
    return {
        id: props.id ? props.id : storeState.id,
        postedByUserID: storeState.postedByUserID,
        title: storeState.title,
        description: storeState.description,
        avatarSrc: storeState.avatarSrc,
        education: {
            university: storeState.university,
            faculty: storeState.faculty,
            status: storeState.status,
        },
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
    };
})(Resume);
