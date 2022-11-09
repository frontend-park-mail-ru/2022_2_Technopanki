import { Component } from '../../../Reacts';
import ArrowButton from '../../components/UI-kit/buttons/ArrowButton';
import styles from './vacancy.module.scss';
import { userConnect } from '../../store';
import { applicantProfileService } from '../../services/applicantService';
import navigator from '../../router/navigator';
import RenderWithCondition from '../../components/RenderWithCondition';

type ResumeType = {
    title: string;
    id: string;
};

class Resume extends Component<ResumeType & { name: string; surname: string }> {
    // TODO: onclick - переход по ссылке на резюме

    sendResponseToServer() {
        applicantProfileService
            .apply(
                this.props.id,
                this.props.name,
                this.props.surname,
                this.props.title,
            )
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div
                className={
                    'flex row border-tb-light align-items-center justify-content-space-between p-16'
                }
            >
                <div className={'flex column'}>
                    <p className={styles.dropdown_name}>
                        {this.props.name} {this.props.surname}
                    </p>
                    <p className={styles.dropdown_resumeHeader}>
                        {this.props.title}
                    </p>
                </div>
                <ArrowButton
                    onClick={() => {
                        this.sendResponseToServer();
                        navigator.navigate(`/resume/${this.props.id}`);
                    }}
                />
            </div>
        );
    }
}

class VacancyDropdownResume extends Component<
    { userID: string; name: string; surname: string },
    { resume: ResumeType[] }
> {
    state = {
        resume: [] as ResumeType[],
    };

    componentDidMount() {
        applicantProfileService
            .getResumePreviewList(this.props.userID)
            .then(body => {
                this.setState(state => ({ ...state, resume: body }));
            });
    }

    render() {
        return (
            <div
                className={`flex hidden column g-0 background-0 rounded-md shadow-md ${styles.vacancy_dropdown}`}
            >
                {this.state.resume.map(resume => (
                    <Resume
                        name={this.props.name}
                        surname={this.props.surname}
                        title={resume.title}
                        id={resume.id}
                    />
                ))}
                <RenderWithCondition
                    condition={this.state.resume.length === 0}
                    onSuccess={
                        <div className={'rounded-md p-24'}>
                            <p>Похоже у вас нет резюме:(</p>
                        </div>
                    }
                />
            </div>
        );
    }
}

export default userConnect(state => ({
    userID: state.id,
    name: state.name,
    surname: state.surname,
}))(VacancyDropdownResume);
