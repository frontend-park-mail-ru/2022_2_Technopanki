import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import ArrowButton from '../../components/UI-kit/buttons/ArrowButton';
import styles from './vacancy.module.scss';
import { dispatch, userConnect } from '../../store';
import { applicantProfileService } from '../../services/applicantService';
import navigator from '../../router/navigator';
import ArrowButtonWithText from '../../components/UI-kit/buttons/ArrowButtonWithText';
import {
    activateSuccess,
    deactivateSuccess,
} from '../../store/succeses/actions';
import { activateError, deactivateError } from '../../store/errors/actions';
import { RESUME_PATHS } from '../../utils/routerConstants';

type ResumeType = {
    title: string;
    id: string;
};

class Resume extends ReactsComponent<
    ResumeType & { name: string; surname: string; vacancyID: string }
> {
    async sendResponseToServer() {
        return await applicantProfileService.apply(
            this.props.vacancyID,
            this.props.id,
            this.props.name,
            this.props.surname,
            this.props.title,
        );
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
                            .catch(err => {
                                if (err === 400) {
                                    dispatch(
                                        activateError(
                                            'Вы уже откликнулись на эту вакансию',
                                            'Откликаться более одного раза на одну вакансию нельзя',
                                        ),
                                    );
                                } else {
                                    dispatch(
                                        activateError(
                                            'Ошибка при отправке резюме',
                                            'Пожалуйста, повторите попытку',
                                        ),
                                    );
                                }
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

class VacancyDropdownResume extends ReactsComponent<
    { userID: string; name: string; surname: string; vacancyID: string },
    { resume: ResumeType[]; loading: boolean }
> {
    state = {
        resume: [] as ResumeType[],
        loading: false,
    };

    shouldUpdate(
        nextProps:
            | Readonly<{
                  userID: string;
                  name: string;
                  surname: string;
                  vacancyID: string;
              }>
            | {
                  userID: string;
                  name: string;
                  surname: string;
                  vacancyID: string;
              },
    ): boolean {
        return this.props.userID !== nextProps.userID;
    }

    async getResumeFromServer() {
        try {
            this.setState(state => ({ ...state, loading: true }));
            const resumeData =
                await applicantProfileService.getResumePreviewList(
                    this.props.userID,
                );

            this.setState(state => ({
                ...state,
                resume: resumeData as ResumeType[],
                loading: false,
            }));
        } catch (e) {
            dispatch(activateError('Ошибка при получении резюме', ''));
            setTimeout(() => dispatch(deactivateError()), 3000);
            console.error(e);
        }
    }

    componentDidMount() {
        this.getResumeFromServer();
    }

    render() {
        return (
            <div
                className={`flex hidden column g-0 background-0 rounded-md shadow-md ${styles.vacancy_dropdown}`}
            >
                {this.state.loading ? (
                    <div
                        className={
                            'flex align-items-center justify-content-center p-40'
                        }
                    >
                        <p>Загрузка...</p>
                    </div>
                ) : (
                    <div className={'flex column'}>
                        {this.state.resume.length === 0 ? (
                            <div className={'rounded-md flex column g-16 p-24'}>
                                <p>Похоже у вас нет резюме:(</p>
                                <ArrowButtonWithText
                                    onClick={() =>
                                        navigator.navigate(RESUME_PATHS.NEW)
                                    }
                                >
                                    Создать резюме
                                </ArrowButtonWithText>
                            </div>
                        ) : (
                            this.state.resume.map(resume => (
                                <Resume
                                    vacancyID={this.props.vacancyID}
                                    name={this.props.name}
                                    surname={this.props.surname}
                                    title={resume.title}
                                    id={resume.id}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default userConnect((state, props) => ({
    userID: state.id,
    name: state.name,
    surname: state.surname,
    vacancyID: props.vacancyID,
}))(VacancyDropdownResume);
