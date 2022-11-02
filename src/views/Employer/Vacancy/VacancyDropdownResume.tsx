import { Component } from '../../../../Reacts';
import ArrowButton from '../../../components/UI-kit/buttons/ArrowButton';
import styles from './vacancy.module.scss';

type ResumeType = {
    name: string;
    surname: string;
    resumeHeader: string;
    src: string;
};

class Resume extends Component<ResumeType> {
    // TODO: onclick - переход по ссылке на резюме
    render() {
        return (
            <div
                className={
                    'flex row border-tb-light justify-content-space-between p-16'
                }
            >
                <div className={'flex column'}>
                    <p className={styles.dropdown_name}>
                        {this.props.name} {this.props.surname}
                    </p>
                    <p className={styles.dropdown_resumeHeader}>
                        {this.props.resumeHeader}
                    </p>
                </div>
                <ArrowButton />
            </div>
        );
    }
}

export default class VacancyDropdownResume extends Component<{
    resume: ResumeType[];
}> {
    render() {
        return (
            <div
                className={`flex hidden column g-0 background-0 rounded-md shadow-md ${styles.vacancy_dropdown}`}
            >
                {this.props.resume.map(resume => (
                    <Resume
                        name={resume.name}
                        surname={resume.surname}
                        resumeHeader={resume.resumeHeader}
                        src={resume.src}
                    />
                ))}
            </div>
        );
    }
}
