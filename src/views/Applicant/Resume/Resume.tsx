import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import styles from '../Resume/resume.module.scss'
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
    }
    sideBar: {
        location: string;
        dateOfBirth: string;
        skills: string[];
    };
}

class Resume extends Component<ResumePropsType>{
    getDataFromServer() {
        const resumeID = this.props.id || location.pathname.split('/').at(-1)

        resumeService.getResumeData(resumeID as string)
            .then(body => {
                dispatch(resumeActions.update(body))
            });
    }

    componentDidMount() {
        this.getDataFromServer()
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <div className={styles.header_substrate}></div>
                <div className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <ApplicantHat creatorID={this.props.postedByUserID} />
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
                        <ResumeSidebar
                            location={this.props.sideBar.location}
                            dateOfBirth={this.props.sideBar.dateOfBirth}
                            skills={this.props.sideBar.skills}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default resumeConnect((store, props) => {
    const storeState = store.getState() as ResumeState;

    return {
        id: props.id || storeState.id,
        postedByUserID: storeState.postedByUserID,
        title: storeState.title,
        description: storeState.description,
        education: {
            university: storeState.university,
            faculty: storeState.faculty,
            status: storeState.status
        },
        sideBar: {
            location: storeState.location,
            dateOfBirth: storeState.dateOfBirth,
            skills: storeState.skills,
        },
    }
})(Resume);