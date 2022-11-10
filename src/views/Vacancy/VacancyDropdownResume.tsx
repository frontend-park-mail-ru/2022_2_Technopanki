import { Component } from '../../../Reacts';
import ArrowButton from '../../components/UI-kit/buttons/ArrowButton';
import styles from './vacancy.module.scss';
import { dispatch, userConnect } from '../../store';
import { applicantProfileService } from '../../services/applicantService';
import navigator from '../../router/navigator.tsx';
import RenderWithCondition from '../../components/RenderWithCondition';
import ArrowButtonWithText from '../../components/UI-kit/buttons/ArrowButtonWithText';
import {
    activateSuccess,
    deactivateSuccess,
} from '../../store/succeses/actions';
import { activateError, deactivateError } from '../../store/errors/actions';

type ResumeType = {
    title: string;
    id: string;
};

class Resume extends Component<ResumeType & { name: string; surname: string }> {
    async sendResponseToServer() {
        return await applicantProfileService
            .apply(
                this.props.id,
                this.props.name,
                this.props.surname,
                this.props.title,
            )
            .then(body => body)
            .catch(err => {
                console.error(err);
                throw err;
            });
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
                        this.sendResponseToServer()
                            .then(() => {
                                dispatch(
                                    activateSuccess(
                                        'Успешно',
                                        `Ваше резюме "${this.props.title}" успешно отправлено`,
                                    ),
                                );
                                setTimeout(
                                    () => dispatch(deactivateSuccess()),
                                    3000,
                                );
                            })
                            .catch(() => {
                                dispatch(
                                    activateError(
                                        'Ошибка при отправке резюме',
                                        'Пожалуйста, повторите попытку',
                                    ),
                                );
                                setTimeout(
                                    () => dispatch(deactivateError()),
                                    3000,
                                );
                            });
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
        console.log('MOUNT DROPDOWN');
        applicantProfileService
            .getResumePreviewList(this.props.userID)
            .then(body => {
                this.setState(state => ({ ...state, resume: body }));
            });
    }

    componentDidUpdate() {
        console.log('UPDATE DROPDOWN');
        console.log(this.state);
    }

    unmount() {
        console.log('UNMOUNT DROPDOWN');
    }

    render() {
        return (
            <div
                className={`flex hidden column g-0 background-0 rounded-md shadow-md ${styles.vacancy_dropdown}`}
            >
                {this.state.resume.length === 0 ? (
                    <div className={'rounded-md flex column g-16 p-24'}>
                        <p key={'text'}>Похоже у вас нет резюме:(</p>
                        <ArrowButtonWithText
                            key={'button'}
                            onClick={() => navigator.navigate('/resume/new')}
                        >
                            Создать резюме
                        </ArrowButtonWithText>
                    </div>
                ) : (
                    this.state.resume.map(resume => (
                        <Resume
                            key={resume.id}
                            name={this.props.name}
                            surname={this.props.surname}
                            title={resume.title}
                            id={resume.id}
                        />
                    ))
                )}
            </div>
        );
    }
}

export default userConnect(state => ({
    userID: state.id,
    name: state.name,
    surname: state.surname,
}))(VacancyDropdownResume);
